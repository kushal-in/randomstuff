import React from 'react';

/**
 * Reusable decorative section background with floating gradient orbs
 * and a subtle dot-grid texture overlay.
 *
 * Props:
 *   variant  – 'teal' | 'cyan' | 'lime' (controls orb color palette)
 *   intensity – number 0–1 (opacity of the gradient orbs, default 0.08)
 *   children  – content rendered on top of the background
 *   className – optional extra classes on the wrapper
 */

const PALETTES = {
  teal: [
    'rgba(48, 189, 165, VAR)',  // primary
    'rgba(22, 132, 177, VAR)',  // accent
  ],
  cyan: [
    'rgba(22, 132, 177, VAR)',
    'rgba(48, 189, 165, VAR)',
  ],
  lime: [
    'rgba(134, 196, 64, VAR)',
    'rgba(48, 189, 165, VAR)',
  ],
};

const SectionBackground = ({
  variant = 'teal',
  intensity = 0.08,
  children,
  className = '',
}) => {
  const colors = (PALETTES[variant] || PALETTES.teal).map((c) =>
    c.replace('VAR', String(intensity))
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute w-[420px] h-[420px] rounded-full blur-[140px] animate-drift-a"
          style={{
            background: colors[0],
            top: '10%',
            left: '15%',
          }}
        />
        <div
          className="absolute w-[360px] h-[360px] rounded-full blur-[120px] animate-drift-b"
          style={{
            background: colors[1],
            bottom: '15%',
            right: '10%',
          }}
        />
        <div
          className="absolute w-[280px] h-[280px] rounded-full blur-[100px] animate-drift-a"
          style={{
            background: colors[0],
            top: '60%',
            left: '55%',
            animationDelay: '-8s',
          }}
        />
      </div>

      {/* Subtle dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SectionBackground;
