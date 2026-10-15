import { BackgroundPreset } from '../types.js';

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'lavender-clouds',
    name: 'Dreamy Blue & Lavender Clouds',
    category: 'Sky & Atmosphere',
    description: 'Soft ethereal pastel evening clouds with subtle lavender and violet tones.',
    url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900&q=80',
    photographer: 'Billy Huynh',
    photographerUrl: 'https://unsplash.com/@billy_huy',
    sourceUrl: 'https://unsplash.com/photos/a066f410bcda',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.65,
    fallbackGradient: 'linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #581c87 100%)',
  },
  {
    id: 'cinematic-ocean',
    name: 'Dark Cinematic Ocean',
    category: 'Nature & Water',
    description: 'Deep moody ocean waves with high-contrast crests and rich sapphire depths.',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80',
    photographer: 'Matt Hardy',
    photographerUrl: 'https://unsplash.com/@matthardy',
    sourceUrl: 'https://unsplash.com/photos/2083093ee35b',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.68,
    fallbackGradient: 'linear-gradient(180deg, #091e3a 0%, #173860 50%, #030b15 100%)',
  },
  {
    id: 'desert-dunes',
    name: 'Warm Desert Dunes',
    category: 'Landscape',
    description: 'Warm sculpted sand dunes with undulating ridgelines and golden hour illumination.',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
    photographer: 'Jeremy Bishop',
    photographerUrl: 'https://unsplash.com/@jeremybishop',
    sourceUrl: 'https://unsplash.com/photos/ff9c5deb0cd9',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.70,
    fallbackGradient: 'linear-gradient(135deg, #78350f 0%, #92400e 45%, #b45309 100%)',
  },
  {
    id: 'emerald-forest',
    name: 'Misty Emerald Forest',
    category: 'Nature & Fog',
    description: 'Dense pine canopy shrouded in rolling mountain morning mist.',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    photographer: 'Sebastian Unrau',
    photographerUrl: 'https://unsplash.com/@sebastian_unrau',
    sourceUrl: 'https://unsplash.com/photos/882707db888b',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.70,
    fallbackGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #022c22 100%)',
  },
  {
    id: 'mountain-landscape',
    name: 'Cinematic Mountain Landscape',
    category: 'Landscape',
    description: 'Dramatic alpine jagged peaks rising above low-lying clouds and glacial valleys.',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    photographer: 'Kalen Emsley',
    photographerUrl: 'https://unsplash.com/@kalenemsley',
    sourceUrl: 'https://unsplash.com/photos/fed622ff2c3b',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.68,
    fallbackGradient: 'linear-gradient(180deg, #1e293b 0%, #334155 50%, #0f172a 100%)',
  },
  {
    id: 'sunset-sky',
    name: 'Soft Sunset Sky',
    category: 'Sky & Atmosphere',
    description: 'Vibrant and warm twilight horizon painted in amber, coral, and violet gradients.',
    url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=900&q=80',
    photographer: 'Kimberly Vardeman',
    photographerUrl: 'https://unsplash.com/@kimberlyvardeman',
    sourceUrl: 'https://unsplash.com/photos/4d98c6e9c869',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.68,
    fallbackGradient: 'linear-gradient(135deg, #701a75 0%, #9d174d 40%, #b45309 100%)',
  },
  {
    id: 'architectural-shadows',
    name: 'Minimal Architectural Shadows',
    category: 'Architecture',
    description: 'Clean brutalist geometry with sharp architectural sunlight and cast shadow angles.',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    photographer: 'Scott Webb',
    photographerUrl: 'https://unsplash.com/@scottwebb',
    sourceUrl: 'https://unsplash.com/photos/719a280e022f',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.72,
    fallbackGradient: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%)',
  },
  {
    id: 'natural-texture',
    name: 'Subtle Abstract Mineral Texture',
    category: 'Texture',
    description: 'High-detail fluid mineral and slate geological grain with organic marbling.',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80',
    photographer: 'Pawel Czerwinski',
    photographerUrl: 'https://unsplash.com/@pawel_czerwinski',
    sourceUrl: 'https://unsplash.com/photos/fac1c5b4e853',
    license: 'Unsplash License',
    recommendedTheme: 'dark',
    defaultOverlayOpacity: 0.72,
    fallbackGradient: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)',
  },
];

const PRESETS_BY_ID = new Map<string, BackgroundPreset>(
  BACKGROUND_PRESETS.map((p) => [p.id.toLowerCase(), p])
);

export function getBackgroundPreset(id: string): BackgroundPreset | null {
  if (!id) return null;
  return PRESETS_BY_ID.get(id.toLowerCase().trim()) ?? null;
}

/**
 * Validates custom image URLs against safe protocols to prevent XSS or javascript: execution.
 */
export function sanitizeImageUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // Explicitly disallow dangerous protocols
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:text') ||
    lower.startsWith('data:application') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:')
  ) {
    return null;
  }

  // Allow http:, https:, relative paths, or safe image data URIs
  if (
    lower.startsWith('https://') ||
    lower.startsWith('http://') ||
    lower.startsWith('/') ||
    lower.startsWith('./') ||
    lower.startsWith('../') ||
    lower.startsWith('data:image/')
  ) {
    return trimmed;
  }

  return null;
}

/**
 * Image preloading cache to track loaded vs failed images without re-requesting
 */
const imageStatusCache = new Map<string, 'loaded' | 'failed'>();

export function preloadImage(src: string, timeoutMs = 8000): Promise<boolean> {
  const cached = imageStatusCache.get(src);
  if (cached === 'loaded') return Promise.resolve(true);
  if (cached === 'failed') return Promise.resolve(false);

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof Image === 'undefined') {
      // In SSR or non-browser environments, succeed immediately
      resolve(true);
      return;
    }

    const img = new Image();
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        imageStatusCache.set(src, 'failed');
        resolve(false);
      }
    }, timeoutMs);

    img.onload = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        imageStatusCache.set(src, 'loaded');
        resolve(true);
      }
    };

    img.onerror = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        imageStatusCache.set(src, 'failed');
        resolve(false);
      }
    };

    img.src = src;
  });
}
