import React from "react";

export default function BgBlur({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const filterId = React.useId().replace(/:/g, "");

  return (
    <svg
      className={`pointer-events-none ${className || ""}`}
      style={style}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      viewBox="0 0 3500 1500" // ⬅️ wider canvas
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.85" filter={`url(#${filterId})`}>
        {/* LEFT (Purple) — bigger + more left */}
        <path
          d="M1000 650C1000 820 780 950 520 950C260 950 40 820 40 650C40 480 260 350 520 350C780 350 1000 480 1000 650Z"
          fill="#7C3AED"
        />

        {/* CENTER (Orange) — biggest */}
        <path
          d="M2100 900C2100 1100 1850 1250 1550 1250C1250 1250 1000 1100 1000 900C1000 700 1250 550 1550 550C1850 550 2100 700 2100 900Z"
          fill="#FF7438"
        />

        {/* RIGHT (Red) — bigger + pushed right */}
        <path
          d="M3200 600C3200 780 2950 920 2650 920C2350 920 2100 780 2100 600C2100 420 2350 280 2650 280C2950 280 3200 420 3200 600Z"
          fill="#E34446"
        />
      </g>

      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="3500"
          height="1500"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" />
          <feBlend in="SourceGraphic" />
          <feGaussianBlur stdDeviation="180" /> {/* ⬅️ softer + bigger blur */}
        </filter>
      </defs>
    </svg>
  );
}
