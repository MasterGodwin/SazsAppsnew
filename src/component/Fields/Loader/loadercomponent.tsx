import React from "react";

export type LoaderSize    = "xs" | "sm" | "md" | "lg" | "xl";
export type LoaderVariant = "spinner" | "dots" | "bar" | "pulse";

interface LoaderProps {
  size?:       LoaderSize;
  variant?:    LoaderVariant;
  label?:      string;
  fullscreen?: boolean;
  overlay?:    boolean;
}

const SIZE: Record<LoaderSize, { svg: number; stroke: number; dot: number }> = {
  xs: { svg: 14, stroke: 2, dot: 5  },
  sm: { svg: 20, stroke: 2, dot: 6  },
  md: { svg: 32, stroke: 3, dot: 8  },
  lg: { svg: 48, stroke: 4, dot: 10 },
  xl: { svg: 64, stroke: 5, dot: 12 },
};

const Spinner: React.FC<{ size: LoaderSize }> = ({ size }) => {
  const { svg, stroke } = SIZE[size];
  return (
    <svg
      width={svg}
      height={svg}
      viewBox="0 0 50 50"
      className="block"
      style={{ animation: "lc-spin 0.75s linear infinite" }}
    >
      <circle cx="25" cy="25" r="20" fill="none" stroke="#2d3748" strokeWidth={stroke} />
      <circle
        cx="25" cy="25" r="20"
        fill="none"
        stroke="#0073bb"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray="85 30"
      />
    </svg>
  );
};

const Dots: React.FC<{ size: LoaderSize }> = ({ size }) => {
  const { dot } = SIZE[size];
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="rounded-full bg-[#0073bb] inline-block"
          style={{
            width:     dot,
            height:    dot,
            animation: `lc-bounce 1.1s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const Bar: React.FC<{ size: LoaderSize }> = ({ size }) => {
  const heights: Record<LoaderSize, number> = { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 };
  return (
    <div
      className="w-full max-w-[200px] rounded-full overflow-hidden bg-[#2d3748]"
      style={{ height: heights[size] }}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#0073bb] to-[#3b9dd2]"
        style={{ animation: "lc-bar 1.4s ease-in-out infinite" }}
      />
    </div>
  );
};

const Pulse: React.FC<{ size: LoaderSize }> = ({ size }) => {
  const { svg } = SIZE[size];
  return (
    <div
      className="rounded-full bg-[#0073bb22] flex items-center justify-center"
      style={{
        width:     svg,
        height:    svg,
        animation: "lc-pulse 1.2s ease-in-out infinite",
      }}
    >
      <div
        className="rounded-full bg-[#0073bb]"
        style={{ width: svg * 0.5, height: svg * 0.5 }}
      />
    </div>
  );
};

const KEYFRAMES = `
  @keyframes lc-spin   { to { transform: rotate(360deg); } }
  @keyframes lc-bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
    40%           { transform: scale(1);   opacity: 1;   }
  }
  @keyframes lc-bar {
    0%   { width: 0%;  margin-left: 0%; }
    50%  { width: 60%; margin-left: 20%; }
    100% { width: 0%;  margin-left: 100%; }
  }
  @keyframes lc-pulse {
    0%, 100% { transform: scale(1);    opacity: 0.7; }
    50%      { transform: scale(1.25); opacity: 1;   }
  }
`;

const Loader: React.FC<LoaderProps> = ({
  size       = "md",
  variant    = "spinner",
  label,
  fullscreen = false,
  overlay    = false,
}) => {
  const inner = (
    <div className="flex flex-col items-center gap-3">
      {variant === "spinner" && <Spinner size={size} />}
      {variant === "dots"    && <Dots    size={size} />}
      {variant === "bar"     && <Bar     size={size} />}
      {variant === "pulse"   && <Pulse   size={size} />}
      {label && (
        <span className="text-[13px] text-[#9ca3af] whitespace-nowrap">
          {label}
        </span>
      )}
      <style>{KEYFRAMES}</style>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-[#1a2332] border border-[#2d3748] rounded-[14px] py-8 px-12 flex flex-col items-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {inner}
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(22,29,38,0.75)] rounded-[inherit]">
        {inner}
      </div>
    );
  }

  return inner;
};

export default Loader;