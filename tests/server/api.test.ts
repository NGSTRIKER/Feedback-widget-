import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/server/app.js';
import { getDatabase, DatabaseClient } from '../../src/server/db/index.js';
import { resetRateLimits } from '../../src/server/middleware/rate-limiter.js';

describe('Signal Backend API Integration Tests', () => {
  let app: any;
  let db: DatabaseClient;
  const adminSecret = 'signal_admin_secret_key_demo_2026';
  const defaultProjectKey = 'prj_live_signal_demo_default';
  let projectId: string;

  beforeAll(async () => {
    process.env.ADMIN_SECRET_KEY = adminSecret;
    process.env.DEFAULT_PROJECT_KEY = defaultProjectKey;
    db = await getDatabase();
    app = createApp();

    const prj = await db.query('SELECT id FROM projects WHERE project_key = $1', [defaultProjectKey]);
    projectId = prj.rows[0].id;
  }, 20000);

  afterAll(async () => {
    await db.close();
  });

  beforeEach(() => {
    resetRateLimits();
  });

  describe('Health Check', () => {
    it('GET /v1/health returns 200 with healthy database status and no leaked secrets', async () => {
      const res = await request(app).get('/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe('healthy');
      expect(res.body.database.status).toBe('connected');
      expect(res.body.database.dialect).toBe('postgresql');
      expect(res.body.requestId).toBeDefined();
      // Ensure no secrets leaked
      expect(JSON.stringify(res.body)).not.toContain(adminSecret);
    });

    it('GET /health alias returns healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('Feedback Submission (POST /v1/feedback)', () => {
    it('successfully persists valid feedback and returns 201 Created', async () => {
      const payload = {
        project_key: defaultProjectKey,
        category: 'bug',
        message: 'A critical bug in checkout flow: button unresponsive.',
        rating: 2,
        email: 'user@example.com',
        context: { url: 'https://example.com/checkout', viewport: { width: 1200, height: 800 } },
      };

      const res = await request(app)
        .post('/v1/feedback')
        .send(payload)
        .set('Accept', 'application/json');

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.status).toBe('received');

      // Verify actual persistence in PostgreSQL database
      const dbCheck = await db.query('SELECT * FROM feedback WHERE id = $1', [res.body.data.id]);
      expect(dbCheck.rows.length).toBe(1);
      const row = dbCheck.rows[0];
      expect(row.category).toBe('bug');
      expect(row.message).toBe(payload.message);
      expect(row.rating).toBe(2);
      expect(row.email).toBe('user@example.com');
      expect(row.triage_status).toBe('new');
      expect(row.client_ip_hash).toBeDefined();
    });

    it('rejects empty message with 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: defaultProjectKey,
          category: 'feature',
          message: '',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects whitespace-only message with 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: defaultProjectKey,
          category: 'feature',
          message: '      \n\t   ',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects oversized message (>5000 characters) with 400 VALIDATION_ERROR', async () => {
      const longMsg = 'A'.repeat(5001);
      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: defaultProjectKey,
          category: 'general',
          message: longMsg,
        });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects invalid email with 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: defaultProjectKey,
          category: 'other',
          message: 'Valid message content',
          email: 'not-an-email-address',
        });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects invalid category with 400 VALIDATION_ERROR', async () => {
      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: defaultProjectKey,
          category: 'hacker_category',
          message: 'Testing unknown category',
        });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects invalid rating values (0, 6, -1, float)', async () => {
      for (const badRating of [0, 6, -1, 3.5]) {
        const res = await request(app)
          .post('/v1/feedback')
          .send({
            project_key: defaultProjectKey,
            category: 'general',
            message: 'Testing rating validation',
            rating: badRating,
          });

        expect(res.status).toBe(400);
        expect(res.body.error.code).toBe('VALIDATION_ERROR');
      }
    });

    it('returns 404 PROJECT_NOT_FOUND when project key does not exist', async () => {
      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: 'prj_non_existent_key_9999',
          category: 'general',
          message: 'Valid message',
        });

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('PROJECT_NOT_FOUND');
    });

    it('returns 403 PROJECT_DISABLED when project is inactive', async () => {
      const disabledKey = 'prj_disabled_test_123';
      await db.query(
        'INSERT INTO projects (project_key, name, allowed_origins, is_active) VALUES ($1, $2, $3, $4)',
        [disabledKey, 'Disabled Project', ['*'], false]
      );

      const res = await request(app)
        .post('/v1/feedback')
        .send({
          project_key: disabledKey,
          category: 'bug',
          message: 'Trying to submit to disabled project',
        });

      expect(res.status).toBe(403);
      expect(res.body.error.code).toBe('PROJECT_DISABLED');
    });

    it('safely handles idempotency key for duplicate submissions', async () => {
      const idempKey = 'idemp_test_uuid_' + Date.now();
      const payload = {
        project_key: defaultProjectKey,
        category: 'feature',
        message: 'Idempotency test request',
      };

      // First submission
      const res1 = await request(app)
        .post('/v1/feedback')
        .set('X-Idempotency-Key', idempKey)
        .send(payload);

      expect(res1.status).toBe(201);
      const originalId = res1.body.data.id;

      // Second identical submission with same idempotency key
      const res2 = await request(app)
        .post('/v1/feedback')
        .set('X-Idempotency-Key', idempKey)
        .send(payload);

      expect(res2.status).toBe(200);
      expect(res2.body.data.id).toBe(originalId);
      expect(res2.body.data.idempotentReplay).toBe(true);
    });

    it('enforces rate limits and returns 429 Too Many Requests after threshold', async () => {
      const payload = {
        project_key: defaultProjectKey,
        category: 'general',
        message: 'Spam testing message',
      };

      // 5 requests allowed
      for (let i = 0; i < 5; i++) {
        const res = await request(app).post('/v1/feedback').send(payload);
        expect(res.status).toBe(201);
      }

      // 6th request should hit rate limit
      const blockedRes = await request(app).post('/v1/feedback').send(payload);
      expect(blockedRes.status).toBe(429);
      expect(blockedRes.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
      expect(blockedRes.headers['retry-after']).toBeDefined();
    });
  });

  describe('Administrative Authorization and Endpoints', () => {
    let sampleFeedbackId: string;

    beforeAll(async () => {
      const insert = await db.query(
        `INSERT INTO feedback (project_id, category, message, rating, triage_status)
         VALUES ($1, 'feature', 'Admin test item', 5, 'new')
         RETURNING id`,
        [projectId]
      );
      sampleFeedbackId = insert.rows[0].id;
    });

    it('GET /v1/feedback/:id rejects unauthenticated requests with 401 UNAUTHORIZED', async () => {
      const res = await request(app).get(`/v1/feedback/${sampleFeedbackId}`);
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('GET /v1/feedback/:id allows authorized admin with Bearer token', async () => {
      const res = await request(app)
        .get(`/v1/feedback/${sampleFeedbackId}`)
        .set('Authorization', `Bearer ${adminSecret}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(sampleFeedbackId);
      expect(res.body.data.message).toBe('Admin test item');
    });

    it('GET /v1/admin/feedback lists and filters submissions with authorization', async () => {
      const res = await request(app)
        .get('/v1/admin/feedback')
        .query({ project_key: defaultProjectKey, category: 'feature' })
        .set('Authorization', `Bearer ${adminSecret}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.pagination.total).toBeGreaterThanOrEqual(1);
    });

    it('PATCH /v1/admin/feedback/:id/triage updates triage status', async () => {
      const res = await request(app)
        .patch(`/v1/admin/feedback/${sampleFeedbackId}/triage`)
        .set('Authorization', `Bearer ${adminSecret}`)
        .send({
          triage_status: 'resolved',
          triage_notes: 'Resolved in sprint 42 release.',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.triage_status).toBe('resolved');
      expect(res.body.data.triage_notes).toBe('Resolved in sprint 42 release.');

      // Check DB update
      const dbCheck = await db.query('SELECT triage_status, triage_notes FROM feedback WHERE id = $1', [
        sampleFeedbackId,
      ]);
      expect(dbCheck.rows[0].triage_status).toBe('resolved');
    });

    it('maintains strict cross-project data isolation', async () => {
      // Create Project B
      const prjBRes = await db.query(
        `INSERT INTO projects (project_key, name, allowed_origins, is_active)
         VALUES ('prj_tenant_b', 'Tenant B', ARRAY['*'], TRUE)
         RETURNING id`
      );
      const projectBId = prjBRes.rows[0].id;

      // Add feedback to Project B
      await db.query(
        `INSERT INTO feedback (project_id, category, message)
         VALUES ($1, 'bug', 'Secret feedback for Tenant B')`,
        [projectBId]
      );

      // Query feedback filtered by Project A
      const listA = await request(app)
        .get('/v1/admin/feedback')
        .query({ project_key: defaultProjectKey })
        .set('Authorization', `Bearer ${adminSecret}`);

      // Ensure no items from Project B appear under Project A
      const bItems = listA.body.data.items.filter((i: any) => i.project_id === projectBId);
      expect(bItems.length).toBe(0);
    });
  });

  describe('CORS and Preflight Handling', () => {
    it('handles OPTIONS preflight correctly for allowed origin', async () => {
      const res = await request(app)
        .options('/v1/feedback')
        .set('Origin', 'http://localhost:5173')
        .set('Access-Control-Request-Method', 'POST');

      expect(res.status).toBe(204);
      expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
      expect(res.headers['access-control-allow-methods']).toContain('POST');
    });
  });
});
