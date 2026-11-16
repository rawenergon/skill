"use client";

import React, { useState } from "react";

export interface UsePeelOptions {
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  translateY?: number;
  scale?: number;
  shadowColor?: string;
}

/**
 * 3D interactive vinyl sticker peel hook.
 * Adds tactile physical depth, perspective tilt, and realistic lift shadows on hover.
 */
export function usePeel(
  peel: boolean = true,
  userStyle?: React.CSSProperties,
  options?: UsePeelOptions
) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    transformOrigin: "center center",
    ...userStyle,
  };

  if (!peel) {
    return {
      style: baseStyle,
      onMouseEnter: undefined,
      onMouseLeave: undefined,
      isHovered: false,
    };
  }

  const perspective = options?.perspective ?? 600;
  const rotX = options?.rotateX ?? 10;
  const rotY = options?.rotateY ?? -10;
  const transY = options?.translateY ?? -8;
  const scaleHover = options?.scale ?? 1.08;
  const shadowColor = options?.shadowColor ?? "rgba(0, 0, 0, 0.35)";

  const baseTransform = userStyle?.transform ? `${userStyle.transform} ` : "";
  const transform = hovered
    ? `${baseTransform}perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${transY}px) scale(${scaleHover})`
    : `${baseTransform}perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;

  const baseFilter = userStyle?.filter ? `${userStyle.filter} ` : "";
  const filter = hovered
    ? `${baseFilter}drop-shadow(0 20px 25px ${shadowColor})`
    : (userStyle?.filter || "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08))");

  const peelStyle: React.CSSProperties = {
    ...baseStyle,
    cursor: "pointer",
    transition:
      "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    transform,
    filter,
  };

  return {
    style: peelStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    isHovered: hovered,
  };
}
