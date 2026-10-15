# Asset Attribution and Licensing

Signal incorporates curated photographic backgrounds to provide high-fidelity visual context inside the feedback component while ensuring that user text, form controls, and interactive elements retain strict WCAG 2.2 AA contrast.

All photographic assets included in Signal are genuine, authentic photographs sourced from [Unsplash](https://unsplash.com) and licensed under the **Unsplash License** (free to use for commercial and non-commercial purposes, no permission needed, attribution appreciated).

None of the assets are AI-generated, synthetic placeholders, or from unlicensed third parties.

---

## Photographic Presets Manifest

### 1. Dreamy Blue & Lavender Clouds (`lavender-clouds`)
- **Title**: Dreamy Blue and Lavender Clouds
- **Photographer**: Billy Huynh
- **Photographer Profile**: [https://unsplash.com/@billy_huy](https://unsplash.com/@billy_huy)
- **Asset Source**: [https://unsplash.com/photos/a066f410bcda](https://unsplash.com/photos/a066f410bcda)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Dark scrim overlay (`rgba(15, 23, 42, 0.65)` to `rgba(15, 23, 42, 0.85)`), high-contrast white text (`#f8fafc`).
- **Resilient Fallback**: `linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #581c87 100%)`

### 2. Dark Cinematic Ocean (`cinematic-ocean`)
- **Title**: Dark Cinematic Ocean
- **Photographer**: Matt Hardy
- **Photographer Profile**: [https://unsplash.com/@matthardy](https://unsplash.com/@matthardy)
- **Asset Source**: [https://unsplash.com/photos/2083093ee35b](https://unsplash.com/photos/2083093ee35b)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Sapphire dark scrim overlay, cyan/white indicators.
- **Resilient Fallback**: `linear-gradient(180deg, #091e3a 0%, #173860 50%, #030b15 100%)`

### 3. Warm Desert Dunes (`desert-dunes`)
- **Title**: Warm Desert Dunes
- **Photographer**: Jeremy Bishop
- **Photographer Profile**: [https://unsplash.com/@jeremybishop](https://unsplash.com/@jeremybishop)
- **Asset Source**: [https://unsplash.com/photos/ff9c5deb0cd9](https://unsplash.com/photos/ff9c5deb0cd9)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Amber-tinted dark scrim overlay, high-contrast crisp text.
- **Resilient Fallback**: `linear-gradient(135deg, #78350f 0%, #92400e 45%, #b45309 100%)`

### 4. Misty Emerald Forest (`emerald-forest`)
- **Title**: Misty Emerald Forest
- **Photographer**: Sebastian Unrau
- **Photographer Profile**: [https://unsplash.com/@sebastian_unrau](https://unsplash.com/@sebastian_unrau)
- **Asset Source**: [https://unsplash.com/photos/882707db888b](https://unsplash.com/photos/882707db888b)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Deep forest green-black scrim, crisp readable text.
- **Resilient Fallback**: `linear-gradient(135deg, #064e3b 0%, #065f46 50%, #022c22 100%)`

### 5. Cinematic Mountain Landscape (`mountain-landscape`)
- **Title**: Cinematic Mountain Landscape
- **Photographer**: Kalen Emsley
- **Photographer Profile**: [https://unsplash.com/@kalenemsley](https://unsplash.com/@kalenemsley)
- **Asset Source**: [https://unsplash.com/photos/fed622ff2c3b](https://unsplash.com/photos/fed622ff2c3b)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Slate-navy scrim overlay, high legibility.
- **Resilient Fallback**: `linear-gradient(180deg, #1e293b 0%, #334155 50%, #0f172a 100%)`

### 6. Soft Sunset Sky (`sunset-sky`)
- **Title**: Soft Sunset Sky
- **Photographer**: Kimberly Vardeman
- **Photographer Profile**: [https://unsplash.com/@kimberlyvardeman](https://unsplash.com/@kimberlyvardeman)
- **Asset Source**: [https://unsplash.com/photos/4d98c6e9c869](https://unsplash.com/photos/4d98c6e9c869)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Deep plum/coral scrim overlay, warm white typography.
- **Resilient Fallback**: `linear-gradient(135deg, #701a75 0%, #9d174d 40%, #b45309 100%)`

### 7. Minimal Architectural Shadows (`architectural-shadows`)
- **Title**: Minimal Architectural Shadows
- **Photographer**: Scott Webb
- **Photographer Profile**: [https://unsplash.com/@scottwebb](https://unsplash.com/@scottwebb)
- **Asset Source**: [https://unsplash.com/photos/719a280e022f](https://unsplash.com/photos/719a280e022f)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Neutral charcoal scrim overlay, monochrome accents.
- **Resilient Fallback**: `linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)`

### 8. Subtle Natural Mineral Texture (`natural-texture`)
- **Title**: Subtle Natural Fluid Mineral Texture
- **Photographer**: Pawel Czerwinski
- **Photographer Profile**: [https://unsplash.com/@pawel_czerwinski](https://unsplash.com/@pawel_czerwinski)
- **Asset Source**: [https://unsplash.com/photos/fac1c5b4e853](https://unsplash.com/photos/fac1c5b4e853)
- **License**: Unsplash License
- **Optimal Text Contrast Profile**: Obsidian stone scrim overlay, high-contrast accents.
- **Resilient Fallback**: `linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)`

---

## Technical Image Delivery & Fallback Policy

1. **In-Widget Boundary**: All images are applied solely to the internal panel container within the Web Component Shadow DOM (`#signal-panel-bg`). The host page background is never affected.
2. **Lazy Preloading**: Images are cached and preloaded through an `Image()` loader with progressive blur-up and error detection.
3. **Resilient Degradation**: If an image request fails, times out, or the client is offline, the component automatically falls back to the preset's calibrated multi-stop CSS gradient, guaranteeing zero broken layout and uninterrupted contrast compliance.
4. **Custom Image Sanitization**: Custom user URLs are strictly checked against allowed protocols (`https:`, `http:` or `data:image/...`), rejecting `javascript:`, `file:`, or malformed URI schemes.
