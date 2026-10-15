import {
  FeedbackCategory,
  SubmissionStatus,
  WidgetTheme,
  WidgetPosition,
  WidgetMode,
  ContrastMode,
  BackgroundPreset,
} from '../types.js';
import {
  BACKGROUND_PRESETS,
  getBackgroundPreset,
  sanitizeImageUrl,
  preloadImage,
} from './backgrounds.js';
import { SIGNAL_STYLES } from './styles.js';
import {
  submitFeedback,
  collectClientContext,
  FeedbackApiError,
} from './api-client.js';

export class SignalFeedback extends HTMLElement {
  static observedAttributes = [
    'api-base-url',
    'project-key',
    'theme',
    'background',
    'background-position',
    'overlay-intensity',
    'contrast-mode',
    'accent-color',
    'position',
    'mode',
    'launcher-label',
    'panel-title',
    'panel-description',
    'enable-rating',
    'enable-email',
    'enable-context',
    'max-length',
    'open',
  ];

  // State
  private _status: SubmissionStatus = 'idle';
  private _errorMessage: string | null = null;
  private _selectedCategory: FeedbackCategory = 'general';
  private _rating: number = 0;
  private _message: string = '';
  private _email: string = '';
  private _activeBackgroundUrl: string | null = null;
  private _activeFallbackGradient: string = '';
  private _photographerName: string | null = null;
  private _photographerUrl: string | null = null;
  private _lastFocusedElement: HTMLElement | null = null;

  // DOM Elements
  private _shadowRoot: ShadowRoot;
  private _panelContainer: HTMLElement | null = null;
  private _launcherBtn: HTMLButtonElement | null = null;
  private _bgLayer: HTMLElement | null = null;
  private _overlayLayer: HTMLElement | null = null;
  private _contentLayer: HTMLElement | null = null;
  private _messageTextarea: HTMLTextAreaElement | null = null;
  private _charCounter: HTMLElement | null = null;
  private _errorContainer: HTMLElement | null = null;
  private _liveRegion: HTMLElement | null = null;

  // Listeners
  private _handleKeyDownBound = this._handleKeyDown.bind(this);
  private _handleDocumentClickBound = this._handleDocumentClick.bind(this);

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._applyCustomProperties();
    this._updateBackground();

    document.addEventListener('keydown', this._handleKeyDownBound);
    document.addEventListener('click', this._handleDocumentClickBound);

    if (this.hasAttribute('open') || this.getAttribute('mode') === 'embedded') {
      this._openPanelUI(false);
    }
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._handleKeyDownBound);
    document.removeEventListener('click', this._handleDocumentClickBound);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    if (name === 'open') {
      if (this.hasAttribute('open')) {
        this._openPanelUI(true);
      } else {
        this._closePanelUI(true);
      }
      return;
    }

    if (name === 'background' || name === 'background-position' || name === 'overlay-intensity') {
      this._updateBackground();
      return;
    }

    if (name === 'accent-color' || name === 'theme' || name === 'contrast-mode') {
      this._applyCustomProperties();
      return;
    }

    // For labels and configurations, re-render content if mounted
    if (this._panelContainer) {
      this._render();
      this._applyCustomProperties();
      this._updateBackground();
    }
  }

  // Getters and Setters for standard JavaScript API
  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(val: boolean) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get apiBaseUrl(): string {
    return this.getAttribute('api-base-url') || '';
  }

  set apiBaseUrl(val: string) {
    this.setAttribute('api-base-url', val);
  }

  get projectKey(): string {
    return this.getAttribute('project-key') || '';
  }

  set projectKey(val: string) {
    this.setAttribute('project-key', val);
  }

  get theme(): WidgetTheme {
    return (this.getAttribute('theme') as WidgetTheme) || 'auto';
  }

  set theme(val: WidgetTheme) {
    this.setAttribute('theme', val);
  }

  get background(): string {
    return this.getAttribute('background') || 'lavender-clouds';
  }

  set background(val: string) {
    this.setAttribute('background', val);
  }

  get maxLength(): number {
    const val = parseInt(this.getAttribute('max-length') || '2000', 10);
    return isNaN(val) || val <= 0 ? 2000 : val;
  }

  set maxLength(val: number) {
    this.setAttribute('max-length', val.toString());
  }

  public show() {
    this.open = true;
  }

  public hide() {
    this.open = false;
  }

  public toggle() {
    this.open = !this.open;
  }

  public reset() {
    this._status = 'idle';
    this._errorMessage = null;
    this._message = '';
    this._rating = 0;
    this._email = '';
    this._selectedCategory = 'general';
    this._render();
    this._updateBackground();
  }

  private _openPanelUI(triggerEvent = true) {
    if (this._panelContainer) {
      this._panelContainer.style.display = 'flex';
      // Force reflow for CSS animation
      void this._panelContainer.offsetWidth;
      this._panelContainer.style.opacity = '1';
      this._panelContainer.style.transform = 'scale(1) translateY(0)';
    }

    if (this._launcherBtn) {
      this._launcherBtn.setAttribute('aria-expanded', 'true');
    }

    this._lastFocusedElement = document.activeElement as HTMLElement;

    // Focus first interactive control in panel
    setTimeout(() => {
      const firstControl = this._shadowRoot.querySelector<HTMLElement>(
        '.signal-cat-option, .signal-textarea, button'
      );
      firstControl?.focus();
    }, 50);

    this._announce('Feedback dialog opened.');

    if (triggerEvent) {
      this.dispatchEvent(new CustomEvent('signal:open', { bubbles: true, composed: true }));
    }
  }

  private _closePanelUI(triggerEvent = true) {
    if (this.getAttribute('mode') === 'embedded') return; // Cannot close embedded mode

    if (this._panelContainer) {
      this._panelContainer.style.opacity = '0';
      this._panelContainer.style.transform = 'scale(0.96) translateY(8px)';
      setTimeout(() => {
        if (!this.hasAttribute('open') && this._panelContainer) {
          this._panelContainer.style.display = 'none';
        }
      }, 200);
    }

    if (this._launcherBtn) {
      this._launcherBtn.setAttribute('aria-expanded', 'false');
      if (this._lastFocusedElement && document.contains(this._lastFocusedElement)) {
        this._lastFocusedElement.focus();
      } else {
        this._launcherBtn.focus();
      }
    }

    this._announce('Feedback dialog closed.');

    if (triggerEvent) {
      this.dispatchEvent(new CustomEvent('signal:close', { bubbles: true, composed: true }));
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open && this.getAttribute('mode') !== 'embedded') {
      e.preventDefault();
      this.open = false;
    }
  }

  private _handleDocumentClick(e: MouseEvent) {
    if (!this.open || this.getAttribute('mode') === 'embedded') return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  }

  private _applyCustomProperties() {
    const accent = this.getAttribute('accent-color');
    if (accent) {
      this.style.setProperty('--signal-accent', accent);
      this.style.setProperty('--signal-input-border-focus', accent);
    }

    const intensity = this.getAttribute('overlay-intensity');
    const num = intensity !== null ? parseFloat(intensity) : 45;
    const normalized = !isNaN(num) ? (num > 1 ? num / 100 : num) : 0.45;
    const theme = this.getAttribute('theme');
    const isLight = theme === 'light';
    const baseRgb = isLight ? '255, 255, 255' : '10, 15, 26';
    const o1 = Math.max(normalized - 0.15, 0.15).toFixed(2);
    const o2 = normalized.toFixed(2);
    const o3 = Math.min(normalized + 0.25, 0.92).toFixed(2);

    if (this._overlayLayer) {
      this._overlayLayer.style.background = `linear-gradient(180deg, rgba(${baseRgb}, ${o1}) 0%, rgba(${baseRgb}, ${o2}) 50%, rgba(${baseRgb}, ${o3}) 100%)`;
    }
  }

  private async _updateBackground() {
    const bgAttr = this.getAttribute('background') || 'lavender-clouds';
    const bgPos = this.getAttribute('background-position') || 'center center';

    let targetUrl: string | null = null;
    let fallbackGrad = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
    let pName: string | null = null;
    let pUrl: string | null = null;

    const preset = getBackgroundPreset(bgAttr);
    if (preset) {
      targetUrl = preset.url;
      fallbackGrad = preset.fallbackGradient;
      pName = preset.photographer;
      pUrl = preset.photographerUrl;
    } else {
      const sanitized = sanitizeImageUrl(bgAttr);
      if (sanitized) {
        targetUrl = sanitized;
      }
    }

    this._activeFallbackGradient = fallbackGrad;
    this._photographerName = pName;
    this._photographerUrl = pUrl;

    if (this._bgLayer) {
      this._bgLayer.style.backgroundPosition = bgPos;
      this._bgLayer.style.backgroundSize = 'cover';
      this._bgLayer.style.backgroundRepeat = 'no-repeat';

      if (targetUrl) {
        this._activeBackgroundUrl = targetUrl;
        // Mount image with fallback gradient immediately for zero-delay browser rendering
        this._bgLayer.style.backgroundImage = `url("${targetUrl}"), ${fallbackGrad}`;

        preloadImage(targetUrl).then((ok) => {
          if (!ok && this._bgLayer) {
            this._bgLayer.style.backgroundImage = fallbackGrad;
            this._activeBackgroundUrl = null;
          }
        });
      } else {
        this._activeBackgroundUrl = null;
        this._bgLayer.style.backgroundImage = fallbackGrad;
      }
    }

    this._updateAttributionUI();
  }

  private _updateAttributionUI() {
    const creditEl = this._shadowRoot.querySelector<HTMLElement>('.signal-photo-credit');
    if (creditEl) {
      if (this._photographerName && this._photographerUrl) {
        creditEl.style.display = 'flex';
        creditEl.innerHTML = `
          <span>Background photo</span>
          <span>By <a href="${this._photographerUrl}" target="_blank" rel="noopener noreferrer">${this._escape(
          this._photographerName
        )}</a> on Unsplash</span>
        `;
      } else {
        creditEl.style.display = 'none';
      }
    }
  }

  private _announce(msg: string) {
    if (this._liveRegion) {
      this._liveRegion.textContent = msg;
    }
  }

  private _render() {
    const launcherLabel = this.getAttribute('launcher-label') ?? 'Feedback';
    const panelTitle = this.getAttribute('panel-title') ?? 'Send Feedback';
    const panelDesc =
      this.getAttribute('panel-description') ??
      'We value your thoughts. Let us know how we can improve.';
    const enableRating = this.getAttribute('enable-rating') !== 'false';
    const enableEmail = this.getAttribute('enable-email') !== 'false';
    const enableContext = this.getAttribute('enable-context') !== 'false';
    const mode = this.getAttribute('mode') || 'floating';

    this._shadowRoot.innerHTML = `
      <style>${SIGNAL_STYLES}</style>
      
      <!-- Screen Reader Announcement Live Region -->
      <div class="signal-sr-only" aria-live="polite" aria-atomic="true"></div>

      <!-- Trigger Launcher (Floating Mode) -->
      ${
        mode !== 'embedded'
          ? `
        <button
          type="button"
          class="signal-launcher"
          aria-haspopup="dialog"
          aria-expanded="${this.open ? 'true' : 'false'}"
          aria-controls="signal-panel"
        >
          <svg class="signal-launcher-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>${this._escape(launcherLabel)}</span>
        </button>
      `
          : ''
      }

      <!-- Panel Container with Layered Architecture -->
      <div
        id="signal-panel"
        class="signal-panel-container"
        role="dialog"
        aria-modal="${mode !== 'embedded' ? 'true' : 'false'}"
        aria-labelledby="signal-title"
        aria-describedby="signal-desc"
      >
        <!-- Layer 1: Background Photograph inside Widget -->
        <div class="signal-panel-bg-layer" aria-hidden="true"></div>

        <!-- Layer 2: Adaptive Overlay Scrim -->
        <div class="signal-panel-overlay-layer" aria-hidden="true"></div>

        <!-- Layer 3: High-contrast Content Surface -->
        <div class="signal-panel-content">
          ${this._renderPanelBody({
            panelTitle,
            panelDesc,
            enableRating,
            enableEmail,
            enableContext,
            mode,
          })}
        </div>
      </div>
    `;

    // Cache elements
    this._launcherBtn = this._shadowRoot.querySelector('.signal-launcher');
    this._panelContainer = this._shadowRoot.querySelector('.signal-panel-container');
    this._bgLayer = this._shadowRoot.querySelector('.signal-panel-bg-layer');
    this._overlayLayer = this._shadowRoot.querySelector('.signal-panel-overlay-layer');
    this._contentLayer = this._shadowRoot.querySelector('.signal-panel-content');
    this._messageTextarea = this._shadowRoot.querySelector('.signal-textarea');
    this._charCounter = this._shadowRoot.querySelector('.signal-char-counter');
    this._errorContainer = this._shadowRoot.querySelector('.signal-error-alert');
    this._liveRegion = this._shadowRoot.querySelector('.signal-sr-only');

    this._bindEvents();
  }

  private _renderPanelBody(cfg: {
    panelTitle: string;
    panelDesc: string;
    enableRating: boolean;
    enableEmail: boolean;
    enableContext: boolean;
    mode: string;
  }): string {
    if (this._status === 'success') {
      return `
        <div class="signal-success-view">
          <div class="signal-success-icon-wrap" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 class="signal-success-title">Thank you!</h2>
          <p class="signal-success-text">Your feedback has been received and saved. We review all feedback to improve the experience.</p>
          <div class="signal-footer">
            <button type="button" class="signal-btn signal-btn-primary signal-btn-reset">
              Send another note
            </button>
          </div>
        </div>
      `;
    }

    const categories: Array<{ id: FeedbackCategory; label: string; icon: string }> = [
      {
        id: 'bug',
        label: 'Bug report',
        icon: '<path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M18 13h4M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>',
      },
      {
        id: 'feature',
        label: 'Feature request',
        icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
      },
      {
        id: 'general',
        label: 'General feedback',
        icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
      },
      {
        id: 'other',
        label: 'Other',
        icon: '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"></path>',
      },
    ];

    const isSubmitting = this._status === 'submitting';
    const remainingChars = this.maxLength - this._message.length;

    return `
      <!-- Header -->
      <div class="signal-header">
        <div class="signal-title-area">
          <h2 id="signal-title" class="signal-title">${this._escape(cfg.panelTitle)}</h2>
          <p id="signal-desc" class="signal-desc">${this._escape(cfg.panelDesc)}</p>
        </div>
        ${
          cfg.mode !== 'embedded'
            ? `
          <button type="button" class="signal-close-btn" aria-label="Close feedback panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        `
            : ''
        }
      </div>

      <!-- Error banner if any -->
      ${
        this._errorMessage
          ? `
        <div class="signal-error-alert" role="alert">
          <svg class="signal-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>${this._escape(this._errorMessage)}</div>
        </div>
      `
          : ''
      }

      <form class="signal-form" novalidate>
        <!-- Category Selector -->
        <span class="signal-category-label" id="signal-cat-label">Select category</span>
        <div class="signal-category-grid" role="radiogroup" aria-labelledby="signal-cat-label">
          ${categories
            .map(
              (cat) => `
            <button
              type="button"
              role="radio"
              class="signal-cat-option"
              data-category="${cat.id}"
              aria-checked="${this._selectedCategory === cat.id ? 'true' : 'false'}"
              ${isSubmitting ? 'disabled' : ''}
            >
              <svg class="signal-cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${cat.icon}
              </svg>
              <span>${cat.label}</span>
            </button>
          `
            )
            .join('')}
        </div>

        <!-- Optional Satisfaction Rating -->
        ${
          cfg.enableRating
            ? `
          <div class="signal-rating-group">
            <div class="signal-rating-header">
              <span class="signal-field-label">Satisfaction rating (optional)</span>
              <span class="signal-rating-value">${
                this._rating > 0 ? `${this._rating} of 5` : ''
              }</span>
            </div>
            <div class="signal-stars" role="radiogroup" aria-label="Satisfaction rating from 1 to 5">
              ${[1, 2, 3, 4, 5]
                .map(
                  (val) => `
                <button
                  type="button"
                  role="radio"
                  class="signal-star-btn ${this._rating >= val ? 'active' : ''}"
                  data-rating="${val}"
                  aria-checked="${this._rating === val ? 'true' : 'false'}"
                  aria-label="${val} star${val > 1 ? 's' : ''}"
                  ${isSubmitting ? 'disabled' : ''}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="${
                    this._rating >= val ? 'currentColor' : 'none'
                  }" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }

        <!-- Message Field -->
        <div class="signal-form-group">
          <div class="signal-field-label">
            <label for="signal-msg-input">Message</label>
            <span class="signal-char-counter ${
              remainingChars < 0 ? 'error' : remainingChars < 100 ? 'warning' : ''
            }">${this._message.length} / ${this.maxLength}</span>
          </div>
          <textarea
            id="signal-msg-input"
            class="signal-textarea"
            placeholder="Tell us what's on your mind..."
            maxlength="${this.maxLength + 200}"
            rows="3"
            aria-required="true"
            ${isSubmitting ? 'disabled' : ''}
          >${this._escape(this._message)}</textarea>
        </div>

        <!-- Optional Email Input -->
        ${
          cfg.enableEmail
            ? `
          <div class="signal-form-group">
            <div class="signal-field-label">
              <label for="signal-email-input">Email (optional for follow-up)</label>
            </div>
            <input
              id="signal-email-input"
              type="email"
              class="signal-input"
              placeholder="you@example.com"
              value="${this._escape(this._email)}"
              ${isSubmitting ? 'disabled' : ''}
            />
          </div>
        `
            : ''
        }

        <!-- Metadata Disclosure Notice -->
        ${
          cfg.enableContext
            ? `
          <div class="signal-disclosure">
            <svg class="signal-disclosure-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Submits page URL and browser diagnostics to resolve issues. No passwords or sensitive data collected.</span>
          </div>
        `
            : ''
        }

        <!-- Footer / Action Buttons -->
        <div class="signal-footer">
          ${
            cfg.mode !== 'embedded'
              ? `
            <button type="button" class="signal-btn signal-btn-cancel" ${
              isSubmitting ? 'disabled' : ''
            }>Cancel</button>
          `
              : ''
          }
          <button type="submit" class="signal-btn signal-btn-primary" ${
            isSubmitting ? 'disabled' : ''
          }>
            ${
              isSubmitting
                ? `<span class="signal-spinner" aria-hidden="true"></span><span>Sending...</span>`
                : `<span>Submit feedback</span>`
            }
          </button>
        </div>
      </form>

      <!-- Background Attribution Notice inside widget -->
      <div class="signal-photo-credit" aria-hidden="true"></div>
    `;
  }

  private _bindEvents() {
    if (this._launcherBtn) {
      this._launcherBtn.addEventListener('click', () => {
        this.open = !this.open;
      });
    }

    const closeBtn = this._shadowRoot.querySelector('.signal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.open = false;
      });
    }

    const cancelBtn = this._shadowRoot.querySelector('.signal-btn-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.open = false;
      });
    }

    const resetBtn = this._shadowRoot.querySelector('.signal-btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.reset();
      });
    }

    // Category options
    const catButtons = this._shadowRoot.querySelectorAll<HTMLButtonElement>('.signal-cat-option');
    catButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category') as FeedbackCategory;
        if (cat) {
          this._selectedCategory = cat;
          catButtons.forEach((b) =>
            b.setAttribute('aria-checked', b === btn ? 'true' : 'false')
          );
        }
      });
    });

    // Rating stars
    const starButtons = this._shadowRoot.querySelectorAll<HTMLButtonElement>('.signal-star-btn');
    starButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-rating') || '0', 10);
        this._rating = this._rating === val ? 0 : val;
        starButtons.forEach((b) => {
          const bVal = parseInt(b.getAttribute('data-rating') || '0', 10);
          b.classList.toggle('active', this._rating >= bVal);
          b.setAttribute('aria-checked', this._rating === bVal ? 'true' : 'false');
          const svg = b.querySelector('svg');
          if (svg) {
            svg.setAttribute('fill', this._rating >= bVal ? 'currentColor' : 'none');
          }
        });
        const ratingValEl = this._shadowRoot.querySelector('.signal-rating-value');
        if (ratingValEl) {
          ratingValEl.textContent = this._rating > 0 ? `${this._rating} of 5` : '';
        }
      });
    });

    // Message textarea
    if (this._messageTextarea) {
      this._messageTextarea.addEventListener('input', () => {
        this._message = this._messageTextarea!.value;
        const remaining = this.maxLength - this._message.length;
        if (this._charCounter) {
          this._charCounter.textContent = `${this._message.length} / ${this.maxLength}`;
          this._charCounter.className = `signal-char-counter ${
            remaining < 0 ? 'error' : remaining < 100 ? 'warning' : ''
          }`;
        }
      });
    }

    // Email input
    const emailInput = this._shadowRoot.querySelector<HTMLInputElement>('#signal-email-input');
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        this._email = emailInput.value;
      });
    }

    // Form submission
    const form = this._shadowRoot.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleSubmit();
      });
    }
  }

  private async _handleSubmit() {
    if (this._status === 'submitting') return;

    this._errorMessage = null;

    // Client-side validations
    const trimmedMsg = this._message.trim();
    if (!trimmedMsg) {
      this._setStatus('validation-error', 'Please enter a feedback message.');
      this._render();
      this._updateBackground();
      this._messageTextarea?.focus();
      return;
    }

    if (this._message.length > this.maxLength) {
      this._setStatus(
        'validation-error',
        `Message exceeds maximum allowed length of ${this.maxLength} characters.`
      );
      this._render();
      this._updateBackground();
      this._messageTextarea?.focus();
      return;
    }

    const trimmedEmail = this._email.trim();
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        this._setStatus('validation-error', 'Please enter a valid email address.');
        this._render();
        this._updateBackground();
        this._shadowRoot.querySelector<HTMLInputElement>('#signal-email-input')?.focus();
        return;
      }
    }

    const projectKey = this.getAttribute('project-key');
    if (!projectKey) {
      this._setStatus('disabled', 'Configuration error: project-key attribute is required.');
      this._render();
      this._updateBackground();
      return;
    }

    const baseUrl = this.getAttribute('api-base-url') || '';
    if (!baseUrl) {
      this._setStatus('disabled', 'Configuration error: api-base-url attribute is required.');
      this._render();
      this._updateBackground();
      return;
    }

    // Begin submission
    this._setStatus('submitting');
    this._render();
    this._updateBackground();
    this._announce('Submitting feedback...');

    const enableContext = this.getAttribute('enable-context') !== 'false';
    const context = enableContext ? collectClientContext() : undefined;

    try {
      const response = await submitFeedback({
        baseUrl,
        payload: {
          project_key: projectKey,
          category: this._selectedCategory,
          message: trimmedMsg,
          rating: this._rating > 0 ? this._rating : undefined,
          email: trimmedEmail || undefined,
          context,
        },
      });

      this._setStatus('success');
      this._render();
      this._updateBackground();
      this._announce('Feedback submitted successfully. Thank you!');

      this.dispatchEvent(
        new CustomEvent('signal:submit-success', {
          bubbles: true,
          composed: true,
          detail: {
            id: response.data.id,
            category: this._selectedCategory,
            rating: this._rating > 0 ? this._rating : undefined,
          },
        })
      );
    } catch (err: unknown) {
      if (err instanceof FeedbackApiError) {
        let userMsg = err.message;
        if (err.code === 'RATE_LIMIT_EXCEEDED') {
          userMsg = `You are submitting feedback too quickly. Please wait a few moments before trying again.`;
          this._setStatus('rate-limited', userMsg);
        } else if (err.code === 'REQUEST_TIMEOUT') {
          userMsg = 'Request timed out. Please check your connection and retry.';
          this._setStatus('timeout', userMsg);
        } else if (err.code === 'NETWORK_ERROR') {
          userMsg = 'Network unavailable. Unable to reach server.';
          this._setStatus('network-error', userMsg);
        } else {
          this._setStatus('server-rejection', userMsg);
        }

        this.dispatchEvent(
          new CustomEvent('signal:submit-error', {
            bubbles: true,
            composed: true,
            detail: { code: err.code, message: err.message, details: err.details },
          })
        );
      } else {
        const errorText = err instanceof Error ? err.message : 'An unexpected error occurred.';
        this._setStatus('server-rejection', errorText);
      }

      // Re-render to show error alert while strictly preserving typed message
      this._render();
      this._updateBackground();
    }
  }

  private _setStatus(status: SubmissionStatus, errorMsg: string | null = null) {
    this._status = status;
    this._errorMessage = errorMsg;
    this.dispatchEvent(
      new CustomEvent('signal:state-change', {
        bubbles: true,
        composed: true,
        detail: { state: status, error: errorMsg ?? undefined },
      })
    );
  }

  private _escape(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Register the custom element if not already registered
if (typeof customElements !== 'undefined' && !customElements.get('signal-feedback')) {
  customElements.define('signal-feedback', SignalFeedback);
}
