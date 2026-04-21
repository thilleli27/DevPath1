// src/components/Modules/ModuleCard.jsx
// Carte cliquable représentant un module avec sa progression

import styles from './ModuleCard.module.css';

export default function ModuleCard({ module, progressPct, onClick }) {
  return (
    <div
      className={styles.card}
      style={{ '--mod-color': module.color, '--mod-gradient': module.gradient }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Module ${module.title} — ${progressPct}% complété`}
    >
      <span className={styles.icon} style={{ color: module.color }}>
        {module.icon}
      </span>
      <div className={styles.title}>{module.title}</div>
      <div className={styles.desc}>{module.description}</div>
      <div className={styles.meta}>
        {module.lessons.length} leçon{module.lessons.length > 1 ? 's' : ''} · 1 quiz
      </div>
      <div className={styles.progressRow}>
        <div className={styles.bar}>
          <div
            className={styles.fill}
            style={{ width: `${progressPct}%`, background: module.color }}
          />
        </div>
        <span className={styles.pct}>{progressPct}%</span>
      </div>
    </div>
  );
}