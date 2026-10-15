import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/index.js';

export const healthRouter = Router();

healthRouter.get(['/health', '/v1/health'], async (req: Request, res: Response) => {
  let dbStatus = 'disconnected';
  let dbDriver = 'unknown';

  try {
    const db = await getDatabase();
    dbDriver = db.driver;
    const testRes = await db.query('SELECT 1 as alive');
    if (testRes.rows.length > 0) {
      dbStatus = 'connected';
    }
  } catch (err) {
    dbStatus = 'error';
    console.error('[Health] DB probe failed:', err);
  }

  const isHealthy = dbStatus === 'connected';

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    status: isHealthy ? 'healthy' : 'degraded',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: dbStatus,
      dialect: 'postgresql',
      driver: dbDriver,
    },
    requestId: req.requestId,
  });
});
