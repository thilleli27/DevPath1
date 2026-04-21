// src/components/Modules/LessonViewer.jsx
// Panneau d'affichage du contenu d'une leçon avec rendu Markdown

import { renderMarkdown } from '../../utils/markdown';
import styles from './LessonViewer.module.css';

export default function LessonViewer({ lesson, isDone, onMarkDone, onClose }) {
  return (
    <div className={`${styles.wrapper} fade-in`}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{lesson.title}</h3>
        <div className={styles.actions}>
          {isDone ? (
            <span className="badge badge-green">✓ Terminé</span>
          ) : (
            <button className="btn btn-primary" onClick={onMarkDone}>
              ✓ Marquer terminé
            </button>
          )}
          <button
            className="btn btn-ghost"
            onClick={onClose}
            aria-label="Fermer la leçon"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Contenu Markdown */}
      <div className={styles.body}>
        <div className={styles.mdContent}>
          {renderMarkdown(lesson.content)}
        </div>
      </div>
    </div>
  );
}