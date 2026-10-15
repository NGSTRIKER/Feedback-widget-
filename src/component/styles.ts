/**
 * Scoped Shadow DOM CSS Styles for Signal Feedback Component
 * Ultra-aesthetic glassmorphism with vivid photographic backgrounds
 */
export const SIGNAL_STYLES = /* css */ `
:host {
  --signal-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --signal-accent: #3b82f6;
  --signal-accent-hover: #2563eb;
  --signal-accent-text: #ffffff;
  --signal-radius: 20px;
  --signal-control-radius: 10px;
  --signal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12);
  --signal-z-index: 99999;
  
  /* Vibrant readable dark theme variables */
  --signal-text-primary: #ffffff;
  --signal-text-secondary: rgba(255, 255, 255, 0.82);
  --signal-text-muted: rgba(255, 255, 255, 0.60);
  --signal-input-bg: rgba(15, 23, 42, 0.55);
  --signal-input-border: rgba(255, 255, 255, 0.20);
  --signal-input-border-focus: #60a5fa;
  --signal-overlay-color: rgba(10, 15, 26, 0.45);
  --signal-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  
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
  --signal-input-bg: rgba(255, 255, 255, 0.75);
  --signal-input-border: rgba(0, 0, 0, 0.18);
  --signal-overlay-color: rgba(255, 255, 255, 0.55);
  --signal-text-shadow: none;
}

:host([contrast-mode="high"]) {
  --signal-input-bg: rgba(8, 12, 20, 0.88);
  --signal-input-border: #ffffff;
  --signal-text-primary: #ffffff;
  --signal-text-secondary: #f8fafc;
  --signal-text-muted: #e2e8f0;
  --signal-overlay-color: rgba(5, 8, 15, 0.75);
}

:host([contrast-mode="high"][theme="light"]) {
  --signal-input-bg: #ffffff;
  --signal-input-border: #000000;
  --signal-text-primary: #000000;
  --signal-text-secondary: #0f172a;
  --signal-text-muted: #1e293b;
  --signal-overlay-color: rgba(255, 255, 255, 0.85);
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* Floating Launcher Trigger */
.signal-launcher {
  position: fixed;
  z-index: var(--signal-z-index);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 22px;
  background: linear-gradient(135deg, var(--signal-accent) 0%, var(--signal-accent-hover) 100%);
  color: var(--signal-accent-text);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 9999px;
  box-shadow: 0 12px 24px -4px rgba(37, 99, 235, 0.4), 0 4px 8px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, filter 0.2s ease;
  user-select: none;
}

.signal-launcher:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 16px 30px -4px rgba(37, 99, 235, 0.5), 0 6px 12px -2px rgba(0, 0, 0, 0.3);
  filter: brightness(1.05);
}

.signal-launcher:active {
  transform: translateY(0) scale(0.99);
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
  width: 19px;
  height: 19px;
  display: inline-block;
  flex-shrink: 0;
}

/* The Panel Container */
.signal-panel-container {
  display: none;
  position: fixed;
  z-index: calc(var(--signal-z-index) + 1);
  width: 440px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 48px);
  box-shadow: var(--signal-shadow);
  border-radius: var(--signal-radius);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: scale(0.96) translateY(8px);
  transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: #0b0f19;
}

:host([position="bottom-right"]) .signal-panel-container,
:host(:not([position])) .signal-panel-container {
  bottom: 84px;
  right: 24px;
}

:host([position="bottom-left"]) .signal-panel-container {
  bottom: 84px;
  left: 24px;
}

:host([position="top-right"]) .signal-panel-container {
  top: 84px;
  right: 24px;
}

:host([position="top-left"]) .signal-panel-container {
  top: 84px;
  left: 24px;
}

/* Embedded mode styling */
:host([mode="embedded"]) {
  display: block;
  width: 100%;
  max-width: 460px;
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
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  transition: background-image 0.4s ease, opacity 0.3s ease;
  overflow: hidden;
}

/* Layer 2: Adaptive Scrim Overlay - opacity driven by slider */
.signal-panel-overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(10, 15, 26, 0.35) 0%,
    rgba(10, 15, 26, 0.70) 50%,
    rgba(10, 15, 26, 0.95) 100%
  );
  opacity: var(--signal-overlay-opacity, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  pointer-events: none;
  transition: opacity 0.1s ease;
}

:host([theme="light"]) .signal-panel-overlay-layer {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.70) 50%,
    rgba(255, 255, 255, 0.95) 100%
  );
}

/* Layer 3: Content Surface - TRANSPARENT to let the photograph shine through */
.signal-panel-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 90px);
  padding: 24px;
  color: var(--signal-text-primary);
  background: transparent !important;
}

/* Header */
.signal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
  gap: 12px;
}

.signal-title-area {
  flex: 1;
}

.signal-title {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--signal-text-primary);
  text-shadow: var(--signal-text-shadow);
  line-height: 1.25;
}

.signal-desc {
  margin: 5px 0 0 0;
  font-size: 13px;
  color: var(--signal-text-secondary);
  text-shadow: var(--signal-text-shadow);
  line-height: 1.45;
}

.signal-close-btn {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--signal-text-primary);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.18s ease;
  flex-shrink: 0;
}

.signal-close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(90deg) scale(1.08);
}

.signal-close-btn:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

/* Category Selection Grid */
.signal-category-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--signal-text-secondary);
  text-shadow: var(--signal-text-shadow);
  margin-bottom: 9px;
}

.signal-category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin-bottom: 18px;
}

.signal-cat-option {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 13px;
  border: 1px solid var(--signal-input-border);
  background: var(--signal-input-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--signal-control-radius);
  color: var(--signal-text-primary);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
}

.signal-cat-option:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.signal-cat-option[aria-checked="true"] {
  border-color: #60a5fa;
  background: rgba(59, 130, 246, 0.28);
  color: #ffffff;
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.4), inset 0 0 0 1px #60a5fa;
}

.signal-cat-option:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

.signal-cat-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  opacity: 0.9;
}

/* Satisfaction Rating Stars */
.signal-rating-group {
  margin-bottom: 18px;
}

.signal-rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.signal-rating-value {
  font-size: 12px;
  font-weight: 600;
  color: #fde047;
  text-shadow: var(--signal-text-shadow);
}

.signal-stars {
  display: flex;
  gap: 8px;
}

.signal-star-btn {
  background: var(--signal-input-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--signal-input-border);
  border-radius: var(--signal-control-radius);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--signal-text-muted);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
}

.signal-star-btn:hover,
.signal-star-btn[aria-checked="true"],
.signal-star-btn.active {
  color: #facc15;
  border-color: #facc15;
  background: rgba(250, 204, 21, 0.22);
  box-shadow: 0 0 14px rgba(250, 204, 21, 0.35);
  transform: scale(1.06);
}

.signal-star-btn:focus-visible {
  outline: 2px solid var(--signal-accent);
  outline-offset: 2px;
}

/* Form inputs with frosted glass */
.signal-form-group {
  margin-bottom: 16px;
}

.signal-field-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--signal-text-secondary);
  text-shadow: var(--signal-text-shadow);
  margin-bottom: 7px;
}

.signal-char-counter {
  font-size: 11px;
  font-weight: 500;
  color: var(--signal-text-muted);
  text-transform: none;
}

.signal-char-counter.warning {
  color: #fbbf24;
}

.signal-char-counter.error {
  color: #f87171;
}

.signal-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px 14px;
  background: var(--signal-input-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--signal-input-border);
  border-radius: var(--signal-control-radius);
  color: var(--signal-text-primary);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.signal-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

:host([theme="light"]) .signal-textarea::placeholder {
  color: rgba(0, 0, 0, 0.45);
}

.signal-textarea:focus {
  outline: none;
  border-color: var(--signal-input-border-focus);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);
}

.signal-input {
  width: 100%;
  height: 42px;
  padding: 8px 14px;
  background: var(--signal-input-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--signal-input-border);
  border-radius: var(--signal-control-radius);
  color: var(--signal-text-primary);
  font-family: inherit;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.signal-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

:host([theme="light"]) .signal-input::placeholder {
  color: rgba(0, 0, 0, 0.45);
}

.signal-input:focus {
  outline: none;
  border-color: var(--signal-input-border-focus);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Feedback & error messages */
.signal-error-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 11px 14px;
  background: rgba(220, 38, 38, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: var(--signal-control-radius);
  color: #fecaca;
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.signal-error-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Transparency disclosure */
.signal-disclosure {
  font-size: 11px;
  color: var(--signal-text-muted);
  text-shadow: var(--signal-text-shadow);
  line-height: 1.45;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.signal-disclosure-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  opacity: 0.85;
}

/* Footer / Actions */
.signal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}

.signal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  padding: 0 20px;
  border-radius: var(--signal-control-radius);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  line-height: 1;
}

.signal-btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: var(--signal-text-secondary);
}

.signal-btn-cancel:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--signal-text-primary);
}

.signal-btn-primary {
  background: linear-gradient(135deg, var(--signal-accent) 0%, var(--signal-accent-hover) 100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: var(--signal-accent-text);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
}

.signal-btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
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
  width: 15px;
  height: 15px;
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
  padding: 32px 16px;
}

.signal-success-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.25);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(34, 197, 94, 0.5);
  color: #4ade80;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  box-shadow: 0 0 24px rgba(34, 197, 94, 0.35);
}

.signal-success-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: var(--signal-text-shadow);
}

.signal-success-text {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: var(--signal-text-shadow);
  line-height: 1.5;
  max-width: 320px;
}

/* Image Attribution Watermark inside widget */
.signal-photo-credit {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  text-shadow: var(--signal-text-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.signal-photo-credit a {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.signal-photo-credit a:hover {
  color: #ffffff;
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
