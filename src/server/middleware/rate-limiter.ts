import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

interface RateLimitEntry {
  timestamps: number[];
}

const SALT = process.env.RATE_LIMIT_SALT || 'signal_rate_limiter_salt_secret';
const clientStore = new Map<string, RateLimitEntry>();
const projectStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 1000;
  for (const [key, entry] of clientStore.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) clientStore.delete(key);
  }
  for (const [key, entry] of projectStore.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) projectStore.delete(key);
  }
}, 5 * 60 * 1000).unref();

export function hashClientIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + SALT).digest('hex');
}

export function getClientIp(req: Request): string {
  // Use connection remoteAddress by default to avoid trusting spoofed X-Forwarded-For headers
  // unless TRUST_PROXY is explicitly enabled
  if (process.env.TRUST_PROXY === 'true') {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      const parts = forwarded.split(',');
      if (parts[0]) return parts[0].trim();
    }
  }
  return req.socket.remoteAddress || req.ip || '127.0.0.1';
}

export interface RateLimitOptions {
  clientWindowMs?: number;
  clientMax?: number;
  projectWindowMs?: number;
  projectMax?: number;
}

export function createFeedbackRateLimiter(options: RateLimitOptions = {}) {
  const clientWindowMs = options.clientWindowMs || 60 * 1000; // 1 minute
  const clientMax = options.clientMax || 5; // 5 submissions per minute per IP
  const projectWindowMs = options.projectWindowMs || 60 * 1000;
  const projectMax = options.projectMax || 60; // 60 submissions per minute per project

  return (req: Request, res: Response, next: NextFunction): void => {
    // If in test mode with RATE_LIMIT_DISABLE=true, bypass
    if (process.env.RATE_LIMIT_DISABLE === 'true') {
      return next();
    }

    const now = Date.now();
    const rawIp = getClientIp(req);
    const clientHash = hashClientIp(rawIp);
    const projectKey = (req.body?.project_key || req.headers['x-project-key']) as string | undefined;

    // 1. Check Client Limit
    let clientEntry = clientStore.get(clientHash);
    if (!clientEntry) {
      clientEntry = { timestamps: [] };
      clientStore.set(clientHash, clientEntry);
    }
    clientEntry.timestamps = clientEntry.timestamps.filter((t) => now - t < clientWindowMs);

    if (clientEntry.timestamps.length >= clientMax) {
      const oldest = clientEntry.timestamps[0];
      const retryAfterSec = Math.ceil((clientWindowMs - (now - oldest)) / 1000);
      res.setHeader('Retry-After', retryAfterSec.toString());
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Too many submissions from this client. Please retry after ${retryAfterSec} seconds.`,
          retryAfter: retryAfterSec,
        },
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // 2. Check Project Limit (if projectKey is present)
    if (projectKey) {
      let prjEntry = projectStore.get(projectKey);
      if (!prjEntry) {
        prjEntry = { timestamps: [] };
        projectStore.set(projectKey, prjEntry);
      }
      prjEntry.timestamps = prjEntry.timestamps.filter((t) => now - t < projectWindowMs);

      if (prjEntry.timestamps.length >= projectMax) {
        const oldest = prjEntry.timestamps[0];
        const retryAfterSec = Math.ceil((projectWindowMs - (now - oldest)) / 1000);
        res.setHeader('Retry-After', retryAfterSec.toString());
        res.status(429).json({
          success: false,
          error: {
            code: 'PROJECT_RATE_LIMIT_EXCEEDED',
            message: `Submission rate limit exceeded for this project. Please retry in ${retryAfterSec} seconds.`,
            retryAfter: retryAfterSec,
          },
          requestId: req.requestId,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      prjEntry.timestamps.push(now);
    }

    clientEntry.timestamps.push(now);
    next();
  };
}

export function resetRateLimits(): void {
  clientStore.clear();
  projectStore.clear();
}
