import {
  FeedbackSubmissionPayload,
  ApiResponse,
  ApiSuccessResponse,
  ClientContext,
} from '../types.js';

export class FeedbackApiError extends Error {
  code: string;
  statusCode?: number;
  retryAfter?: number;
  details?: unknown;

  constructor(
    message: string,
    options: {
      code: string;
      statusCode?: number;
      retryAfter?: number;
      details?: unknown;
    }
  ) {
    super(message);
    this.name = 'FeedbackApiError';
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.retryAfter = options.retryAfter;
    this.details = options.details;
  }
}

export function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'idemp_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

export function collectClientContext(): ClientContext {
  if (typeof window === 'undefined') {
    return {};
  }

  const context: ClientContext = {
    url: window.location.href,
    referrer: document.referrer || undefined,
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    locale: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return context;
}

export interface SubmitFeedbackOptions {
  baseUrl: string;
  payload: FeedbackSubmissionPayload;
  idempotencyKey?: string;
  timeoutMs?: number;
}

export async function submitFeedback(
  options: SubmitFeedbackOptions
): Promise<ApiSuccessResponse<{ id: string }>> {
  const { baseUrl, payload, idempotencyKey = generateIdempotencyKey(), timeoutMs = 10000 } = options;

  // Clean baseUrl by trimming trailing slash
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const url = `${cleanBase}/v1/feedback`;

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Project-Key': payload.project_key,
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err: unknown) {
    clearTimeout(timer);
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        throw new FeedbackApiError('Request timed out. Please try again.', {
          code: 'REQUEST_TIMEOUT',
        });
      }
      throw new FeedbackApiError(err.message || 'Network error occurred.', {
        code: 'NETWORK_ERROR',
      });
    }
    throw new FeedbackApiError('Failed to communicate with feedback service.', {
      code: 'NETWORK_ERROR',
    });
  } finally {
    clearTimeout(timer);
  }

  // Parse response body
  let data: ApiResponse<{ id: string }>;
  try {
    data = await response.json();
  } catch {
    throw new FeedbackApiError(
      `Received invalid response from server (Status ${response.status}).`,
      {
        code: 'INVALID_SERVER_RESPONSE',
        statusCode: response.status,
      }
    );
  }

  if (!response.ok || !data.success) {
    const errorObj = !data.success ? data.error : undefined;
    const code = errorObj?.code || `HTTP_${response.status}`;
    const message = errorObj?.message || `Feedback submission failed (${response.status})`;
    const retryAfter =
      errorObj?.retryAfter ||
      (response.headers.get('Retry-After')
        ? parseInt(response.headers.get('Retry-After')!, 10)
        : undefined);

    throw new FeedbackApiError(message, {
      code,
      statusCode: response.status,
      retryAfter,
      details: errorObj?.details,
    });
  }

  return data as ApiSuccessResponse<{ id: string }>;
}
