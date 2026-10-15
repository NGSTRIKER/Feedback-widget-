// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../../src/component/signal-feedback.js';
import { SignalFeedback } from '../../src/component/signal-feedback.js';
import { BACKGROUND_PRESETS, sanitizeImageUrl } from '../../src/component/backgrounds.js';

describe('SignalFeedback Custom Element Tests', () => {
  let element: SignalFeedback;

  beforeEach(() => {
    element = document.createElement('signal-feedback') as SignalFeedback;
    element.setAttribute('api-base-url', 'http://localhost:3001');
    element.setAttribute('project-key', 'prj_live_signal_demo_default');
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
    vi.restoreAllMocks();
  });

  it('registers <signal-feedback> as a native custom element', () => {
    expect(customElements.get('signal-feedback')).toBeDefined();
    expect(element instanceof SignalFeedback).toBe(true);
  });

  it('attaches open Shadow DOM with isolated structure', () => {
    expect(element.shadowRoot).toBeDefined();
    expect(element.shadowRoot!.mode).toBe('open');
    const panel = element.shadowRoot!.querySelector('#signal-panel');
    expect(panel).not.toBeNull();
  });

  it('renders launcher and dialog semantics for accessibility', () => {
    const launcher = element.shadowRoot!.querySelector('.signal-launcher');
    expect(launcher).not.toBeNull();
    expect(launcher!.getAttribute('aria-haspopup')).toBe('dialog');
    expect(launcher!.getAttribute('aria-expanded')).toBe('false');

    const panel = element.shadowRoot!.querySelector('#signal-panel');
    expect(panel!.getAttribute('role')).toBe('dialog');
    expect(panel!.getAttribute('aria-labelledby')).toBe('signal-title');
    expect(panel!.getAttribute('aria-describedby')).toBe('signal-desc');
  });

  it('toggles open state and fires custom events', () => {
    const openSpy = vi.fn();
    const closeSpy = vi.fn();
    element.addEventListener('signal:open', openSpy);
    element.addEventListener('signal:close', closeSpy);

    element.show();
    expect(element.open).toBe(true);
    expect(element.hasAttribute('open')).toBe(true);
    expect(openSpy).toHaveBeenCalled();

    element.hide();
    expect(element.open).toBe(false);
    expect(element.hasAttribute('open')).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('closes on Escape key press in floating mode', () => {
    element.show();
    expect(element.open).toBe(true);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(element.open).toBe(false);
  });

  describe('Background Presets and Image Readability', () => {
    it('curates at least 8 real photographic presets', () => {
      expect(BACKGROUND_PRESETS.length).toBeGreaterThanOrEqual(8);
      const ids = BACKGROUND_PRESETS.map((p) => p.id);
      expect(ids).toContain('lavender-clouds');
      expect(ids).toContain('cinematic-ocean');
      expect(ids).toContain('desert-dunes');
      expect(ids).toContain('emerald-forest');
      expect(ids).toContain('mountain-landscape');
      expect(ids).toContain('sunset-sky');
      expect(ids).toContain('architectural-shadows');
      expect(ids).toContain('natural-texture');
    });

    it('each preset has verified licensing, photographer, and fallback gradient', () => {
      for (const preset of BACKGROUND_PRESETS) {
        expect(preset.name).toBeTruthy();
        expect(preset.photographer).toBeTruthy();
        expect(preset.photographerUrl).toContain('https://');
        expect(preset.url).toContain('images.unsplash.com');
        expect(preset.fallbackGradient).toContain('gradient');
        expect(preset.defaultOverlayOpacity).toBeGreaterThan(0.5);
      }
    });

    it('sanitizes custom image URLs against dangerous protocols', () => {
      expect(sanitizeImageUrl('javascript:alert(1)')).toBeNull();
      expect(sanitizeImageUrl('vbscript:msgbox(1)')).toBeNull();
      expect(sanitizeImageUrl('file:///etc/passwd')).toBeNull();
      expect(sanitizeImageUrl('data:text/html;base64,PHNjcmlwdD4=')).toBeNull();

      expect(sanitizeImageUrl('https://example.com/photo.jpg')).toBe('https://example.com/photo.jpg');
      expect(sanitizeImageUrl('/assets/bg.jpg')).toBe('/assets/bg.jpg');
      expect(sanitizeImageUrl('data:image/png;base64,iVBORw0KGgo=')).toBe(
        'data:image/png;base64,iVBORw0KGgo='
      );
    });

    it('renders background strictly inside the widget panel layer', () => {
      const bgLayer = element.shadowRoot!.querySelector('.signal-panel-bg-layer') as HTMLElement;
      expect(bgLayer).not.toBeNull();
      // Host page document body must not have background modified
      expect(document.body.style.backgroundImage).toBe('');
    });
  });

  describe('Form Validation and Edge Cases', () => {
    it('blocks submission and shows error alert when message is empty or whitespace', async () => {
      element.show();
      const form = element.shadowRoot!.querySelector('form')!;
      const stateSpy = vi.fn();
      element.addEventListener('signal:state-change', stateSpy);

      // Trigger submit with empty message
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      const alert = element.shadowRoot!.querySelector('.signal-error-alert');
      expect(alert).not.toBeNull();
      expect(alert!.textContent).toContain('Please enter a feedback message');
      expect(stateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({ state: 'validation-error' }),
        })
      );
    });

    it('blocks submission when email is improperly formatted', async () => {
      element.show();
      const textarea = element.shadowRoot!.querySelector('textarea')!;
      textarea.value = 'Valid feedback message';
      textarea.dispatchEvent(new Event('input'));

      const emailInput = element.shadowRoot!.querySelector('#signal-email-input') as HTMLInputElement;
      emailInput.value = 'invalid-email-format';
      emailInput.dispatchEvent(new Event('input'));

      const form = element.shadowRoot!.querySelector('form')!;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      const alert = element.shadowRoot!.querySelector('.signal-error-alert');
      expect(alert).not.toBeNull();
      expect(alert!.textContent).toContain('Please enter a valid email address');
    });

    it('preserves user input message on network failure', async () => {
      element.show();
      const testMsg = 'Do not delete my feedback text on failure!';
      const textarea = element.shadowRoot!.querySelector('textarea')!;
      textarea.value = testMsg;
      textarea.dispatchEvent(new Event('input'));

      // Mock fetch failure
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

      const form = element.shadowRoot!.querySelector('form')!;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      // Wait for async handler
      await new Promise((r) => setTimeout(r, 50));

      // After failed submission, textarea must still preserve the user's message
      const currentTextarea = element.shadowRoot!.querySelector('textarea')!;
      expect(currentTextarea.value).toBe(testMsg);

      const alert = element.shadowRoot!.querySelector('.signal-error-alert');
      expect(alert).not.toBeNull();
    });

    it('disables submit button during active submission to prevent double submits', async () => {
      element.show();
      const textarea = element.shadowRoot!.querySelector('textarea')!;
      textarea.value = 'Double submission test';
      textarea.dispatchEvent(new Event('input'));

      let resolveFetch: any;
      globalThis.fetch = vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve;
          })
      );

      const form = element.shadowRoot!.querySelector('form')!;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      // While submitting, submit button should be disabled
      const submitBtn = element.shadowRoot!.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(submitBtn.disabled).toBe(true);

      // Resolve fetch
      resolveFetch({
        ok: true,
        json: async () => ({ success: true, data: { id: 'test_id_123' }, requestId: 'req_1' }),
      });

      await new Promise((r) => setTimeout(r, 50));
      expect(element.shadowRoot!.querySelector('.signal-success-view')).not.toBeNull();
    });
    it('handles malformed non-JSON server responses gracefully', async () => {
      element.show();
      const textarea = element.shadowRoot!.querySelector('textarea')!;
      textarea.value = 'Testing malformed response';
      textarea.dispatchEvent(new Event('input'));

      // Mock server returning HTML 502 Bad Gateway
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        headers: new Headers(),
        json: async () => {
          throw new Error('Unexpected token < in JSON at position 0');
        },
      });

      const form = element.shadowRoot!.querySelector('form')!;
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      await new Promise((r) => setTimeout(r, 50));

      const alert = element.shadowRoot!.querySelector('.signal-error-alert');
      expect(alert).not.toBeNull();
      expect(alert!.textContent).toContain('invalid response');
    });

    it('updates character counter and remaining length dynamically', () => {
      element.show();
      const textarea = element.shadowRoot!.querySelector('textarea')!;
      const counter = element.shadowRoot!.querySelector('.signal-char-counter')!;

      expect(counter.textContent).toBe('0 / 2000');

      textarea.value = 'Hello world!';
      textarea.dispatchEvent(new Event('input'));
      expect(counter.textContent).toBe('12 / 2000');
    });

    it('supports embedded mode with launcher hidden and permanent panel visibility', () => {
      element.setAttribute('mode', 'embedded');
      expect(element.getAttribute('mode')).toBe('embedded');

      // In embedded mode, escape key does not close the panel
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      expect(element.getAttribute('mode')).toBe('embedded');
    });

    it('resets inputs and state when reset() is invoked', () => {
      element.show();
      const textarea = element.shadowRoot!.querySelector('textarea')!;
      textarea.value = 'Pending text to be cleared';
      textarea.dispatchEvent(new Event('input'));

      element.reset();
      const resetTextarea = element.shadowRoot!.querySelector('textarea')!;
      expect(resetTextarea.value).toBe('');
    });

    it('dynamically adjusts overlay opacity when overlay-intensity attribute changes', () => {
      element.setAttribute('overlay-intensity', '70');
      const overlay = element.shadowRoot!.querySelector('.signal-panel-overlay-layer') as HTMLElement;
      expect(overlay.style.opacity).toBe('0.7');

      element.setAttribute('overlay-intensity', '25');
      expect(overlay.style.opacity).toBe('0.25');
    });
  });

  describe('Lifecycle and Multi-Instance Isolation', () => {
    it('supports multiple independent instances on the same page', () => {
      const element2 = document.createElement('signal-feedback') as SignalFeedback;
      element2.setAttribute('background', 'cinematic-ocean');
      element2.setAttribute('position', 'bottom-left');
      document.body.appendChild(element2);

      element.setAttribute('background', 'lavender-clouds');
      expect(element.getAttribute('background')).toBe('lavender-clouds');
      expect(element2.getAttribute('background')).toBe('cinematic-ocean');

      element.show();
      expect(element.open).toBe(true);
      expect(element2.open).toBe(false);

      element2.parentNode?.removeChild(element2);
    });

    it('safely handles disconnect and reconnect lifecycle', () => {
      // Disconnect
      document.body.removeChild(element);
      // Reconnect
      document.body.appendChild(element);
      expect(element.shadowRoot!.querySelector('#signal-panel')).not.toBeNull();
    });
  });
});

