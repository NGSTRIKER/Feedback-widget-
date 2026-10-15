import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { requestIdMiddleware } from './middleware/request-id.js';
import { createCorsMiddleware } from './middleware/cors.js';
import { healthRouter } from './routes/health.js';
import { feedbackRouter } from './routes/feedback.js';
import { adminRouter } from './routes/admin.js';

export function createApp(): Express {
  const app = express();

  // Disable x-powered-by header
  app.disable('x-powered-by');

  // Trust proxy if configured
  if (process.env.TRUST_PROXY === 'true') {
    app.set('trust proxy', 1);
  }

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Widget can be embedded in host sites
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // Request correlation ID
  app.use(requestIdMiddleware);

  // Dynamic CORS origin verification per project
  app.use(createCorsMiddleware());

  // Strict JSON payload body limit to prevent memory exhaustion / DoS
  app.use(express.json({ limit: '10kb' }));

  // Request timeout protection (10 seconds)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setTimeout(10000, () => {
      if (!res.headersSent) {
        res.status(504).json({
          success: false,
          error: {
            code: 'REQUEST_TIMEOUT',
            message: 'Server processing timed out.',
          },
          requestId: req.requestId,
          timestamp: new Date().toISOString(),
        });
      }
    });
    next();
  });

  // Health and readiness endpoints
  app.use(healthRouter);

  // Public Feedback endpoints
  app.use(feedbackRouter);

  // Administrative endpoints
  app.use('/v1/admin', adminRouter);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: `Endpoint ${req.method} ${req.path} does not exist.`,
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  });

  // Global error handler
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // Body parser syntax error
    if (err instanceof SyntaxError && 'status' in err && (err as any).status === 400) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Malformed JSON payload in request body.',
        },
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    console.error(`[Unhandled Error] Request ${req.requestId}:`, err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
