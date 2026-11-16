# Anatomy of a Die-Cut Vector Vinyl Sticker

Creating high-grade digital stickers requires understanding physical vinyl decal construction:

## 1. Physical Layering
A physical vinyl sticker has three primary optical layers:
1. **Drop Shadow / Elevation:**
   - Soft directional shadow cast by the sticker onto the substrate surface.
   - SVG implementation: `<feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.2" />`
2. **Die-Cut White Vinyl Backing (The Decal Border):**
   - The white perimeter margin cut out by a CNC drag knife.
   - Creates contrast against any background color (dark mode, light mode, gradients).
   - SVG implementation: Underlying path or grouped paths rendered with `stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="round"`.
3. **Primary Artwork Layer:**
   - Vector shapes, flat fills, and linear/radial gradients.
   - Grouped cleanly inside `<g>` elements.
4. **Gloss / Specular Highlights:**
   - Pure white or translucent shapes (`opacity="0.8"`) creating a plastic sheen on curved surfaces.

---

## 2. Interactive Peel Mechanics (`usePeel`)
Digital stickers feel physical through reactive hover transformations:
* **Perspective:** `perspective(600px)` creates realistic foreshortening.
* **3D Rotation:** Subtle `rotateX(10deg) rotateY(-10deg)` tilts the lifted corner toward the user.
* **Elevation Lift:** `translateY(-8px) scale(1.08)` lifts the sticker off the glass surface.
* **Dynamic Shadow:** Elevates from `drop-shadow(0 2px 4px rgba(0,0,0,0.08))` to `drop-shadow(0 20px 25px rgba(0,0,0,0.35))`.
* **Physics Curve:** Spring-like easing `cubic-bezier(0.34, 1.56, 0.64, 1)` provides tactile vinyl elasticity.

---

## 3. Catalog Data Schema
```typescript
interface StickerCatalogEntry {
  id: string;             // e.g. "svg-akatsuki-cloud"
  name: string;           // kebab-case identifier
  title: string;          // Human-readable title
  category: "characters" | "symbols" | "components" | "brands";
  format: "component" | "svg";
  componentName: string;  // PascalCase component name
  svgSrc: string;         // public path to standalone SVG asset
  description: string;    // Rich description
  tags: string[];         // Search tags
  defaultRotation?: number; // Organic placement tilt in degrees (-12 to +12)
}
```
