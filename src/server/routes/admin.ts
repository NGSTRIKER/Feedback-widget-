import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/index.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { TriageUpdateSchema, ProjectCreateSchema } from '../validation.js';

export const adminRouter = Router();

// Apply administrative authentication to all routes under /v1/admin/*
adminRouter.use(requireAdminAuth);

/**
 * GET /v1/admin/feedback
 * List and filter feedback entries
 */
adminRouter.get('/feedback', async (req: Request, res: Response): Promise<void> => {
  const { project_key, category, status, rating, limit = '50', offset = '0' } = req.query;

  const parsedLimit = Math.min(Math.max(parseInt(limit as string, 10) || 50, 1), 100);
  const parsedOffset = Math.max(parseInt(offset as string, 10) || 0, 0);

  try {
    const db = await getDatabase();

    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (project_key) {
      conditions.push(`p.project_key = $${paramIndex++}`);
      params.push(project_key);
    }

    if (category) {
      conditions.push(`f.category = $${paramIndex++}`);
      params.push(category);
    }

    if (status) {
      conditions.push(`f.triage_status = $${paramIndex++}`);
      params.push(status);
    }

    if (rating) {
      conditions.push(`f.rating = $${paramIndex++}`);
      params.push(parseInt(rating as string, 10));
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countQuery = `
      SELECT COUNT(*)::int as total
      FROM feedback f
      JOIN projects p ON f.project_id = p.id
      ${whereClause}
    `;
    const countRes = await db.query(countQuery, params);
    const total = countRes.rows[0]?.total ?? 0;

    const listQuery = `
      SELECT f.id, f.project_id, p.project_key, p.name as project_name,
             f.category, f.message, f.rating, f.email, f.context,
             f.triage_status, f.triage_notes, f.created_at, f.updated_at
      FROM feedback f
      JOIN projects p ON f.project_id = p.id
      ${whereClause}
      ORDER BY f.created_at DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    params.push(parsedLimit, parsedOffset);

    const listRes = await db.query(listQuery, params);

    res.status(200).json({
      success: true,
      data: {
        items: listRes.rows,
        pagination: {
          total,
          limit: parsedLimit,
          offset: parsedOffset,
        },
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error('[Admin Feedback List] Error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve feedback list.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * PATCH /v1/admin/feedback/:id/triage
 * Update triage status and notes
 */
adminRouter.patch('/feedback/:id/triage', async (req: Request, res: Response): Promise<void> => {
  const feedbackId = req.params.id;

  const parseResult = TriageUpdateSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid triage update parameters.',
        details: parseResult.error.flatten().fieldErrors,
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const { triage_status, triage_notes } = parseResult.data;

  try {
    const db = await getDatabase();
    const updateRes = await db.query(
      `UPDATE feedback
       SET triage_status = $1,
           triage_notes = COALESCE($2, triage_notes),
           updated_at = NOW()
       WHERE id = $3
       RETURNING id, triage_status, triage_notes, updated_at`,
      [triage_status, triage_notes ?? null, feedbackId]
    );

    if (updateRes.rows.length === 0) {
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
      data: updateRes.rows[0],
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error('[Admin Triage Update] Error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update triage status.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /v1/admin/projects
 * List all projects
 */
adminRouter.get('/projects', async (req: Request, res: Response): Promise<void> => {
  try {
    const db = await getDatabase();
    const result = await db.query(
      `SELECT id, project_key, name, allowed_origins, is_active, created_at, updated_at
       FROM projects
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      success: true,
      data: result.rows,
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error('[Admin Projects List] Error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to list projects.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * POST /v1/admin/projects
 * Create a new project
 */
adminRouter.post('/projects', async (req: Request, res: Response): Promise<void> => {
  const parseResult = ProjectCreateSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid project creation parameters.',
        details: parseResult.error.flatten().fieldErrors,
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const { project_key, name, allowed_origins } = parseResult.data;

  try {
    const db = await getDatabase();
    const insertRes = await db.query(
      `INSERT INTO projects (project_key, name, allowed_origins, is_active)
       VALUES ($1, $2, $3, TRUE)
       RETURNING id, project_key, name, allowed_origins, is_active, created_at`,
      [project_key, name, allowed_origins]
    );

    res.status(201).json({
      success: true,
      data: insertRes.rows[0],
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    if (err?.code === '23505') {
      // Unique constraint violation in Postgres
      res.status(409).json({
        success: false,
        error: {
          code: 'PROJECT_KEY_EXISTS',
          message: `Project with key '${project_key}' already exists.`,
        },
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    console.error('[Admin Create Project] Error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create project.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  }
});
