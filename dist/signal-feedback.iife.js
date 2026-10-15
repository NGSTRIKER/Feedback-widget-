(function(e){Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:`Module`}});var t=[{id:`lavender-clouds`,name:`Dreamy Blue & Lavender Clouds`,category:`Sky & Atmosphere`,description:`Soft ethereal pastel evening clouds with subtle lavender and violet tones.`,url:`https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900&q=80`,photographer:`Billy Huynh`,photographerUrl:`https://unsplash.com/@billy_huy`,sourceUrl:`https://unsplash.com/photos/a066f410bcda`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.65,fallbackGradient:`linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #581c87 100%)`},{id:`cinematic-ocean`,name:`Dark Cinematic Ocean`,category:`Nature & Water`,description:`Deep moody ocean waves with high-contrast crests and rich sapphire depths.`,url:`https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80`,photographer:`Matt Hardy`,photographerUrl:`https://unsplash.com/@matthardy`,sourceUrl:`https://unsplash.com/photos/2083093ee35b`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.68,fallbackGradient:`linear-gradient(180deg, #091e3a 0%, #173860 50%, #030b15 100%)`},{id:`desert-dunes`,name:`Warm Desert Dunes`,category:`Landscape`,description:`Warm sculpted sand dunes with undulating ridgelines and golden hour illumination.`,url:`https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80`,photographer:`Jeremy Bishop`,photographerUrl:`https://unsplash.com/@jeremybishop`,sourceUrl:`https://unsplash.com/photos/ff9c5deb0cd9`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.7,fallbackGradient:`linear-gradient(135deg, #78350f 0%, #92400e 45%, #b45309 100%)`},{id:`emerald-forest`,name:`Misty Emerald Forest`,category:`Nature & Fog`,description:`Dense pine canopy shrouded in rolling mountain morning mist.`,url:`https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80`,photographer:`Sebastian Unrau`,photographerUrl:`https://unsplash.com/@sebastian_unrau`,sourceUrl:`https://unsplash.com/photos/882707db888b`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.7,fallbackGradient:`linear-gradient(135deg, #064e3b 0%, #065f46 50%, #022c22 100%)`},{id:`mountain-landscape`,name:`Cinematic Mountain Landscape`,category:`Landscape`,description:`Dramatic alpine jagged peaks rising above low-lying clouds and glacial valleys.`,url:`https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80`,photographer:`Kalen Emsley`,photographerUrl:`https://unsplash.com/@kalenemsley`,sourceUrl:`https://unsplash.com/photos/fed622ff2c3b`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.68,fallbackGradient:`linear-gradient(180deg, #1e293b 0%, #334155 50%, #0f172a 100%)`},{id:`sunset-sky`,name:`Soft Sunset Sky`,category:`Sky & Atmosphere`,description:`Vibrant and warm twilight horizon painted in amber, coral, and violet gradients.`,url:`https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=900&q=80`,photographer:`Kimberly Vardeman`,photographerUrl:`https://unsplash.com/@kimberlyvardeman`,sourceUrl:`https://unsplash.com/photos/4d98c6e9c869`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.68,fallbackGradient:`linear-gradient(135deg, #701a75 0%, #9d174d 40%, #b45309 100%)`},{id:`architectural-shadows`,name:`Minimal Architectural Shadows`,category:`Architecture`,description:`Clean brutalist geometry with sharp architectural sunlight and cast shadow angles.`,url:`https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80`,photographer:`Scott Webb`,photographerUrl:`https://unsplash.com/@scottwebb`,sourceUrl:`https://unsplash.com/photos/719a280e022f`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.72,fallbackGradient:`linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)`},{id:`natural-texture`,name:`Subtle Abstract Mineral Texture`,category:`Texture`,description:`High-detail fluid mineral and slate geological grain with organic marbling.`,url:`https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80`,photographer:`Pawel Czerwinski`,photographerUrl:`https://unsplash.com/@pawel_czerwinski`,sourceUrl:`https://unsplash.com/photos/fac1c5b4e853`,license:`Unsplash License`,recommendedTheme:`dark`,defaultOverlayOpacity:.72,fallbackGradient:`linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)`}],n=new Map(t.map(e=>[e.id.toLowerCase(),e]));function r(e){return e?n.get(e.toLowerCase().trim())??null:null}function i(e){if(!e||typeof e!=`string`)return null;let t=e.trim(),n=t.toLowerCase();return n.startsWith(`javascript:`)||n.startsWith(`data:text`)||n.startsWith(`data:application`)||n.startsWith(`vbscript:`)||n.startsWith(`file:`)?null:n.startsWith(`https://`)||n.startsWith(`http://`)||n.startsWith(`/`)||n.startsWith(`./`)||n.startsWith(`../`)||n.startsWith(`data:image/`)?t:null}var a=new Map;function o(e,t=8e3){let n=a.get(e);return n===`loaded`?Promise.resolve(!0):n===`failed`?Promise.resolve(!1):new Promise(n=>{if(typeof window>`u`||typeof Image>`u`){n(!0);return}let r=new Image,i=!1,o=setTimeout(()=>{i||(i=!0,a.set(e,`failed`),n(!1))},t);r.onload=()=>{i||(i=!0,clearTimeout(o),a.set(e,`loaded`),n(!0))},r.onerror=()=>{i||(i=!0,clearTimeout(o),a.set(e,`failed`),n(!1))},r.src=e})}var s=`
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
`,c=class extends Error{code;statusCode;retryAfter;details;constructor(e,t){super(e),this.name=`FeedbackApiError`,this.code=t.code,this.statusCode=t.statusCode,this.retryAfter=t.retryAfter,this.details=t.details}};function l(){return typeof crypto<`u`&&crypto.randomUUID?crypto.randomUUID():`idemp_`+Date.now().toString(36)+`_`+Math.random().toString(36).substring(2,9)}function u(){return typeof window>`u`?{}:{url:window.location.href,referrer:document.referrer||void 0,userAgent:navigator.userAgent,viewport:{width:window.innerWidth,height:window.innerHeight},locale:navigator.language,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone}}async function d(e){let{baseUrl:t,payload:n,idempotencyKey:r=l(),timeoutMs:i=1e4}=e,a=`${t.replace(/\/+$/,``)}/v1/feedback`,o=new AbortController,s=setTimeout(()=>{o.abort()},i),u;try{u=await fetch(a,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`,"X-Project-Key":n.project_key,"X-Idempotency-Key":r},body:JSON.stringify(n),signal:o.signal})}catch(e){throw clearTimeout(s),e instanceof Error?e.name===`AbortError`?new c(`Request timed out. Please try again.`,{code:`REQUEST_TIMEOUT`}):new c(e.message||`Network error occurred.`,{code:`NETWORK_ERROR`}):new c(`Failed to communicate with feedback service.`,{code:`NETWORK_ERROR`})}finally{clearTimeout(s)}let d;try{d=await u.json()}catch{throw new c(`Received invalid response from server (Status ${u.status}).`,{code:`INVALID_SERVER_RESPONSE`,statusCode:u.status})}if(!u.ok||!d.success){let e=d.success?void 0:d.error,t=e?.code||`HTTP_${u.status}`,n=e?.message||`Feedback submission failed (${u.status})`,r=e?.retryAfter||(u.headers.get(`Retry-After`)?parseInt(u.headers.get(`Retry-After`),10):void 0);throw new c(n,{code:t,statusCode:u.status,retryAfter:r,details:e?.details})}return d}var f=class extends HTMLElement{static observedAttributes=[`api-base-url`,`project-key`,`theme`,`background`,`background-position`,`overlay-intensity`,`contrast-mode`,`accent-color`,`position`,`mode`,`launcher-label`,`panel-title`,`panel-description`,`enable-rating`,`enable-email`,`enable-context`,`max-length`,`open`];_status=`idle`;_errorMessage=null;_selectedCategory=`general`;_rating=0;_message=``;_email=``;_activeBackgroundUrl=null;_activeFallbackGradient=``;_photographerName=null;_photographerUrl=null;_lastFocusedElement=null;_shadowRoot;_panelContainer=null;_launcherBtn=null;_bgLayer=null;_overlayLayer=null;_contentLayer=null;_messageTextarea=null;_charCounter=null;_errorContainer=null;_liveRegion=null;_handleKeyDownBound=this._handleKeyDown.bind(this);_handleDocumentClickBound=this._handleDocumentClick.bind(this);constructor(){super(),this._shadowRoot=this.attachShadow({mode:`open`})}connectedCallback(){this._render(),this._applyCustomProperties(),this._updateBackground(),document.addEventListener(`keydown`,this._handleKeyDownBound),document.addEventListener(`click`,this._handleDocumentClickBound),(this.hasAttribute(`open`)||this.getAttribute(`mode`)===`embedded`)&&this._openPanelUI(!1)}disconnectedCallback(){document.removeEventListener(`keydown`,this._handleKeyDownBound),document.removeEventListener(`click`,this._handleDocumentClickBound)}attributeChangedCallback(e,t,n){t!==n&&(e===`open`?this.hasAttribute(`open`)?this._openPanelUI(!0):this._closePanelUI(!0):e===`overlay-intensity`||e===`accent-color`||e===`theme`||e===`contrast-mode`?this._applyCustomProperties():e===`background`||e===`background-position`?this._updateBackground():this._panelContainer&&(this._render(),this._applyCustomProperties(),this._updateBackground()))}get open(){return this.hasAttribute(`open`)}set open(e){e?this.setAttribute(`open`,``):this.removeAttribute(`open`)}get apiBaseUrl(){return this.getAttribute(`api-base-url`)||``}set apiBaseUrl(e){this.setAttribute(`api-base-url`,e)}get projectKey(){return this.getAttribute(`project-key`)||``}set projectKey(e){this.setAttribute(`project-key`,e)}get theme(){return this.getAttribute(`theme`)||`auto`}set theme(e){this.setAttribute(`theme`,e)}get background(){return this.getAttribute(`background`)||`lavender-clouds`}set background(e){this.setAttribute(`background`,e)}get maxLength(){let e=parseInt(this.getAttribute(`max-length`)||`2000`,10);return isNaN(e)||e<=0?2e3:e}set maxLength(e){this.setAttribute(`max-length`,e.toString())}get overlayIntensity(){let e=parseFloat(this.getAttribute(`overlay-intensity`)||`45`);return isNaN(e)?45:e}set overlayIntensity(e){this.setAttribute(`overlay-intensity`,e.toString())}get contrastMode(){return this.getAttribute(`contrast-mode`)||`normal`}set contrastMode(e){this.setAttribute(`contrast-mode`,e)}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}reset(){this._status=`idle`,this._errorMessage=null,this._message=``,this._rating=0,this._email=``,this._selectedCategory=`general`,this._render(),this._updateBackground()}_openPanelUI(e=!0){this._panelContainer&&(this._panelContainer.style.display=`flex`,this._panelContainer.offsetWidth,this._panelContainer.style.opacity=`1`,this._panelContainer.style.transform=`scale(1) translateY(0)`),this._launcherBtn&&this._launcherBtn.setAttribute(`aria-expanded`,`true`),this._lastFocusedElement=document.activeElement,setTimeout(()=>{this._shadowRoot.querySelector(`.signal-cat-option, .signal-textarea, button`)?.focus()},50),this._announce(`Feedback dialog opened.`),e&&this.dispatchEvent(new CustomEvent(`signal:open`,{bubbles:!0,composed:!0}))}_closePanelUI(e=!0){this.getAttribute(`mode`)!==`embedded`&&(this._panelContainer&&(this._panelContainer.style.opacity=`0`,this._panelContainer.style.transform=`scale(0.96) translateY(8px)`,setTimeout(()=>{!this.hasAttribute(`open`)&&this._panelContainer&&(this._panelContainer.style.display=`none`)},200)),this._launcherBtn&&(this._launcherBtn.setAttribute(`aria-expanded`,`false`),this._lastFocusedElement&&document.contains(this._lastFocusedElement)?this._lastFocusedElement.focus():this._launcherBtn.focus()),this._announce(`Feedback dialog closed.`),e&&this.dispatchEvent(new CustomEvent(`signal:close`,{bubbles:!0,composed:!0})))}_handleKeyDown(e){e.key===`Escape`&&this.open&&this.getAttribute(`mode`)!==`embedded`&&(e.preventDefault(),this.open=!1)}_handleDocumentClick(e){this.open&&this.getAttribute(`mode`)!==`embedded`&&(e.composedPath().includes(this)||(this.open=!1))}_applyCustomProperties(){let e=this.getAttribute(`accent-color`);e&&(this.style.setProperty(`--signal-accent`,e),this.style.setProperty(`--signal-input-border-focus`,e));let t=this.getAttribute(`overlay-intensity`),n=t===null?45:parseFloat(t),r=isNaN(n)?.45:n>1?n/100:n,i=this.getAttribute(`theme`)===`light`;this.style.setProperty(`--signal-overlay-opacity`,r.toString()),this._overlayLayer&&(this._overlayLayer.style.opacity=r.toString(),this._overlayLayer.style.background=i?`linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.70) 50%, rgba(255, 255, 255, 0.95) 100%)`:`linear-gradient(180deg, rgba(10, 15, 26, 0.35) 0%, rgba(10, 15, 26, 0.70) 50%, rgba(10, 15, 26, 0.95) 100%)`)}async _updateBackground(){let e=this.getAttribute(`background`)||`lavender-clouds`,t=this.getAttribute(`background-position`)||`center center`,n=null,a=`linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`,s=null,c=null,l=r(e);if(l)n=l.url,a=l.fallbackGradient,s=l.photographer,c=l.photographerUrl;else{let t=i(e);t&&(n=t)}this._activeFallbackGradient=a,this._photographerName=s,this._photographerUrl=c,this._bgLayer&&(this._bgLayer.style.backgroundPosition=t,this._bgLayer.style.backgroundSize=`cover`,this._bgLayer.style.backgroundRepeat=`no-repeat`,n?(this._activeBackgroundUrl=n,this._bgLayer.style.backgroundImage=`url("${n}"), ${a}`,o(n).then(e=>{!e&&this._bgLayer&&(this._bgLayer.style.backgroundImage=a,this._activeBackgroundUrl=null)})):(this._activeBackgroundUrl=null,this._bgLayer.style.backgroundImage=a)),this._updateAttributionUI()}_updateAttributionUI(){let e=this._shadowRoot.querySelector(`.signal-photo-credit`);e&&(this._photographerName&&this._photographerUrl?(e.style.display=`flex`,e.innerHTML=`
          <span>Background photo</span>
          <span>By <a href="${this._photographerUrl}" target="_blank" rel="noopener noreferrer">${this._escape(this._photographerName)}</a> on Unsplash</span>
        `):e.style.display=`none`)}_announce(e){this._liveRegion&&(this._liveRegion.textContent=e)}_render(){let e=this.getAttribute(`launcher-label`)??`Feedback`,t=this.getAttribute(`panel-title`)??`Send Feedback`,n=this.getAttribute(`panel-description`)??`We value your thoughts. Let us know how we can improve.`,r=this.getAttribute(`enable-rating`)!==`false`,i=this.getAttribute(`enable-email`)!==`false`,a=this.getAttribute(`enable-context`)!==`false`,o=this.getAttribute(`mode`)||`floating`;this._shadowRoot.innerHTML=`
      <style>${s}</style>
      
      <!-- Screen Reader Announcement Live Region -->
      <div class="signal-sr-only" aria-live="polite" aria-atomic="true"></div>

      <!-- Trigger Launcher (Floating Mode) -->
      ${o===`embedded`?``:`
        <button
          type="button"
          class="signal-launcher"
          aria-haspopup="dialog"
          aria-expanded="${this.open?`true`:`false`}"
          aria-controls="signal-panel"
        >
          <svg class="signal-launcher-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>${this._escape(e)}</span>
        </button>
      `}

      <!-- Panel Container with Layered Architecture -->
      <div
        id="signal-panel"
        class="signal-panel-container"
        role="dialog"
        aria-modal="${o===`embedded`?`false`:`true`}"
        aria-labelledby="signal-title"
        aria-describedby="signal-desc"
      >
        <!-- Layer 1: Background Photograph inside Widget -->
        <div class="signal-panel-bg-layer" aria-hidden="true"></div>

        <!-- Layer 2: Adaptive Overlay Scrim -->
        <div class="signal-panel-overlay-layer" aria-hidden="true"></div>

        <!-- Layer 3: High-contrast Content Surface -->
        <div class="signal-panel-content">
          ${this._renderPanelBody({panelTitle:t,panelDesc:n,enableRating:r,enableEmail:i,enableContext:a,mode:o})}
        </div>
      </div>
    `,this._launcherBtn=this._shadowRoot.querySelector(`.signal-launcher`),this._panelContainer=this._shadowRoot.querySelector(`.signal-panel-container`),this._bgLayer=this._shadowRoot.querySelector(`.signal-panel-bg-layer`),this._overlayLayer=this._shadowRoot.querySelector(`.signal-panel-overlay-layer`),this._contentLayer=this._shadowRoot.querySelector(`.signal-panel-content`),this._messageTextarea=this._shadowRoot.querySelector(`.signal-textarea`),this._charCounter=this._shadowRoot.querySelector(`.signal-char-counter`),this._errorContainer=this._shadowRoot.querySelector(`.signal-error-alert`),this._liveRegion=this._shadowRoot.querySelector(`.signal-sr-only`),this._bindEvents()}_renderPanelBody(e){if(this._status===`success`)return`
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
      `;let t=[{id:`bug`,label:`Bug report`,icon:`<path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M18 13h4M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>`},{id:`feature`,label:`Feature request`,icon:`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`},{id:`general`,label:`General feedback`,icon:`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>`},{id:`other`,label:`Other`,icon:`<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"></path>`}],n=this._status===`submitting`,r=this.maxLength-this._message.length;return`
      <!-- Header -->
      <div class="signal-header">
        <div class="signal-title-area">
          <h2 id="signal-title" class="signal-title">${this._escape(e.panelTitle)}</h2>
          <p id="signal-desc" class="signal-desc">${this._escape(e.panelDesc)}</p>
        </div>
        ${e.mode===`embedded`?``:`
          <button type="button" class="signal-close-btn" aria-label="Close feedback panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        `}
      </div>

      <!-- Error banner if any -->
      ${this._errorMessage?`
        <div class="signal-error-alert" role="alert">
          <svg class="signal-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>${this._escape(this._errorMessage)}</div>
        </div>
      `:``}

      <form class="signal-form" novalidate>
        <!-- Category Selector -->
        <span class="signal-category-label" id="signal-cat-label">Select category</span>
        <div class="signal-category-grid" role="radiogroup" aria-labelledby="signal-cat-label">
          ${t.map(e=>`
            <button
              type="button"
              role="radio"
              class="signal-cat-option"
              data-category="${e.id}"
              aria-checked="${this._selectedCategory===e.id?`true`:`false`}"
              ${n?`disabled`:``}
            >
              <svg class="signal-cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${e.icon}
              </svg>
              <span>${e.label}</span>
            </button>
          `).join(``)}
        </div>

        <!-- Optional Satisfaction Rating -->
        ${e.enableRating?`
          <div class="signal-rating-group">
            <div class="signal-rating-header">
              <span class="signal-field-label">Satisfaction rating (optional)</span>
              <span class="signal-rating-value">${this._rating>0?`${this._rating} of 5`:``}</span>
            </div>
            <div class="signal-stars" role="radiogroup" aria-label="Satisfaction rating from 1 to 5">
              ${[1,2,3,4,5].map(e=>`
                <button
                  type="button"
                  role="radio"
                  class="signal-star-btn ${this._rating>=e?`active`:``}"
                  data-rating="${e}"
                  aria-checked="${this._rating===e?`true`:`false`}"
                  aria-label="${e} star${e>1?`s`:``}"
                  ${n?`disabled`:``}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="${this._rating>=e?`currentColor`:`none`}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              `).join(``)}
            </div>
          </div>
        `:``}

        <!-- Message Field -->
        <div class="signal-form-group">
          <div class="signal-field-label">
            <label for="signal-msg-input">Message</label>
            <span class="signal-char-counter ${r<0?`error`:r<100?`warning`:``}">${this._message.length} / ${this.maxLength}</span>
          </div>
          <textarea
            id="signal-msg-input"
            class="signal-textarea"
            placeholder="Tell us what's on your mind..."
            maxlength="${this.maxLength+200}"
            rows="3"
            aria-required="true"
            ${n?`disabled`:``}
          >${this._escape(this._message)}</textarea>
        </div>

        <!-- Optional Email Input -->
        ${e.enableEmail?`
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
              ${n?`disabled`:``}
            />
          </div>
        `:``}

        <!-- Metadata Disclosure Notice -->
        ${e.enableContext?`
          <div class="signal-disclosure">
            <svg class="signal-disclosure-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Submits page URL and browser diagnostics to resolve issues. No passwords or sensitive data collected.</span>
          </div>
        `:``}

        <!-- Footer / Action Buttons -->
        <div class="signal-footer">
          ${e.mode===`embedded`?``:`
            <button type="button" class="signal-btn signal-btn-cancel" ${n?`disabled`:``}>Cancel</button>
          `}
          <button type="submit" class="signal-btn signal-btn-primary" ${n?`disabled`:``}>
            ${n?`<span class="signal-spinner" aria-hidden="true"></span><span>Sending...</span>`:`<span>Submit feedback</span>`}
          </button>
        </div>
      </form>

      <!-- Background Attribution Notice inside widget -->
      <div class="signal-photo-credit" aria-hidden="true"></div>
    `}_bindEvents(){this._launcherBtn&&this._launcherBtn.addEventListener(`click`,()=>{this.open=!this.open});let e=this._shadowRoot.querySelector(`.signal-close-btn`);e&&e.addEventListener(`click`,()=>{this.open=!1});let t=this._shadowRoot.querySelector(`.signal-btn-cancel`);t&&t.addEventListener(`click`,()=>{this.open=!1});let n=this._shadowRoot.querySelector(`.signal-btn-reset`);n&&n.addEventListener(`click`,()=>{this.reset()});let r=this._shadowRoot.querySelectorAll(`.signal-cat-option`);r.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-category`);t&&(this._selectedCategory=t,r.forEach(t=>t.setAttribute(`aria-checked`,t===e?`true`:`false`)))})});let i=this._shadowRoot.querySelectorAll(`.signal-star-btn`);i.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-rating`)||`0`,10);this._rating=this._rating===t?0:t,i.forEach(e=>{let t=parseInt(e.getAttribute(`data-rating`)||`0`,10);e.classList.toggle(`active`,this._rating>=t),e.setAttribute(`aria-checked`,this._rating===t?`true`:`false`);let n=e.querySelector(`svg`);n&&n.setAttribute(`fill`,this._rating>=t?`currentColor`:`none`)});let n=this._shadowRoot.querySelector(`.signal-rating-value`);n&&(n.textContent=this._rating>0?`${this._rating} of 5`:``)})}),this._messageTextarea&&this._messageTextarea.addEventListener(`input`,()=>{this._message=this._messageTextarea.value;let e=this.maxLength-this._message.length;this._charCounter&&(this._charCounter.textContent=`${this._message.length} / ${this.maxLength}`,this._charCounter.className=`signal-char-counter ${e<0?`error`:e<100?`warning`:``}`)});let a=this._shadowRoot.querySelector(`#signal-email-input`);a&&a.addEventListener(`input`,()=>{this._email=a.value});let o=this._shadowRoot.querySelector(`form`);o&&o.addEventListener(`submit`,e=>{e.preventDefault(),this._handleSubmit()})}async _handleSubmit(){if(this._status===`submitting`)return;this._errorMessage=null;let e=this._message.trim();if(!e){this._setStatus(`validation-error`,`Please enter a feedback message.`),this._render(),this._updateBackground(),this._messageTextarea?.focus();return}if(this._message.length>this.maxLength){this._setStatus(`validation-error`,`Message exceeds maximum allowed length of ${this.maxLength} characters.`),this._render(),this._updateBackground(),this._messageTextarea?.focus();return}let t=this._email.trim();if(t&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){this._setStatus(`validation-error`,`Please enter a valid email address.`),this._render(),this._updateBackground(),this._shadowRoot.querySelector(`#signal-email-input`)?.focus();return}let n=this.getAttribute(`project-key`);if(!n){this._setStatus(`disabled`,`Configuration error: project-key attribute is required.`),this._render(),this._updateBackground();return}let r=this.getAttribute(`api-base-url`)||``;if(!r){this._setStatus(`disabled`,`Configuration error: api-base-url attribute is required.`),this._render(),this._updateBackground();return}this._setStatus(`submitting`),this._render(),this._updateBackground(),this._announce(`Submitting feedback...`);let i=this.getAttribute(`enable-context`)===`false`?void 0:u();try{let a=await d({baseUrl:r,payload:{project_key:n,category:this._selectedCategory,message:e,rating:this._rating>0?this._rating:void 0,email:t||void 0,context:i}});this._setStatus(`success`),this._render(),this._updateBackground(),this._announce(`Feedback submitted successfully. Thank you!`),this.dispatchEvent(new CustomEvent(`signal:submit-success`,{bubbles:!0,composed:!0,detail:{id:a.data.id,category:this._selectedCategory,rating:this._rating>0?this._rating:void 0}}))}catch(e){if(e instanceof c){let t=e.message;e.code===`RATE_LIMIT_EXCEEDED`?(t=`You are submitting feedback too quickly. Please wait a few moments before trying again.`,this._setStatus(`rate-limited`,t)):e.code===`REQUEST_TIMEOUT`?(t=`Request timed out. Please check your connection and retry.`,this._setStatus(`timeout`,t)):e.code===`NETWORK_ERROR`?(t=`Network unavailable. Unable to reach server.`,this._setStatus(`network-error`,t)):this._setStatus(`server-rejection`,t),this.dispatchEvent(new CustomEvent(`signal:submit-error`,{bubbles:!0,composed:!0,detail:{code:e.code,message:e.message,details:e.details}}))}else{let t=e instanceof Error?e.message:`An unexpected error occurred.`;this._setStatus(`server-rejection`,t)}this._render(),this._updateBackground()}}_setStatus(e,t=null){this._status=e,this._errorMessage=t,this.dispatchEvent(new CustomEvent(`signal:state-change`,{bubbles:!0,composed:!0,detail:{state:e,error:t??void 0}}))}_escape(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}};typeof customElements<`u`&&!customElements.get(`signal-feedback`)&&customElements.define(`signal-feedback`,f);var p=f;e.BACKGROUND_PRESETS=t,e.FeedbackApiError=c,e.SignalFeedback=f,e.collectClientContext=u,e.default=p,e.generateIdempotencyKey=l,e.getBackgroundPreset=r,e.preloadImage=o,e.sanitizeImageUrl=i,e.submitFeedback=d})(this.SignalFeedback=this.SignalFeedback||{});
//# sourceMappingURL=signal-feedback.iife.js.map