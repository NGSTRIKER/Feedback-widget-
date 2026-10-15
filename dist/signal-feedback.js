//#region src/component/backgrounds.ts
var e = [
	{
		id: "lavender-clouds",
		name: "Dreamy Blue & Lavender Clouds",
		category: "Sky & Atmosphere",
		description: "Soft ethereal pastel evening clouds with subtle lavender and violet tones.",
		url: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900&q=80",
		photographer: "Billy Huynh",
		photographerUrl: "https://unsplash.com/@billy_huy",
		sourceUrl: "https://unsplash.com/photos/a066f410bcda",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .65,
		fallbackGradient: "linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #581c87 100%)"
	},
	{
		id: "cinematic-ocean",
		name: "Dark Cinematic Ocean",
		category: "Nature & Water",
		description: "Deep moody ocean waves with high-contrast crests and rich sapphire depths.",
		url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
		photographer: "Matt Hardy",
		photographerUrl: "https://unsplash.com/@matthardy",
		sourceUrl: "https://unsplash.com/photos/2083093ee35b",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .68,
		fallbackGradient: "linear-gradient(180deg, #091e3a 0%, #173860 50%, #030b15 100%)"
	},
	{
		id: "desert-dunes",
		name: "Warm Desert Dunes",
		category: "Landscape",
		description: "Warm sculpted sand dunes with undulating ridgelines and golden hour illumination.",
		url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80",
		photographer: "Jeremy Bishop",
		photographerUrl: "https://unsplash.com/@jeremybishop",
		sourceUrl: "https://unsplash.com/photos/ff9c5deb0cd9",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .7,
		fallbackGradient: "linear-gradient(135deg, #78350f 0%, #92400e 45%, #b45309 100%)"
	},
	{
		id: "emerald-forest",
		name: "Misty Emerald Forest",
		category: "Nature & Fog",
		description: "Dense pine canopy shrouded in rolling mountain morning mist.",
		url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
		photographer: "Sebastian Unrau",
		photographerUrl: "https://unsplash.com/@sebastian_unrau",
		sourceUrl: "https://unsplash.com/photos/882707db888b",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .7,
		fallbackGradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #022c22 100%)"
	},
	{
		id: "mountain-landscape",
		name: "Cinematic Mountain Landscape",
		category: "Landscape",
		description: "Dramatic alpine jagged peaks rising above low-lying clouds and glacial valleys.",
		url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
		photographer: "Kalen Emsley",
		photographerUrl: "https://unsplash.com/@kalenemsley",
		sourceUrl: "https://unsplash.com/photos/fed622ff2c3b",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .68,
		fallbackGradient: "linear-gradient(180deg, #1e293b 0%, #334155 50%, #0f172a 100%)"
	},
	{
		id: "sunset-sky",
		name: "Soft Sunset Sky",
		category: "Sky & Atmosphere",
		description: "Vibrant and warm twilight horizon painted in amber, coral, and violet gradients.",
		url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=900&q=80",
		photographer: "Kimberly Vardeman",
		photographerUrl: "https://unsplash.com/@kimberlyvardeman",
		sourceUrl: "https://unsplash.com/photos/4d98c6e9c869",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .68,
		fallbackGradient: "linear-gradient(135deg, #701a75 0%, #9d174d 40%, #b45309 100%)"
	},
	{
		id: "architectural-shadows",
		name: "Minimal Architectural Shadows",
		category: "Architecture",
		description: "Clean brutalist geometry with sharp architectural sunlight and cast shadow angles.",
		url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
		photographer: "Scott Webb",
		photographerUrl: "https://unsplash.com/@scottwebb",
		sourceUrl: "https://unsplash.com/photos/719a280e022f",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .72,
		fallbackGradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)"
	},
	{
		id: "natural-texture",
		name: "Subtle Abstract Mineral Texture",
		category: "Texture",
		description: "High-detail fluid mineral and slate geological grain with organic marbling.",
		url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80",
		photographer: "Pawel Czerwinski",
		photographerUrl: "https://unsplash.com/@pawel_czerwinski",
		sourceUrl: "https://unsplash.com/photos/fac1c5b4e853",
		license: "Unsplash License",
		recommendedTheme: "dark",
		defaultOverlayOpacity: .72,
		fallbackGradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)"
	}
], t = new Map(e.map((e) => [e.id.toLowerCase(), e]));
function n(e) {
	return e ? t.get(e.toLowerCase().trim()) ?? null : null;
}
function r(e) {
	if (!e || typeof e != "string") return null;
	let t = e.trim(), n = t.toLowerCase();
	return n.startsWith("javascript:") || n.startsWith("data:text") || n.startsWith("data:application") || n.startsWith("vbscript:") || n.startsWith("file:") ? null : n.startsWith("https://") || n.startsWith("http://") || n.startsWith("/") || n.startsWith("./") || n.startsWith("../") || n.startsWith("data:image/") ? t : null;
}
var i = /* @__PURE__ */ new Map();
function a(e, t = 8e3) {
	let n = i.get(e);
	return n === "loaded" ? Promise.resolve(!0) : n === "failed" ? Promise.resolve(!1) : new Promise((n) => {
		if (typeof window > "u" || typeof Image > "u") {
			n(!0);
			return;
		}
		let r = new Image(), a = !1, o = setTimeout(() => {
			a || (a = !0, i.set(e, "failed"), n(!1));
		}, t);
		r.onload = () => {
			a || (a = !0, clearTimeout(o), i.set(e, "loaded"), n(!0));
		}, r.onerror = () => {
			a || (a = !0, clearTimeout(o), i.set(e, "failed"), n(!1));
		}, r.src = e;
	});
}
//#endregion
//#region src/component/styles.ts
var o = "\n:host {\n  --signal-font-sans: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  --signal-accent: #3b82f6;\n  --signal-accent-hover: #2563eb;\n  --signal-accent-text: #ffffff;\n  --signal-radius: 20px;\n  --signal-control-radius: 10px;\n  --signal-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12);\n  --signal-z-index: 99999;\n  \n  /* Vibrant readable dark theme variables */\n  --signal-text-primary: #ffffff;\n  --signal-text-secondary: rgba(255, 255, 255, 0.82);\n  --signal-text-muted: rgba(255, 255, 255, 0.60);\n  --signal-input-bg: rgba(15, 23, 42, 0.55);\n  --signal-input-border: rgba(255, 255, 255, 0.20);\n  --signal-input-border-focus: #60a5fa;\n  --signal-overlay-color: rgba(10, 15, 26, 0.45);\n  --signal-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);\n  \n  display: block;\n  font-family: var(--signal-font-sans);\n  color: var(--signal-text-primary);\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n:host([theme=\"light\"]) {\n  --signal-text-primary: #0f172a;\n  --signal-text-secondary: #334155;\n  --signal-text-muted: #64748b;\n  --signal-input-bg: rgba(255, 255, 255, 0.75);\n  --signal-input-border: rgba(0, 0, 0, 0.18);\n  --signal-overlay-color: rgba(255, 255, 255, 0.55);\n  --signal-text-shadow: none;\n}\n\n:host([contrast-mode=\"high\"]) {\n  --signal-input-bg: rgba(8, 12, 20, 0.88);\n  --signal-input-border: #ffffff;\n  --signal-text-primary: #ffffff;\n  --signal-text-secondary: #f8fafc;\n  --signal-text-muted: #e2e8f0;\n  --signal-overlay-color: rgba(5, 8, 15, 0.75);\n}\n\n:host([contrast-mode=\"high\"][theme=\"light\"]) {\n  --signal-input-bg: #ffffff;\n  --signal-input-border: #000000;\n  --signal-text-primary: #000000;\n  --signal-text-secondary: #0f172a;\n  --signal-text-muted: #1e293b;\n  --signal-overlay-color: rgba(255, 255, 255, 0.85);\n}\n\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* Floating Launcher Trigger */\n.signal-launcher {\n  position: fixed;\n  z-index: var(--signal-z-index);\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 13px 22px;\n  background: linear-gradient(135deg, var(--signal-accent) 0%, var(--signal-accent-hover) 100%);\n  color: var(--signal-accent-text);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 9999px;\n  box-shadow: 0 12px 24px -4px rgba(37, 99, 235, 0.4), 0 4px 8px -2px rgba(0, 0, 0, 0.25);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  line-height: 1;\n  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, filter 0.2s ease;\n  user-select: none;\n}\n\n.signal-launcher:hover {\n  transform: translateY(-2px) scale(1.02);\n  box-shadow: 0 16px 30px -4px rgba(37, 99, 235, 0.5), 0 6px 12px -2px rgba(0, 0, 0, 0.3);\n  filter: brightness(1.05);\n}\n\n.signal-launcher:active {\n  transform: translateY(0) scale(0.99);\n}\n\n.signal-launcher:focus-visible {\n  outline: 3px solid #60a5fa;\n  outline-offset: 3px;\n}\n\n/* Positions for launcher and floating panel */\n:host([position=\"bottom-right\"]) .signal-launcher,\n:host(:not([position])) .signal-launcher {\n  bottom: 24px;\n  right: 24px;\n}\n\n:host([position=\"bottom-left\"]) .signal-launcher {\n  bottom: 24px;\n  left: 24px;\n}\n\n:host([position=\"top-right\"]) .signal-launcher {\n  top: 24px;\n  right: 24px;\n}\n\n:host([position=\"top-left\"]) .signal-launcher {\n  top: 24px;\n  left: 24px;\n}\n\n.signal-launcher-icon {\n  width: 19px;\n  height: 19px;\n  display: inline-block;\n  flex-shrink: 0;\n}\n\n/* The Panel Container */\n.signal-panel-container {\n  display: none;\n  position: fixed;\n  z-index: calc(var(--signal-z-index) + 1);\n  width: 440px;\n  max-width: calc(100vw - 32px);\n  max-height: calc(100vh - 48px);\n  box-shadow: var(--signal-shadow);\n  border-radius: var(--signal-radius);\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  opacity: 0;\n  transform: scale(0.96) translateY(8px);\n  transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);\n  background-color: #0b0f19;\n}\n\n:host([position=\"bottom-right\"]) .signal-panel-container,\n:host(:not([position])) .signal-panel-container {\n  bottom: 84px;\n  right: 24px;\n}\n\n:host([position=\"bottom-left\"]) .signal-panel-container {\n  bottom: 84px;\n  left: 24px;\n}\n\n:host([position=\"top-right\"]) .signal-panel-container {\n  top: 84px;\n  right: 24px;\n}\n\n:host([position=\"top-left\"]) .signal-panel-container {\n  top: 84px;\n  left: 24px;\n}\n\n/* Embedded mode styling */\n:host([mode=\"embedded\"]) {\n  display: block;\n  width: 100%;\n  max-width: 460px;\n  margin: 0 auto;\n}\n\n:host([mode=\"embedded\"]) .signal-launcher {\n  display: none !important;\n}\n\n:host([mode=\"embedded\"]) .signal-panel-container {\n  position: relative !important;\n  top: auto !important;\n  left: auto !important;\n  right: auto !important;\n  bottom: auto !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  max-height: none !important;\n  display: flex !important;\n  opacity: 1 !important;\n  transform: none !important;\n}\n\n:host([open]) .signal-panel-container {\n  display: flex;\n  flex-direction: column;\n  opacity: 1;\n  transform: scale(1) translateY(0);\n}\n\n/* CRITICAL: Background photograph inside the widget panel */\n.signal-panel-bg-layer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1;\n  background-size: cover !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  transition: background-image 0.4s ease, opacity 0.3s ease;\n  overflow: hidden;\n}\n\n/* Layer 2: Adaptive Scrim Overlay - opacity driven by slider */\n.signal-panel-overlay-layer {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 2;\n  background: linear-gradient(\n    180deg,\n    rgba(10, 15, 26, 0.35) 0%,\n    rgba(10, 15, 26, 0.70) 50%,\n    rgba(10, 15, 26, 0.95) 100%\n  );\n  opacity: var(--signal-overlay-opacity, 0.45);\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n  pointer-events: none;\n  transition: opacity 0.1s ease;\n}\n\n:host([theme=\"light\"]) .signal-panel-overlay-layer {\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.35) 0%,\n    rgba(255, 255, 255, 0.70) 50%,\n    rgba(255, 255, 255, 0.95) 100%\n  );\n}\n\n/* Layer 3: Content Surface - TRANSPARENT to let the photograph shine through */\n.signal-panel-content {\n  position: relative;\n  z-index: 3;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  overflow-y: auto;\n  max-height: calc(100vh - 90px);\n  padding: 24px;\n  color: var(--signal-text-primary);\n  background: transparent !important;\n}\n\n/* Header */\n.signal-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 18px;\n  gap: 12px;\n}\n\n.signal-title-area {\n  flex: 1;\n}\n\n.signal-title {\n  margin: 0;\n  font-size: 19px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--signal-text-primary);\n  text-shadow: var(--signal-text-shadow);\n  line-height: 1.25;\n}\n\n.signal-desc {\n  margin: 5px 0 0 0;\n  font-size: 13px;\n  color: var(--signal-text-secondary);\n  text-shadow: var(--signal-text-shadow);\n  line-height: 1.45;\n}\n\n.signal-close-btn {\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  color: var(--signal-text-primary);\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  padding: 0;\n  transition: all 0.18s ease;\n  flex-shrink: 0;\n}\n\n.signal-close-btn:hover {\n  background: rgba(255, 255, 255, 0.25);\n  transform: rotate(90deg) scale(1.08);\n}\n\n.signal-close-btn:focus-visible {\n  outline: 2px solid var(--signal-accent);\n  outline-offset: 2px;\n}\n\n/* Category Selection Grid */\n.signal-category-label {\n  display: block;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--signal-text-secondary);\n  text-shadow: var(--signal-text-shadow);\n  margin-bottom: 9px;\n}\n\n.signal-category-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 9px;\n  margin-bottom: 18px;\n}\n\n.signal-cat-option {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 11px 13px;\n  border: 1px solid var(--signal-input-border);\n  background: var(--signal-input-bg);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-radius: var(--signal-control-radius);\n  color: var(--signal-text-primary);\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);\n  text-align: left;\n}\n\n.signal-cat-option:hover {\n  background: rgba(255, 255, 255, 0.18);\n  border-color: rgba(255, 255, 255, 0.4);\n  transform: translateY(-1px);\n}\n\n.signal-cat-option[aria-checked=\"true\"] {\n  border-color: #60a5fa;\n  background: rgba(59, 130, 246, 0.28);\n  color: #ffffff;\n  box-shadow: 0 0 16px rgba(59, 130, 246, 0.4), inset 0 0 0 1px #60a5fa;\n}\n\n.signal-cat-option:focus-visible {\n  outline: 2px solid var(--signal-accent);\n  outline-offset: 2px;\n}\n\n.signal-cat-icon {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n  opacity: 0.9;\n}\n\n/* Satisfaction Rating Stars */\n.signal-rating-group {\n  margin-bottom: 18px;\n}\n\n.signal-rating-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.signal-rating-value {\n  font-size: 12px;\n  font-weight: 600;\n  color: #fde047;\n  text-shadow: var(--signal-text-shadow);\n}\n\n.signal-stars {\n  display: flex;\n  gap: 8px;\n}\n\n.signal-star-btn {\n  background: var(--signal-input-bg);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid var(--signal-input-border);\n  border-radius: var(--signal-control-radius);\n  width: 42px;\n  height: 42px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--signal-text-muted);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);\n  padding: 0;\n}\n\n.signal-star-btn:hover,\n.signal-star-btn[aria-checked=\"true\"],\n.signal-star-btn.active {\n  color: #facc15;\n  border-color: #facc15;\n  background: rgba(250, 204, 21, 0.22);\n  box-shadow: 0 0 14px rgba(250, 204, 21, 0.35);\n  transform: scale(1.06);\n}\n\n.signal-star-btn:focus-visible {\n  outline: 2px solid var(--signal-accent);\n  outline-offset: 2px;\n}\n\n/* Form inputs with frosted glass */\n.signal-form-group {\n  margin-bottom: 16px;\n}\n\n.signal-field-label {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--signal-text-secondary);\n  text-shadow: var(--signal-text-shadow);\n  margin-bottom: 7px;\n}\n\n.signal-char-counter {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--signal-text-muted);\n  text-transform: none;\n}\n\n.signal-char-counter.warning {\n  color: #fbbf24;\n}\n\n.signal-char-counter.error {\n  color: #f87171;\n}\n\n.signal-textarea {\n  width: 100%;\n  min-height: 100px;\n  padding: 12px 14px;\n  background: var(--signal-input-bg);\n  backdrop-filter: blur(14px);\n  -webkit-backdrop-filter: blur(14px);\n  border: 1px solid var(--signal-input-border);\n  border-radius: var(--signal-control-radius);\n  color: var(--signal-text-primary);\n  font-family: inherit;\n  font-size: 14px;\n  line-height: 1.5;\n  resize: vertical;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n\n.signal-textarea::placeholder {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n:host([theme=\"light\"]) .signal-textarea::placeholder {\n  color: rgba(0, 0, 0, 0.45);\n}\n\n.signal-textarea:focus {\n  outline: none;\n  border-color: var(--signal-input-border-focus);\n  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);\n}\n\n.signal-input {\n  width: 100%;\n  height: 42px;\n  padding: 8px 14px;\n  background: var(--signal-input-bg);\n  backdrop-filter: blur(14px);\n  -webkit-backdrop-filter: blur(14px);\n  border: 1px solid var(--signal-input-border);\n  border-radius: var(--signal-control-radius);\n  color: var(--signal-text-primary);\n  font-family: inherit;\n  font-size: 13px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  transition: border-color 0.18s ease, box-shadow 0.18s ease;\n}\n\n.signal-input::placeholder {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n:host([theme=\"light\"]) .signal-input::placeholder {\n  color: rgba(0, 0, 0, 0.45);\n}\n\n.signal-input:focus {\n  outline: none;\n  border-color: var(--signal-input-border-focus);\n  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);\n}\n\n/* Feedback & error messages */\n.signal-error-alert {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 11px 14px;\n  background: rgba(220, 38, 38, 0.3);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(239, 68, 68, 0.5);\n  border-radius: var(--signal-control-radius);\n  color: #fecaca;\n  font-size: 13px;\n  line-height: 1.4;\n  margin-bottom: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n}\n\n.signal-error-icon {\n  width: 17px;\n  height: 17px;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n\n/* Transparency disclosure */\n.signal-disclosure {\n  font-size: 11px;\n  color: var(--signal-text-muted);\n  text-shadow: var(--signal-text-shadow);\n  line-height: 1.45;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n\n.signal-disclosure-icon {\n  width: 14px;\n  height: 14px;\n  flex-shrink: 0;\n  opacity: 0.85;\n}\n\n/* Footer / Actions */\n.signal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 8px;\n}\n\n.signal-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  height: 42px;\n  padding: 0 20px;\n  border-radius: var(--signal-control-radius);\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);\n  line-height: 1;\n}\n\n.signal-btn-cancel {\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(8px);\n  color: var(--signal-text-secondary);\n}\n\n.signal-btn-cancel:hover {\n  background: rgba(255, 255, 255, 0.2);\n  color: var(--signal-text-primary);\n}\n\n.signal-btn-primary {\n  background: linear-gradient(135deg, var(--signal-accent) 0%, var(--signal-accent-hover) 100%);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  color: var(--signal-accent-text);\n  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);\n}\n\n.signal-btn-primary:hover:not(:disabled) {\n  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);\n}\n\n.signal-btn:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.signal-btn:focus-visible {\n  outline: 2px solid var(--signal-accent);\n  outline-offset: 2px;\n}\n\n/* Spinner */\n.signal-spinner {\n  width: 15px;\n  height: 15px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: signal-spin 0.6s linear infinite;\n}\n\n@keyframes signal-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n/* Success View */\n.signal-success-view {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 32px 16px;\n}\n\n.signal-success-icon-wrap {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: rgba(34, 197, 94, 0.25);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(34, 197, 94, 0.5);\n  color: #4ade80;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 18px;\n  box-shadow: 0 0 24px rgba(34, 197, 94, 0.35);\n}\n\n.signal-success-title {\n  margin: 0 0 8px 0;\n  font-size: 20px;\n  font-weight: 700;\n  color: #ffffff;\n  text-shadow: var(--signal-text-shadow);\n}\n\n.signal-success-text {\n  margin: 0 0 24px 0;\n  font-size: 14px;\n  color: rgba(255, 255, 255, 0.85);\n  text-shadow: var(--signal-text-shadow);\n  line-height: 1.5;\n  max-width: 320px;\n}\n\n/* Image Attribution Watermark inside widget */\n.signal-photo-credit {\n  margin-top: 18px;\n  padding-top: 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.15);\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.65);\n  text-shadow: var(--signal-text-shadow);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.signal-photo-credit a {\n  color: rgba(255, 255, 255, 0.9);\n  font-weight: 500;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n\n.signal-photo-credit a:hover {\n  color: #ffffff;\n}\n\n/* Live region for SR */\n.signal-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n/* Reduced motion */\n@media (prefers-reduced-motion: reduce) {\n  .signal-launcher,\n  .signal-panel-container,\n  .signal-cat-option,\n  .signal-star-btn,\n  .signal-btn,\n  .signal-spinner {\n    transition: none !important;\n    animation: none !important;\n    transform: none !important;\n  }\n}\n\n/* Mobile responsive constraints */\n@media (max-width: 480px) {\n  :host([position=\"bottom-right\"]) .signal-panel-container,\n  :host([position=\"bottom-left\"]) .signal-panel-container {\n    left: 12px !important;\n    right: 12px !important;\n    bottom: 74px !important;\n    width: auto !important;\n    max-width: calc(100vw - 24px) !important;\n  }\n  \n  :host([position=\"top-right\"]) .signal-panel-container,\n  :host([position=\"top-left\"]) .signal-panel-container {\n    left: 12px !important;\n    right: 12px !important;\n    top: 74px !important;\n    width: auto !important;\n    max-width: calc(100vw - 24px) !important;\n  }\n\n  .signal-category-grid {\n    grid-template-columns: 1fr;\n  }\n}\n", s = class extends Error {
	code;
	statusCode;
	retryAfter;
	details;
	constructor(e, t) {
		super(e), this.name = "FeedbackApiError", this.code = t.code, this.statusCode = t.statusCode, this.retryAfter = t.retryAfter, this.details = t.details;
	}
};
function c() {
	return typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : "idemp_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
}
function l() {
	return typeof window > "u" ? {} : {
		url: window.location.href,
		referrer: document.referrer || void 0,
		userAgent: navigator.userAgent,
		viewport: {
			width: window.innerWidth,
			height: window.innerHeight
		},
		locale: navigator.language,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
	};
}
async function u(e) {
	let { baseUrl: t, payload: n, idempotencyKey: r = c(), timeoutMs: i = 1e4 } = e, a = `${t.replace(/\/+$/, "")}/v1/feedback`, o = new AbortController(), l = setTimeout(() => {
		o.abort();
	}, i), u;
	try {
		u = await fetch(a, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"X-Project-Key": n.project_key,
				"X-Idempotency-Key": r
			},
			body: JSON.stringify(n),
			signal: o.signal
		});
	} catch (e) {
		throw clearTimeout(l), e instanceof Error ? e.name === "AbortError" ? new s("Request timed out. Please try again.", { code: "REQUEST_TIMEOUT" }) : new s(e.message || "Network error occurred.", { code: "NETWORK_ERROR" }) : new s("Failed to communicate with feedback service.", { code: "NETWORK_ERROR" });
	} finally {
		clearTimeout(l);
	}
	let d;
	try {
		d = await u.json();
	} catch {
		throw new s(`Received invalid response from server (Status ${u.status}).`, {
			code: "INVALID_SERVER_RESPONSE",
			statusCode: u.status
		});
	}
	if (!u.ok || !d.success) {
		let e = d.success ? void 0 : d.error, t = e?.code || `HTTP_${u.status}`, n = e?.message || `Feedback submission failed (${u.status})`, r = e?.retryAfter || (u.headers.get("Retry-After") ? parseInt(u.headers.get("Retry-After"), 10) : void 0);
		throw new s(n, {
			code: t,
			statusCode: u.status,
			retryAfter: r,
			details: e?.details
		});
	}
	return d;
}
//#endregion
//#region src/component/signal-feedback.ts
var d = class extends HTMLElement {
	static observedAttributes = [
		"api-base-url",
		"project-key",
		"theme",
		"background",
		"background-position",
		"overlay-intensity",
		"contrast-mode",
		"accent-color",
		"position",
		"mode",
		"launcher-label",
		"panel-title",
		"panel-description",
		"enable-rating",
		"enable-email",
		"enable-context",
		"max-length",
		"open"
	];
	_status = "idle";
	_errorMessage = null;
	_selectedCategory = "general";
	_rating = 0;
	_message = "";
	_email = "";
	_activeBackgroundUrl = null;
	_activeFallbackGradient = "";
	_photographerName = null;
	_photographerUrl = null;
	_lastFocusedElement = null;
	_shadowRoot;
	_panelContainer = null;
	_launcherBtn = null;
	_bgLayer = null;
	_overlayLayer = null;
	_contentLayer = null;
	_messageTextarea = null;
	_charCounter = null;
	_errorContainer = null;
	_liveRegion = null;
	_handleKeyDownBound = this._handleKeyDown.bind(this);
	_handleDocumentClickBound = this._handleDocumentClick.bind(this);
	constructor() {
		super(), this._shadowRoot = this.attachShadow({ mode: "open" });
	}
	connectedCallback() {
		this._render(), this._applyCustomProperties(), this._updateBackground(), document.addEventListener("keydown", this._handleKeyDownBound), document.addEventListener("click", this._handleDocumentClickBound), (this.hasAttribute("open") || this.getAttribute("mode") === "embedded") && this._openPanelUI(!1);
	}
	disconnectedCallback() {
		document.removeEventListener("keydown", this._handleKeyDownBound), document.removeEventListener("click", this._handleDocumentClickBound);
	}
	attributeChangedCallback(e, t, n) {
		t !== n && (e === "open" ? this.hasAttribute("open") ? this._openPanelUI(!0) : this._closePanelUI(!0) : e === "overlay-intensity" || e === "accent-color" || e === "theme" || e === "contrast-mode" ? this._applyCustomProperties() : e === "background" || e === "background-position" ? this._updateBackground() : this._panelContainer && (this._render(), this._applyCustomProperties(), this._updateBackground()));
	}
	get open() {
		return this.hasAttribute("open");
	}
	set open(e) {
		e ? this.setAttribute("open", "") : this.removeAttribute("open");
	}
	get apiBaseUrl() {
		return this.getAttribute("api-base-url") || "";
	}
	set apiBaseUrl(e) {
		this.setAttribute("api-base-url", e);
	}
	get projectKey() {
		return this.getAttribute("project-key") || "";
	}
	set projectKey(e) {
		this.setAttribute("project-key", e);
	}
	get theme() {
		return this.getAttribute("theme") || "auto";
	}
	set theme(e) {
		this.setAttribute("theme", e);
	}
	get background() {
		return this.getAttribute("background") || "lavender-clouds";
	}
	set background(e) {
		this.setAttribute("background", e);
	}
	get maxLength() {
		let e = parseInt(this.getAttribute("max-length") || "2000", 10);
		return isNaN(e) || e <= 0 ? 2e3 : e;
	}
	set maxLength(e) {
		this.setAttribute("max-length", e.toString());
	}
	get overlayIntensity() {
		let e = parseFloat(this.getAttribute("overlay-intensity") || "45");
		return isNaN(e) ? 45 : e;
	}
	set overlayIntensity(e) {
		this.setAttribute("overlay-intensity", e.toString());
	}
	get contrastMode() {
		return this.getAttribute("contrast-mode") || "normal";
	}
	set contrastMode(e) {
		this.setAttribute("contrast-mode", e);
	}
	show() {
		this.open = !0;
	}
	hide() {
		this.open = !1;
	}
	toggle() {
		this.open = !this.open;
	}
	reset() {
		this._status = "idle", this._errorMessage = null, this._message = "", this._rating = 0, this._email = "", this._selectedCategory = "general", this._render(), this._updateBackground();
	}
	_openPanelUI(e = !0) {
		this._panelContainer && (this._panelContainer.style.display = "flex", this._panelContainer.offsetWidth, this._panelContainer.style.opacity = "1", this._panelContainer.style.transform = "scale(1) translateY(0)"), this._launcherBtn && this._launcherBtn.setAttribute("aria-expanded", "true"), this._lastFocusedElement = document.activeElement, setTimeout(() => {
			this._shadowRoot.querySelector(".signal-cat-option, .signal-textarea, button")?.focus();
		}, 50), this._announce("Feedback dialog opened."), e && this.dispatchEvent(new CustomEvent("signal:open", {
			bubbles: !0,
			composed: !0
		}));
	}
	_closePanelUI(e = !0) {
		this.getAttribute("mode") !== "embedded" && (this._panelContainer && (this._panelContainer.style.opacity = "0", this._panelContainer.style.transform = "scale(0.96) translateY(8px)", setTimeout(() => {
			!this.hasAttribute("open") && this._panelContainer && (this._panelContainer.style.display = "none");
		}, 200)), this._launcherBtn && (this._launcherBtn.setAttribute("aria-expanded", "false"), this._lastFocusedElement && document.contains(this._lastFocusedElement) ? this._lastFocusedElement.focus() : this._launcherBtn.focus()), this._announce("Feedback dialog closed."), e && this.dispatchEvent(new CustomEvent("signal:close", {
			bubbles: !0,
			composed: !0
		})));
	}
	_handleKeyDown(e) {
		e.key === "Escape" && this.open && this.getAttribute("mode") !== "embedded" && (e.preventDefault(), this.open = !1);
	}
	_handleDocumentClick(e) {
		this.open && this.getAttribute("mode") !== "embedded" && (e.composedPath().includes(this) || (this.open = !1));
	}
	_applyCustomProperties() {
		let e = this.getAttribute("accent-color");
		e && (this.style.setProperty("--signal-accent", e), this.style.setProperty("--signal-input-border-focus", e));
		let t = this.getAttribute("overlay-intensity"), n = t === null ? 45 : parseFloat(t), r = isNaN(n) ? .45 : n > 1 ? n / 100 : n, i = this.getAttribute("theme") === "light";
		this.style.setProperty("--signal-overlay-opacity", r.toString()), this._overlayLayer && (this._overlayLayer.style.opacity = r.toString(), this._overlayLayer.style.background = i ? "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.70) 50%, rgba(255, 255, 255, 0.95) 100%)" : "linear-gradient(180deg, rgba(10, 15, 26, 0.35) 0%, rgba(10, 15, 26, 0.70) 50%, rgba(10, 15, 26, 0.95) 100%)");
	}
	async _updateBackground() {
		let e = this.getAttribute("background") || "lavender-clouds", t = this.getAttribute("background-position") || "center center", i = null, o = "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", s = null, c = null, l = n(e);
		if (l) i = l.url, o = l.fallbackGradient, s = l.photographer, c = l.photographerUrl;
		else {
			let t = r(e);
			t && (i = t);
		}
		this._activeFallbackGradient = o, this._photographerName = s, this._photographerUrl = c, this._bgLayer && (this._bgLayer.style.backgroundPosition = t, this._bgLayer.style.backgroundSize = "cover", this._bgLayer.style.backgroundRepeat = "no-repeat", i ? (this._activeBackgroundUrl = i, this._bgLayer.style.backgroundImage = `url("${i}"), ${o}`, a(i).then((e) => {
			!e && this._bgLayer && (this._bgLayer.style.backgroundImage = o, this._activeBackgroundUrl = null);
		})) : (this._activeBackgroundUrl = null, this._bgLayer.style.backgroundImage = o)), this._updateAttributionUI();
	}
	_updateAttributionUI() {
		let e = this._shadowRoot.querySelector(".signal-photo-credit");
		e && (this._photographerName && this._photographerUrl ? (e.style.display = "flex", e.innerHTML = `
          <span>Background photo</span>
          <span>By <a href="${this._photographerUrl}" target="_blank" rel="noopener noreferrer">${this._escape(this._photographerName)}</a> on Unsplash</span>
        `) : e.style.display = "none");
	}
	_announce(e) {
		this._liveRegion && (this._liveRegion.textContent = e);
	}
	_render() {
		let e = this.getAttribute("launcher-label") ?? "Feedback", t = this.getAttribute("panel-title") ?? "Send Feedback", n = this.getAttribute("panel-description") ?? "We value your thoughts. Let us know how we can improve.", r = this.getAttribute("enable-rating") !== "false", i = this.getAttribute("enable-email") !== "false", a = this.getAttribute("enable-context") !== "false", s = this.getAttribute("mode") || "floating";
		this._shadowRoot.innerHTML = `
      <style>${o}</style>
      
      <!-- Screen Reader Announcement Live Region -->
      <div class="signal-sr-only" aria-live="polite" aria-atomic="true"></div>

      <!-- Trigger Launcher (Floating Mode) -->
      ${s === "embedded" ? "" : `
        <button
          type="button"
          class="signal-launcher"
          aria-haspopup="dialog"
          aria-expanded="${this.open ? "true" : "false"}"
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
        aria-modal="${s === "embedded" ? "false" : "true"}"
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
			panelTitle: t,
			panelDesc: n,
			enableRating: r,
			enableEmail: i,
			enableContext: a,
			mode: s
		})}
        </div>
      </div>
    `, this._launcherBtn = this._shadowRoot.querySelector(".signal-launcher"), this._panelContainer = this._shadowRoot.querySelector(".signal-panel-container"), this._bgLayer = this._shadowRoot.querySelector(".signal-panel-bg-layer"), this._overlayLayer = this._shadowRoot.querySelector(".signal-panel-overlay-layer"), this._contentLayer = this._shadowRoot.querySelector(".signal-panel-content"), this._messageTextarea = this._shadowRoot.querySelector(".signal-textarea"), this._charCounter = this._shadowRoot.querySelector(".signal-char-counter"), this._errorContainer = this._shadowRoot.querySelector(".signal-error-alert"), this._liveRegion = this._shadowRoot.querySelector(".signal-sr-only"), this._bindEvents();
	}
	_renderPanelBody(e) {
		if (this._status === "success") return "\n        <div class=\"signal-success-view\">\n          <div class=\"signal-success-icon-wrap\" aria-hidden=\"true\">\n            <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polyline points=\"20 6 9 17 4 12\"></polyline>\n            </svg>\n          </div>\n          <h2 class=\"signal-success-title\">Thank you!</h2>\n          <p class=\"signal-success-text\">Your feedback has been received and saved. We review all feedback to improve the experience.</p>\n          <div class=\"signal-footer\">\n            <button type=\"button\" class=\"signal-btn signal-btn-primary signal-btn-reset\">\n              Send another note\n            </button>\n          </div>\n        </div>\n      ";
		let t = [
			{
				id: "bug",
				label: "Bug report",
				icon: "<path d=\"m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1\"></path><path d=\"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6\"></path><path d=\"M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M18 13h4M17.2 17c2.1.1 3.8 1.9 3.8 4\"></path>"
			},
			{
				id: "feature",
				label: "Feature request",
				icon: "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon>"
			},
			{
				id: "general",
				label: "General feedback",
				icon: "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>"
			},
			{
				id: "other",
				label: "Other",
				icon: "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01\"></path>"
			}
		], n = this._status === "submitting", r = this.maxLength - this._message.length;
		return `
      <!-- Header -->
      <div class="signal-header">
        <div class="signal-title-area">
          <h2 id="signal-title" class="signal-title">${this._escape(e.panelTitle)}</h2>
          <p id="signal-desc" class="signal-desc">${this._escape(e.panelDesc)}</p>
        </div>
        ${e.mode === "embedded" ? "" : "\n          <button type=\"button\" class=\"signal-close-btn\" aria-label=\"Close feedback panel\">\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n              <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n              <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n            </svg>\n          </button>\n        "}
      </div>

      <!-- Error banner if any -->
      ${this._errorMessage ? `
        <div class="signal-error-alert" role="alert">
          <svg class="signal-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>${this._escape(this._errorMessage)}</div>
        </div>
      ` : ""}

      <form class="signal-form" novalidate>
        <!-- Category Selector -->
        <span class="signal-category-label" id="signal-cat-label">Select category</span>
        <div class="signal-category-grid" role="radiogroup" aria-labelledby="signal-cat-label">
          ${t.map((e) => `
            <button
              type="button"
              role="radio"
              class="signal-cat-option"
              data-category="${e.id}"
              aria-checked="${this._selectedCategory === e.id ? "true" : "false"}"
              ${n ? "disabled" : ""}
            >
              <svg class="signal-cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                ${e.icon}
              </svg>
              <span>${e.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Optional Satisfaction Rating -->
        ${e.enableRating ? `
          <div class="signal-rating-group">
            <div class="signal-rating-header">
              <span class="signal-field-label">Satisfaction rating (optional)</span>
              <span class="signal-rating-value">${this._rating > 0 ? `${this._rating} of 5` : ""}</span>
            </div>
            <div class="signal-stars" role="radiogroup" aria-label="Satisfaction rating from 1 to 5">
              ${[
			1,
			2,
			3,
			4,
			5
		].map((e) => `
                <button
                  type="button"
                  role="radio"
                  class="signal-star-btn ${this._rating >= e ? "active" : ""}"
                  data-rating="${e}"
                  aria-checked="${this._rating === e ? "true" : "false"}"
                  aria-label="${e} star${e > 1 ? "s" : ""}"
                  ${n ? "disabled" : ""}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="${this._rating >= e ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Message Field -->
        <div class="signal-form-group">
          <div class="signal-field-label">
            <label for="signal-msg-input">Message</label>
            <span class="signal-char-counter ${r < 0 ? "error" : r < 100 ? "warning" : ""}">${this._message.length} / ${this.maxLength}</span>
          </div>
          <textarea
            id="signal-msg-input"
            class="signal-textarea"
            placeholder="Tell us what's on your mind..."
            maxlength="${this.maxLength + 200}"
            rows="3"
            aria-required="true"
            ${n ? "disabled" : ""}
          >${this._escape(this._message)}</textarea>
        </div>

        <!-- Optional Email Input -->
        ${e.enableEmail ? `
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
              ${n ? "disabled" : ""}
            />
          </div>
        ` : ""}

        <!-- Metadata Disclosure Notice -->
        ${e.enableContext ? "\n          <div class=\"signal-disclosure\">\n            <svg class=\"signal-disclosure-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n              <circle cx=\"12\" cy=\"12\" r=\"10\"></circle>\n              <line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line>\n              <line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line>\n            </svg>\n            <span>Submits page URL and browser diagnostics to resolve issues. No passwords or sensitive data collected.</span>\n          </div>\n        " : ""}

        <!-- Footer / Action Buttons -->
        <div class="signal-footer">
          ${e.mode === "embedded" ? "" : `
            <button type="button" class="signal-btn signal-btn-cancel" ${n ? "disabled" : ""}>Cancel</button>
          `}
          <button type="submit" class="signal-btn signal-btn-primary" ${n ? "disabled" : ""}>
            ${n ? "<span class=\"signal-spinner\" aria-hidden=\"true\"></span><span>Sending...</span>" : "<span>Submit feedback</span>"}
          </button>
        </div>
      </form>

      <!-- Background Attribution Notice inside widget -->
      <div class="signal-photo-credit" aria-hidden="true"></div>
    `;
	}
	_bindEvents() {
		this._launcherBtn && this._launcherBtn.addEventListener("click", () => {
			this.open = !this.open;
		});
		let e = this._shadowRoot.querySelector(".signal-close-btn");
		e && e.addEventListener("click", () => {
			this.open = !1;
		});
		let t = this._shadowRoot.querySelector(".signal-btn-cancel");
		t && t.addEventListener("click", () => {
			this.open = !1;
		});
		let n = this._shadowRoot.querySelector(".signal-btn-reset");
		n && n.addEventListener("click", () => {
			this.reset();
		});
		let r = this._shadowRoot.querySelectorAll(".signal-cat-option");
		r.forEach((e) => {
			e.addEventListener("click", () => {
				let t = e.getAttribute("data-category");
				t && (this._selectedCategory = t, r.forEach((t) => t.setAttribute("aria-checked", t === e ? "true" : "false")));
			});
		});
		let i = this._shadowRoot.querySelectorAll(".signal-star-btn");
		i.forEach((e) => {
			e.addEventListener("click", () => {
				let t = parseInt(e.getAttribute("data-rating") || "0", 10);
				this._rating = this._rating === t ? 0 : t, i.forEach((e) => {
					let t = parseInt(e.getAttribute("data-rating") || "0", 10);
					e.classList.toggle("active", this._rating >= t), e.setAttribute("aria-checked", this._rating === t ? "true" : "false");
					let n = e.querySelector("svg");
					n && n.setAttribute("fill", this._rating >= t ? "currentColor" : "none");
				});
				let n = this._shadowRoot.querySelector(".signal-rating-value");
				n && (n.textContent = this._rating > 0 ? `${this._rating} of 5` : "");
			});
		}), this._messageTextarea && this._messageTextarea.addEventListener("input", () => {
			this._message = this._messageTextarea.value;
			let e = this.maxLength - this._message.length;
			this._charCounter && (this._charCounter.textContent = `${this._message.length} / ${this.maxLength}`, this._charCounter.className = `signal-char-counter ${e < 0 ? "error" : e < 100 ? "warning" : ""}`);
		});
		let a = this._shadowRoot.querySelector("#signal-email-input");
		a && a.addEventListener("input", () => {
			this._email = a.value;
		});
		let o = this._shadowRoot.querySelector("form");
		o && o.addEventListener("submit", (e) => {
			e.preventDefault(), this._handleSubmit();
		});
	}
	async _handleSubmit() {
		if (this._status === "submitting") return;
		this._errorMessage = null;
		let e = this._message.trim();
		if (!e) {
			this._setStatus("validation-error", "Please enter a feedback message."), this._render(), this._updateBackground(), this._messageTextarea?.focus();
			return;
		}
		if (this._message.length > this.maxLength) {
			this._setStatus("validation-error", `Message exceeds maximum allowed length of ${this.maxLength} characters.`), this._render(), this._updateBackground(), this._messageTextarea?.focus();
			return;
		}
		let t = this._email.trim();
		if (t && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
			this._setStatus("validation-error", "Please enter a valid email address."), this._render(), this._updateBackground(), this._shadowRoot.querySelector("#signal-email-input")?.focus();
			return;
		}
		let n = this.getAttribute("project-key");
		if (!n) {
			this._setStatus("disabled", "Configuration error: project-key attribute is required."), this._render(), this._updateBackground();
			return;
		}
		let r = this.getAttribute("api-base-url") || "";
		if (!r) {
			this._setStatus("disabled", "Configuration error: api-base-url attribute is required."), this._render(), this._updateBackground();
			return;
		}
		this._setStatus("submitting"), this._render(), this._updateBackground(), this._announce("Submitting feedback...");
		let i = this.getAttribute("enable-context") === "false" ? void 0 : l();
		try {
			let a = await u({
				baseUrl: r,
				payload: {
					project_key: n,
					category: this._selectedCategory,
					message: e,
					rating: this._rating > 0 ? this._rating : void 0,
					email: t || void 0,
					context: i
				}
			});
			this._setStatus("success"), this._render(), this._updateBackground(), this._announce("Feedback submitted successfully. Thank you!"), this.dispatchEvent(new CustomEvent("signal:submit-success", {
				bubbles: !0,
				composed: !0,
				detail: {
					id: a.data.id,
					category: this._selectedCategory,
					rating: this._rating > 0 ? this._rating : void 0
				}
			}));
		} catch (e) {
			if (e instanceof s) {
				let t = e.message;
				e.code === "RATE_LIMIT_EXCEEDED" ? (t = "You are submitting feedback too quickly. Please wait a few moments before trying again.", this._setStatus("rate-limited", t)) : e.code === "REQUEST_TIMEOUT" ? (t = "Request timed out. Please check your connection and retry.", this._setStatus("timeout", t)) : e.code === "NETWORK_ERROR" ? (t = "Network unavailable. Unable to reach server.", this._setStatus("network-error", t)) : this._setStatus("server-rejection", t), this.dispatchEvent(new CustomEvent("signal:submit-error", {
					bubbles: !0,
					composed: !0,
					detail: {
						code: e.code,
						message: e.message,
						details: e.details
					}
				}));
			} else {
				let t = e instanceof Error ? e.message : "An unexpected error occurred.";
				this._setStatus("server-rejection", t);
			}
			this._render(), this._updateBackground();
		}
	}
	_setStatus(e, t = null) {
		this._status = e, this._errorMessage = t, this.dispatchEvent(new CustomEvent("signal:state-change", {
			bubbles: !0,
			composed: !0,
			detail: {
				state: e,
				error: t ?? void 0
			}
		}));
	}
	_escape(e) {
		return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}
};
typeof customElements < "u" && !customElements.get("signal-feedback") && customElements.define("signal-feedback", d);
//#endregion
//#region src/component/index.ts
var f = d;
//#endregion
export { e as BACKGROUND_PRESETS, s as FeedbackApiError, d as SignalFeedback, l as collectClientContext, f as default, c as generateIdempotencyKey, n as getBackgroundPreset, a as preloadImage, r as sanitizeImageUrl, u as submitFeedback };

//# sourceMappingURL=signal-feedback.js.map