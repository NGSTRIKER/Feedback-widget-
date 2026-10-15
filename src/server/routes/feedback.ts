import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/index.js';
import { FeedbackSubmissionSchema } from '../validation.js';
import { getClientIp, hashClientIp, createFeedbackRateLimiter } from '../middleware/rate-limiter.js';
import { requireAdminAuth } from '../middleware/auth.js';

export const feedbackRouter = Router();

// Rate limiter for submissions: 5 requests / min per IP, 60 / min per project
const submissionLimiter = createFeedbackRateLimiter({
  clientMax: 5,
  clientWindowMs: 60 * 1000,
  projectMax: 60,
  projectWindowMs: 60 * 1000,
});

/**
 * Public Endpoint: Submit Feedback
 * POST /v1/feedback
 */
feedbackRouter.post('/v1/feedback', submissionLimiter, async (req: Request, res: Response): Promise<void> => {
  // Validate request body
  const parseResult = FeedbackSubmissionSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid feedback submission data.',
        details: parseResult.error.flatten().fieldErrors,
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const { project_key, category, message, rating, email, context } = parseResult.data;
  const idempotencyKey =
    (req.headers['x-idempotency-key'] as string | undefined) ||
    (req.body?.idempotency_key as string | undefined);

  try {
    const db = await getDatabase();

    // Verify project exists and is active
    const prjRes = await db.query(
      'SELECT id, is_active FROM projects WHERE project_key = $1',
      [project_key]
    );

    if (prjRes.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: {
          code: 'PROJECT_NOT_FOUND',
          message: `Project with key '${project_key}' does not exist.`,
        },
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const project = prjRes.rows[0];
    if (!project.is_active) {
      res.status(403).json({
        success: false,
        error: {
          code: 'PROJECT_DISABLED',
          message: 'This project is currently disabled and not accepting feedback.',
        },
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Check for idempotent duplicate submission if key provided
    if (idempotencyKey) {
      const existing = await db.query(
        `SELECT id, created_at FROM feedback
         WHERE project_id = $1 AND idempotency_key = $2
         AND created_at > NOW() - INTERVAL '15 minutes'`,
        [project.id, idempotencyKey]
      );

      if (existing.rows.length > 0) {
        res.status(200).json({
          success: true,
          data: {
            id: existing.rows[0].id,
            status: 'recorded',
            idempotentReplay: true,
          },
          requestId: req.requestId,
          timestamp: new Date().toISOString(),
        });
        return;
      }
    }

    const rawIp = getClientIp(req);
    const ipHash = hashClientIp(rawIp);
    const userAgent = req.headers['user-agent'] || null;

    // Insert record with parameterized query
    const insertRes = await db.query(
      `INSERT INTO feedback (
         project_id, category, message, rating, email, context, triage_status, client_ip_hash, user_agent, idempotency_key
       ) VALUES ($1, $2, $3, $4, $5, $6, 'new', $7, $8, $9)
       RETURNING id, created_at`,
      [
        project.id,
        category,
        message.trim(),
        rating ?? null,
        email ?? null,
        JSON.stringify(context || {}),
        ipHash,
        userAgent,
        idempotencyKey ?? null,
      ]
    );

    const createdRecord = insertRes.rows[0];

    res.status(201).json({
      success: true,
      data: {
        id: createdRecord.id,
        status: 'received',
      },
      requestId: req.requestId,
      timestamp: createdRecord.created_at || new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error('[Feedback Submission] Error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to persist feedback submission.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * Protected Endpoint: Get Single Feedback Record
 * GET /v1/feedback/:id (requires admin authorization)
 */
feedbackRouter.get(
  '/v1/feedback/:id',
  requireAdminAuth,
  async (req: Request, res: Response): Promise<void> => {
    const feedbackId = req.params.id;

    try {
      const db = await getDatabase();
      const result = await db.query(
        `SELECT f.id, f.project_id, p.project_key, f.category, f.message, f.rating,
                f.email, f.context, f.triage_status, f.triage_notes, f.created_at, f.updated_at
         FROM feedback f
         JOIN projects p ON f.project_id = p.id
         WHERE f.id = $1`,
        [feedbackId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          error: {
            code: 'RECORD_NOT_FOUND',
            message: `Feedback record with ID '${feedbackId}' was not found.`,
          },
          requestId: req.requestId,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.rows[0],
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
    } catch (err: unknown) {
      console.error('[Feedback Fetch] Error:', err);
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve feedback record.',
        },
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
    }
  }
);
