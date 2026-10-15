import { Request, Response, NextFunction } from 'express';

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'signal_admin_secret_key_demo_2026';

  const authHeader = req.headers['authorization'];
  const adminKeyHeader = req.headers['x-admin-key'];

  let token: string | null = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (typeof adminKeyHeader === 'string') {
    token = adminKeyHeader.trim();
  }

  if (!token || token !== adminSecret) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Administrative authorization is required to access this endpoint.',
      },
      requestId: req.requestId,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
}
