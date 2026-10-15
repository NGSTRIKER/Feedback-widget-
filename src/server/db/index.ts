import pg from 'pg';
import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';
import path from 'path';

export interface DatabaseClient {
  query<T = any>(sql: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }>;
  exec(sql: string): Promise<void>;
  close(): Promise<void>;
  driver: 'pg' | 'pglite';
}

let dbInstance: DatabaseClient | null = null;
let pgPool: pg.Pool | null = null;
let pgliteInstance: PGlite | null = null;

export async function getDatabase(): Promise<DatabaseClient> {
  if (dbInstance) {
    return dbInstance;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    // Production PostgreSQL connection via pg pool
    console.log('[Database] Connecting to PostgreSQL via DATABASE_URL...');
    pgPool = new pg.Pool({
      connectionString: databaseUrl,
      max: parseInt(process.env.DB_POOL_MAX || '10', 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });

    const client = await pgPool.connect();
    client.release();
    console.log('[Database] Connected to external PostgreSQL database.');

    dbInstance = {
      driver: 'pg',
      async query<T = any>(sql: string, params?: any[]) {
        const res = await pgPool!.query(sql, params);
        return { rows: res.rows as T[], rowCount: res.rowCount ?? res.rows.length };
      },
      async exec(sql: string) {
        await pgPool!.query(sql);
      },
      async close() {
        if (pgPool) {
          await pgPool.end();
          pgPool = null;
        }
        dbInstance = null;
      },
    };
  } else {
    // Embedded PostgreSQL engine (PGlite WASM) for tests and zero-dependency local dev
    console.log(
      '[Database] DATABASE_URL not set. Initializing embedded PostgreSQL engine (PGlite).'
    );
    pgliteInstance = new PGlite();

    dbInstance = {
      driver: 'pglite',
      async query<T = any>(sql: string, params?: any[]) {
        const res = await pgliteInstance!.query(sql, params);
        return { rows: res.rows as T[], rowCount: res.rows.length };
      },
      async exec(sql: string) {
        await pgliteInstance!.exec(sql);
      },
      async close() {
        if (pgliteInstance) {
          await pgliteInstance.close();
          pgliteInstance = null;
        }
        dbInstance = null;
      },
    };
  }

  // Run migrations automatically
  await runMigrations(dbInstance);

  return dbInstance;
}

export async function runMigrations(db: DatabaseClient): Promise<void> {
  // Ensure _migrations table exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const migrationsDir = path.resolve(import.meta.dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) return;

  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    const existing = await db.query('SELECT 1 FROM _migrations WHERE name = $1', [file]);
    if (existing.rows.length === 0) {
      console.log(`[Database] Applying migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      
      // Execute multi-statement migration SQL with exec()
      await db.exec(sql);

      // Record migration
      await db.query('INSERT INTO _migrations (name) VALUES ($1)', [file]);
      console.log(`[Database] Migration applied: ${file}`);
    }
  }

  // Seed default demo project if empty
  await seedDefaultProject(db);
}

export async function seedDefaultProject(db: DatabaseClient): Promise<void> {
  const defaultKey = process.env.DEFAULT_PROJECT_KEY || 'prj_live_signal_demo_default';
  const existing = await db.query('SELECT id FROM projects WHERE project_key = $1', [defaultKey]);

  if (existing.rows.length === 0) {
    console.log(`[Database] Seeding default project with key: ${defaultKey}`);
    await db.query(
      `INSERT INTO projects (project_key, name, allowed_origins, is_active)
       VALUES ($1, $2, $3, $4)`,
      [
        defaultKey,
        'Signal Demo Project',
        ['*'],
        true,
      ]
    );
  }
}
