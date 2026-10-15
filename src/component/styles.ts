/**
 * Scoped Shadow DOM CSS Styles for Signal Feedback Component
 */
export const SIGNAL_STYLES = /* css */ `
:host {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --signal-accent: #3b82f6;
  --signal-accent-hover: #2563eb;
  --signal-accent-text: #ffffff;
  --signal-radius: 16px;
  --signal-control-radius: 8px;
  --signal-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.25);
  --signal-z-index: 99999;
  
  /* Fallback dark theme variables */
  --signal-text-primary: #f8fafc;
  --signal-text-secondary: #cbd5e1;
  --signal-text-muted: #94a3b8;
  --signal-surface-bg: rgba(15, 23, 42, 0.88);
  --signal-input-bg: rgba(15, 23, 42, 0.75);
  --signal-input-border: rgba(255, 255, 255, 0.18);
  --signal-input-border-focus: var(--signal-accent);
  --signal-overlay-color: rgba(15, 23, 42, 0.65);
  
  display: block;
  font-family: var(--signal-font-sans);
  color: var(--signal-text-primary);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:host([theme="light"]) {
  --signal-text-primary: #0f172a;
  --signal-text-secondary: #334155;
  --signal-text-muted: #64748b;
  --signal-surface-bg: rgba(255, 255, 255, 0.92);
  --signal-input-bg: rgba(255, 255, 255, 0.88);
  --signal-input-border: rgba(0, 0, 0, 0.22);
  --signal-overlay-color: rgba(255, 255, 255, 0.70);
}

:host([contrast-mode="high"]) {
  --signal-surface-bg: rgba(10, 15, 25, 0.98);
  --signal-input-bg: #090d16;
  --signal-input-border: #ffffff;
  --signal-text-primary: #ffffff;
  --signal-text-secondary: #f1f5f9;
  --signal-text-muted: #e2e8f0;
}

:host([contrast-mode="high"][theme="light"]) {
  --signal-surface-bg: #ffffff;
  --signal-input-bg: #f8fafc;
  --signal-input-border: #000000;
  --signal-text-primary: #000000;
  --signal-text-secondary: #0f172a;
  --signal-text-muted: #1e293b;
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* Base launcher trigger */
.signal-launcher {
  position: fixed;
  z-index: var(--signal-z-index);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background-color: var(--signal-accent);
  color: var(--signal-accent-text);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s ease, box-shadow 0.2s ease;
  user-select: none;
}

.signal-launcher:hover {
  background-color: var(--signal-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 14px 20px -3px rgba(0, 0, 0, 0.35);
}

.signal-launcher:active {
  transform: translateY(0);
}

.signal-launcher:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 3px;
}

/* Positions for launcher and floating panel */
:host([position="bottom-right"]) .signal-launcher,
:host(:not([position])) .signal-launcher {
  bottom: 24px;
  right: 24px;
}

:host([position="bottom-left"]) .signal-launcher {
  bottom: 24px;
  left: 24px;
}

:host([position="top-right"]) .signal-launcher {
  top: 24px;
  right: 24px;
}

:host([position="top-left"]) .signal-launcher {
  top: 24px;
  left: 24px;
}

.signal-launcher-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  flex-shrink: 0;
}

/* The Panel Container */
.signal-panel-container {
  display: none;
  position: fixed;
  z-index: calc(var(--signal-z-index) + 1);
  width: 420px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 48px);
  box-shadow: var(--signal-shadow);
  border-radius: var(--signal-radius);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  opacity: 0;
  transform: scale(0.96) translateY(8px);
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

:host([position="bottom-right"]) .signal-panel-container,
:host(:not([position])) .signal-panel-container {
  bottom: 80px;
  right: 24px;
}

:host([position="bottom-left"]) .signal-panel-container {
  bottom: 80px;
  left: 24px;
}

:host([position="top-right"]) .signal-panel-container {
  top: 80px;
  right: 24px;
}

:host([position="top-left"]) .signal-panel-container {
  top: 80px;
  left: 24px;
}

/* Embedded mode styling */
:host([mode="embedded"]) {
  display: block;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

:host([mode="embedded"]) .signal-launcher {
  display: none !important;
}

:host([mode="embedded"]) .signal-panel-container {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  width: 100% !important;
  max-width: 100% !important;
  max-height: none !important;
  display: flex !important;
  opacity: 1 !important;
  transform: none !important;
}

:host([open]) .signal-panel-container {
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* CRITICAL: Background photograph inside the widget panel */
.signal-panel-bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: background-image 0.4s ease;
  overflow: hidden;
}

/* Layer 2: Adaptive Overlay Scrim */
.signal-panel-overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: var(--signal-overlay-color);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  pointer-events: none;
}

/* Layer 3: High-contrast Content Surface */
.signal-panel-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
  padding: 22px;
  color: var(--signal-text-primary);
  background: var(--signal-surface-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Header */
.signal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.signal-title-area {
  flex: 1;
}

.signal-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--signal-text-primary);
  line-height: 1.3;
}

.signal-desc {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: var(--signal-text-secondary);
  line-height: 1.4;
}

.signal-close-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--signal-text-secondary);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.signal-close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--signal-text-primary);
}

.signal-close-btn:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

/* Category Selection Grid */
.signal-category-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--signal-text-secondary);
  margin-bottom: 8px;
}

.signal-category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.signal-cat-option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--signal-input-border);
  background: var(--signal-input-bg);
  border-radius: var(--signal-control-radius);
  color: var(--signal-text-primary);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: border-color 0.15s ease, background 0.15s ease;
  text-align: left;
}

.signal-cat-option:hover {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
}

.signal-cat-option[aria-checked="true"] {
  border-color: var(--signal-accent);
  background: rgba(59, 130, 246, 0.16);
  color: #ffffff;
  box-shadow: 0 0 0 1px var(--signal-accent);
}

.signal-cat-option:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

.signal-cat-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.85;
}

/* Satisfaction Rating Stars / Scales */
.signal-rating-group {
  margin-bottom: 16px;
}

.signal-rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.signal-rating-value {
  font-size: 12px;
  font-weight: 500;
  color: var(--signal-text-muted);
}

.signal-stars {
  display: flex;
  gap: 6px;
}

.signal-star-btn {
  background: var(--signal-input-bg);
  border: 1px solid var(--signal-input-border);
  border-radius: var(--signal-control-radius);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--signal-text-muted);
  transition: transform 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  padding: 0;
}

.signal-star-btn:hover,
.signal-star-btn[aria-checked="true"],
.signal-star-btn.active {
  color: #facc15;
  border-color: #facc15;
  background: rgba(250, 204, 21, 0.12);
}

.signal-star-btn:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

/* Form inputs */
.signal-form-group {
  margin-bottom: 14px;
}

.signal-field-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--signal-text-secondary);
  margin-bottom: 6px;
}

.signal-char-counter {
  font-size: 11px;
  font-weight: 400;
  color: var(--signal-text-muted);
  text-transform: none;
}

.signal-char-counter.warning {
  color: #f59e0b;
}

.signal-char-counter.error {
  color: #ef4444;
}

.signal-textarea {
  width: 100%;
  min-height: 96px;
  padding: 10px 12px;
  background: var(--signal-input-bg);
  border: 1px solid var(--signal-input-border);
  border-radius: var(--signal-control-radius);
  color: var(--signal-text-primary);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.signal-textarea:focus {
  outline: none;
  border-color: var(--signal-input-border-focus);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.signal-input {
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  background: var(--signal-input-bg);
  border: 1px solid var(--signal-input-border);
  border-radius: var(--signal-control-radius);
  color: var(--signal-text-primary);
  font-family: inherit;
  font-size: 13px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.signal-input:focus {
  outline: none;
  border-color: var(--signal-input-border-focus);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

/* Feedback & error messages */
.signal-error-alert {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(239, 68, 68, 0.16);
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: var(--signal-control-radius);
  color: #fca5a5;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 14px;
}

.signal-error-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Transparency disclosure */
.signal-disclosure {
  font-size: 11px;
  color: var(--signal-text-muted);
  line-height: 1.4;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.signal-disclosure-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  opacity: 0.7;
}

/* Footer / Actions */
.signal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

.signal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  padding: 0 18px;
  border-radius: var(--signal-control-radius);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  line-height: 1;
}

.signal-btn-cancel {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--signal-text-secondary);
}

.signal-btn-cancel:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--signal-text-primary);
}

.signal-btn-primary {
  background: var(--signal-accent);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--signal-accent-text);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.signal-btn-primary:hover:not(:disabled) {
  background: var(--signal-accent-hover);
  transform: translateY(-1px);
}

.signal-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.signal-btn:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

/* Spinner */
.signal-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: signal-spin 0.6s linear infinite;
}

@keyframes signal-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Success View */
.signal-success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 12px;
}

.signal-success-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #4ade80;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.signal-success-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--signal-text-primary);
}

.signal-success-text {
  margin: 0 0 20px 0;
  font-size: 13px;
  color: var(--signal-text-secondary);
  line-height: 1.5;
  max-width: 320px;
}

/* Image Attribution Watermark inside widget */
.signal-photo-credit {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 10px;
  color: var(--signal-text-muted);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.signal-photo-credit a {
  color: var(--signal-text-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.signal-photo-credit a:hover {
  color: var(--signal-text-primary);
}

/* Live region for SR */
.signal-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .signal-launcher,
  .signal-panel-container,
  .signal-cat-option,
  .signal-star-btn,
  .signal-btn,
  .signal-spinner {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}

/* Mobile responsive constraints */
@media (max-width: 480px) {
  :host([position="bottom-right"]) .signal-panel-container,
  :host([position="bottom-left"]) .signal-panel-container {
    left: 12px !important;
    right: 12px !important;
    bottom: 74px !important;
    width: auto !important;
    max-width: calc(100vw - 24px) !important;
  }
  
  :host([position="top-right"]) .signal-panel-container,
  :host([position="top-left"]) .signal-panel-container {
    left: 12px !important;
    right: 12px !important;
    top: 74px !important;
    width: auto !important;
    max-width: calc(100vw - 24px) !important;
  }

  .signal-category-grid {
    grid-template-columns: 1fr;
  }
}
`;
