// src/components/Layout/Topbar.jsx

import styles from './Topbar.module.css';

export default function Topbar({ title, overallPct, onMenuClick }) {
  return (
    <header className={styles.topbar}>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Menu">
        ☰
      </button>
      <span className={styles.title}>{title}</span>
      <span className={styles.badge}>✦ {overallPct}% global</span>
    </header>
  );
}