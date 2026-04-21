// src/components/Progress/ProgressRing.jsx
// Anneau SVG de progression circulaire

import styles from './ProgressRing.module.css';

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ pct, size = 120 }) {
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  return (
    <div className={styles.ring} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
        aria-label={`Progression globale : ${pct}%`}
        role="img"
      >
        <circle
          className={styles.bg}
          cx="50" cy="50"
          r={RADIUS}
        />
        <circle
          className={styles.fill}
          cx="50" cy="50"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.text}>
        <span className={styles.pct}>{pct}%</span>
        <span className={styles.sub}>global</span>
      </div>
    </div>
  );
}