// src/components/Modules/LessonCard.jsx
// Ligne de leçon dans la liste d'un module

import styles from './LessonCard.module.css';

export default function LessonCard({ lesson, index, isDone, isActive, onClick }) {
  return (
    <div
      className={`${styles.card} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Leçon ${index + 1} : ${lesson.title}${isDone ? ' — terminée' : ''}`}
    >
      <div className={styles.num}>
        {isDone ? '✓' : index + 1}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{lesson.title}</div>
        <div className={styles.meta}>
          ⏱ {lesson.duration}{isDone ? ' · Terminé' : ''}
        </div>
      </div>
      <span className={styles.arrow} aria-hidden="true">›</span>
    </div>
  );
}