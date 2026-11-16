#!/usr/bin/env python3
"""
Sticker Component Generator
Converts any clean SVG into a production-ready die-cut React sticker component with usePeel animation.
"""

import sys
import os
import re
import xml.etree.ElementTree as ET

def sanitize_name(name):
    # Convert kebab-case or snake_case to PascalCase
    words = re.split(r'[-_ ]+', name)
    pascal = ''.join(w.capitalize() for w in words if w)
    if not pascal.endswith("Sticker"):
        pascal += "Sticker"
    return pascal

def generate_component(svg_path, output_path=None):
    if not os.path.exists(svg_path):
        print(f"Error: {svg_path} not found.")
        sys.exit(1)

    base_name = os.path.splitext(os.path.basename(svg_path))[0]
    component_name = sanitize_name(base_name)

    with open(svg_path, 'r', encoding='utf-8') as f:
        svg_content = f.read()

    # Extract viewBox
    vb_match = re.search(r'viewBox=["\']([^"\']+)["\']', svg_content)
    view_box = vb_match.group(1) if vb_match else "0 0 100 100"

    # Extract inner elements (paths, g, circles, rects)
    # Remove outer <svg ...> and </svg>
    inner_svg = re.sub(r'<\?xml[^>]*\?>', '', svg_content)
    inner_svg = re.sub(r'<!--.*?-->', '', inner_svg, flags=re.DOTALL)
    inner_svg = re.sub(r'<svg[^>]*>', '', inner_svg, count=1)
    inner_svg = re.sub(r'</svg>\s*$', '', inner_svg, count=1).strip()

    # Convert common XML attributes to React camelCase
    inner_svg = re.sub(r'stroke-width=', 'strokeWidth=', inner_svg)
    inner_svg = re.sub(r'stroke-linecap=', 'strokeLinecap=', inner_svg)
    inner_svg = re.sub(r'stroke-linejoin=', 'strokeLinejoin=', inner_svg)
    inner_svg = re.sub(r'fill-rule=', 'fillRule=', inner_svg)
    inner_svg = re.sub(r'clip-rule=', 'clipRule=', inner_svg)
    inner_svg = re.sub(r'clip-path=', 'clipPath=', inner_svg)
    inner_svg = re.sub(r'fill-opacity=', 'fillOpacity=', inner_svg)
    inner_svg = re.sub(r'stroke-opacity=', 'strokeOpacity=', inner_svg)
    inner_svg = re.sub(r'stop-color=', 'stopColor=', inner_svg)
    inner_svg = re.sub(r'stop-opacity=', 'stopOpacity=', inner_svg)

    code = f'''import React, {{"useId"}} from "react";
import {{ usePeel }} from "../utils/usePeel";

export interface StickerProps extends React.SVGProps<SVGSVGElement> {{
  size?: number | string;
  width?: number | string;
  height?: number | string;
  peel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}}

/**
 * {component_name}
 * Die-cut vinyl vector sticker with interactive 3D peel animation.
 */
export const {component_name}: React.FC<StickerProps> = ({{
  size = 120,
  width,
  height,
  peel = true,
  className = "",
  style,
  ...props
}}) => {{
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "_");
  const {{ style: peelStyle, onMouseEnter, onMouseLeave }} = usePeel(peel, style);

  return (
    <svg
      width={{width ?? size}}
      height={{height ?? size}}
      viewBox="{view_box}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={{`sticker select-none pointer-events-auto ${{className}}`}}
      style={{peelStyle}}
      onMouseEnter={{onMouseEnter}}
      onMouseLeave={{onMouseLeave}}
      role="img"
      aria-label="{component_name}"
      {{...props}}
    >
      <defs>
        <filter id={{`diecut_${{id}}`}} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>

      {inner_svg}
    </svg>
  );
}};

export default {component_name};
'''

    if not output_path:
        output_path = os.path.join(os.path.dirname(svg_path), f"{component_name}.tsx")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(code)

    print(f"Generated React sticker component: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate-sticker-component.py <path/to/sticker.svg> [output.tsx]")
        sys.exit(1)
    svg_p = sys.argv[1]
    out_p = sys.argv[2] if len(sys.argv) > 2 else None
    generate_component(svg_p, out_p)
