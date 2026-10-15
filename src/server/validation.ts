import { z } from 'zod';

const CATEGORIES = ['bug', 'feature', 'general', 'other'] as const;
const TRIAGE_STATUSES = ['new', 'in_review', 'resolved', 'archived'] as const;

export const FeedbackSubmissionSchema = z.object({
  project_key: z
    .string()
    .min(3, 'Project key must be at least 3 characters.')
    .max(64, 'Project key exceeds maximum length of 64 characters.')
    .regex(/^[A-Za-z0-9_-]+$/, 'Project key contains invalid characters.'),
  category: z.enum(CATEGORIES),
  message: z
    .string()
    .min(1, 'Feedback message cannot be empty.')
    .max(5000, 'Feedback message exceeds maximum length of 5000 characters.')
    .refine((val) => val.trim().length > 0, {
      message: 'Feedback message cannot contain only whitespace.',
    }),
  rating: z
    .number()
    .int('Rating must be an integer.')
    .min(1, 'Rating must be at least 1.')
    .max(5, 'Rating cannot exceed 5.')
    .optional(),
  email: z
    .string()
    .email('Invalid email address format.')
    .max(255, 'Email exceeds maximum length.')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  context: z
    .record(z.string(), z.unknown())
    .optional()
    .refine((ctx) => {
      if (!ctx) return true;
      const str = JSON.stringify(ctx);
      return str.length < 15000;
    }, 'Context metadata payload is too large.'),
});

export const TriageUpdateSchema = z.object({
  triage_status: z.enum(TRIAGE_STATUSES),
  triage_notes: z.string().max(5000).optional(),
});

export const ProjectCreateSchema = z.object({
  project_key: z
    .string()
    .min(3)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/),
  name: z.string().min(1).max(128),
  allowed_origins: z.array(z.string()).default(['*']),
});
