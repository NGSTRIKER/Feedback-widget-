import { Request, Response, NextFunction } from 'express';
import { getDatabase } from '../db/index.js';

export function createCorsMiddleware() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const origin = req.headers['origin'];

    // If no Origin header (e.g. server-to-server or non-browser request), allow standard processing
    if (!origin) {
      return next();
    }

    // Check project key from query, headers, or body to lookup allowed origins
    const projectKey = (req.headers['x-project-key'] ||
      req.query['project_key'] ||
      req.body?.project_key) as string | undefined;

    let isAllowed = false;

    if (projectKey) {
      try {
        const db = await getDatabase();
        const prjRes = await db.query(
          'SELECT allowed_origins FROM projects WHERE project_key = $1 AND is_active = TRUE',
          [projectKey]
        );

        if (prjRes.rows.length > 0) {
          const allowedOrigins: string[] = prjRes.rows[0].allowed_origins || ['*'];
          if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            isAllowed = true;
          }
        }
      } catch (err) {
        console.error('[CORS] Failed to check project origins:', err);
      }
    } else {
      // In demo mode or if no project specified, check global config or allow demo hosts
      const globalOrigins = (process.env.ALLOWED_ORIGINS || '*').split(',').map((o) => o.trim());
      if (globalOrigins.includes('*') || globalOrigins.includes(origin)) {
        isAllowed = true;
      }
    }

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Project-Key, X-Idempotency-Key, X-Admin-Key, X-Request-Id'
      );
      res.setHeader('Access-Control-Max-Age', '86400');
    }

    if (req.method === 'OPTIONS') {
      if (isAllowed) {
        res.status(204).end();
      } else {
        res.status(403).json({
          success: false,
          error: {
            code: 'ORIGIN_NOT_ALLOWED',
            message: `Origin ${origin} is not authorized for this project.`,
          },
          requestId: req.requestId,
          timestamp: new Date().toISOString(),
        });
      }
      return;
    }

    next();
  };
}
