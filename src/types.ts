/**
 * Signal Feedback - Shared Type Definitions
 */

export type FeedbackCategory = 'bug' | 'feature' | 'general' | 'other';

export type TriageStatus = 'new' | 'in_review' | 'resolved' | 'archived';

export type WidgetTheme = 'auto' | 'light' | 'dark';

export type WidgetPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export type WidgetMode = 'floating' | 'embedded';

export type ContrastMode = 'normal' | 'high';

export interface CategoryOption {
  id: FeedbackCategory;
  label: string;
  description: string;
  icon: string;
}

export interface ClientContext {
  url?: string;
  referrer?: string;
  userAgent?: string;
  viewport?: { width: number; height: number };
  locale?: string;
  timezone?: string;
  appVersion?: string;
  custom?: Record<string, unknown>;
}

export interface FeedbackSubmissionPayload {
  project_key: string;
  category: FeedbackCategory;
  message: string;
  rating?: number;
  email?: string;
  context?: ClientContext;
}

export interface FeedbackRecord {
  id: string;
  project_id: string;
  category: FeedbackCategory;
  message: string;
  rating: number | null;
  email: string | null;
  context: ClientContext;
  triage_status: TriageStatus;
  triage_notes: string | null;
  client_ip_hash: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectRecord {
  id: string;
  project_key: string;
  name: string;
  allowed_origins: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BackgroundPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  photographer: string;
  photographerUrl: string;
  sourceUrl: string;
  license: string;
  recommendedTheme: 'light' | 'dark';
  defaultOverlayOpacity: number;
  fallbackGradient: string;
}

export type SubmissionStatus =
  | 'idle'
  | 'editing'
  | 'validation-error'
  | 'submitting'
  | 'success'
  | 'server-rejection'
  | 'rate-limited'
  | 'network-error'
  | 'timeout'
  | 'invalid-response'
  | 'disabled';

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  requestId: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    retryAfter?: number;
  };
  requestId: string;
  timestamp: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface SignalEventsMap {
  'signal:open': CustomEvent<void>;
  'signal:close': CustomEvent<void>;
  'signal:state-change': CustomEvent<{ state: SubmissionStatus; error?: string }>;
  'signal:submit-success': CustomEvent<{ id: string; category: FeedbackCategory; rating?: number }>;
  'signal:submit-error': CustomEvent<{ code: string; message: string; details?: unknown }>;
}
