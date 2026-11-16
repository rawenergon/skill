---
name: sticker-craft
description: "Design, construct, vectorize, and animate interactive 3D peelable vinyl stickers, die-cut decals, and SVG components with physics-based peel animations (usePeel) for React, Next.js, and modern web applications."
metadata:
  version: 1.0.0
---

# Sticker Craft

A specialized skill for designing, vectorizing, constructing, and rendering physical die-cut vinyl stickers and interactive 3D peelable components.

## When to Use
- Creating custom die-cut vinyl stickers with white outline borders and realistic depth.
- Implementing 3D hover peel animations (`usePeel`) where stickers tilt, elevate, and cast dynamic shadows.
- Vectorizing raster artwork (PNG/WebP) into clean SVG sticker paths.
- Integrating sticker catalogs, decal collections, and draggable/peelable UI badges into React or Next.js applications.

## Core Architecture

### 1. The Die-Cut Decal Standard
Every sticker follows the physical 3-layer construction:
1. **White Vinyl Outset:** An expanded background silhouette (`stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round"` or `feMorphology`) that gives the sticker its signature physical die-cut border.
2. **Foreground Vector Artwork:** Normalized vector paths inside a square or proportional `viewBox` (typically `0 0 100 100` or proportional bounds).
3. **Substrate Elevation:** Layered drop shadows (`feDropShadow` or CSS filter) creating visual depth above the canvas.

### 2. Interactive Peel Mechanics (`usePeel`)
Stickers achieve tactile realism through hover physics:
```tsx
import { usePeel } from "./usePeel";

export const MySticker = ({ size = 120, peel = true, style, ...props }) => {
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {/* Die-cut and artwork layers */}
    </svg>
  );
};
```

### 3. CLI Component Generator
Turn any standalone SVG into an animated sticker component:
```bash
python <skill-base-dir>/scripts/generate-sticker-component.py path/to/art.svg [OutputSticker.tsx]
```

## Adding Stickers to a Repository
1. **Prepare the SVG Asset:** Place clean die-cut SVG into `public/stickers/<sticker-name>.svg`.
2. **Generate the React Component:** Use `templates/StickerTemplate.tsx` or run `generate-sticker-component.py` to produce `<StickerName>Sticker.tsx`.
3. **Register in Catalog:**
   ```typescript
   {
     id: "svg-<sticker-name>",
     name: "<sticker-name>",
     title: "<Sticker Title>",
     category: "characters", // "characters" | "symbols" | "components"
     format: "component",
     componentName: "<StickerName>Sticker",
     svgSrc: "/stickers/<sticker-name>.svg",
     description: "Rich description of the decal.",
     tags: ["decal", "vinyl", "custom"],
     defaultRotation: 5,
   }
   ```
