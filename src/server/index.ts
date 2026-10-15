import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app.js';
import { getDatabase } from './db/index.js';

const PORT = parseInt(process.env.PORT || '3001', 10);

async function startServer() {
  try {
    // Initialize DB and run pending migrations
    const db = await getDatabase();
    console.log(`[Server] Database initialized using ${db.driver} driver.`);

    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`  SIGNAL BACKEND API RUNNING ON PORT ${PORT}`);
      console.log(`  Health Check: http://localhost:${PORT}/v1/health`);
      console.log(`  Feedback API: POST http://localhost:${PORT}/v1/feedback`);
      console.log(`  Admin API:    GET http://localhost:${PORT}/v1/admin/feedback`);
      console.log(`====================================================`);
    });

    const shutdown = async (signal: string) => {
      console.log(`[Server] Received ${signal}. Gracefully shutting down...`);
      server.close(async () => {
        await db.close();
        console.log('[Server] Shutdown complete.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  }
}

startServer();
