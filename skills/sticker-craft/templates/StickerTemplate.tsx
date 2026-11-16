import React, { useId } from "react";
import { usePeel } from "./usePeel";

export interface StickerProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  peel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Production-ready Die-Cut Vector Sticker Component.
 * Features 3D vinyl hover peel animation, drop-shadow elevation, and scalable vector paths.
 */
export const StickerTemplate: React.FC<StickerProps> = ({
  size = 120,
  width,
  height,
  peel = true,
  className = "",
  style,
  ...props
}) => {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "_");
  const { style: peelStyle, onMouseEnter, onMouseLeave } = usePeel(peel, style);

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sticker select-none pointer-events-auto ${className}`}
      style={peelStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="img"
      aria-label="Die-Cut Vinyl Sticker"
      {...props}
    >
      <defs>
        {/* Die-cut white border filter definition */}
        <filter id={`diecut_${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Layer 1: Die-cut white vinyl border backing */}
      <path
        d="M50 5 C75 5 95 25 95 50 C95 75 75 95 50 95 C25 95 5 75 5 50 C5 25 25 5 50 5 Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter={`url(#diecut_${id})`}
      />

      {/* Layer 2: Main illustration artwork */}
      <path
        d="M50 10 C72 10 90 28 90 50 C90 72 72 90 50 90 C28 90 10 72 10 50 C10 28 28 10 50 10 Z"
        fill="#FF3366"
      />

      {/* Layer 3: Highlighting & internal contours */}
      <circle cx="50" cy="50" r="24" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export default StickerTemplate;
