// src/pages/ModuleDetail.jsx
// Page de détail d'un module : header, onglets Cours / Quiz

import { useState, useCallback } from 'react';
import LessonCard from '../components/Modules/LessonCard';
import LessonViewer from '../components/Modules/LessonViewer';
import QuizEngine from '../components/Quiz/QuizEngine';
import styles from './ModuleDetail.module.css';
import '../styles/components.css';

export default function ModuleDetail({ module, navigate, progress }) {
  const [activeTab, setActiveTab] = useState('cours');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const { progress: rawProgress, markLessonDone, saveQuizScore, getModuleProgress } = progress;
  const modProgress = rawProgress[module.id];
  const pct = getModuleProgress(module);

  const handleMarkDone = useCallback(() => {
    markLessonDone(module.id, selectedLesson.id);
  }, [markLessonDone, module.id, selectedLesson]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSelectedLesson(null);
  };

  return (
    <div className={`${styles.page} fade-in`}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Navigation">
        <button className="breadcrumb-link" onClick={() => navigate('modules')}>
          Modules
        </button>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-cur">{module.title}</span>
      </nav>

      {/* En-tête du module */}
      <div className={styles.header}>
        <div
          className={styles.headerIcon}
          style={{ color: module.color }}
          aria-hidden="true"
        >
          {module.icon}
        </div>
        <div className={styles.headerInfo}>
          <h2 className={styles.headerTitle}>{module.title}</h2>
          <p className={styles.headerDesc}>{module.description}</p>
          <div className={styles.headerBadges}>
            <span className="badge badge-blue">
              {module.lessons.length} leçon{module.lessons.length > 1 ? 's' : ''}
            </span>
            <span className="badge badge-yellow">
              {module.quiz.length} questions
            </span>
            {modProgress.quizScores.length > 0 && (
              <span className="badge badge-green">
                Meilleur score : {Math.max(...modProgress.quizScores)}%
              </span>
            )}
          </div>
        </div>
        <div className={styles.headerPct}>
          <span style={{ color: module.color }}>{pct}%</span>
        </div>
      </div>

      {/* Onglets */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'cours' ? 'tab-active' : ''}`}
          onClick={() => switchTab('cours')}
        >
          📖 Cours
        </button>
        <button
          className={`tab-btn ${activeTab === 'quiz' ? 'tab-active' : ''}`}
          onClick={() => switchTab('quiz')}
        >
          🎯 Quiz
        </button>
      </div>

      {/* ── Onglet Cours ── */}
      {activeTab === 'cours' && (
        <div
          className={`${styles.coursLayout} ${selectedLesson ? styles.withViewer : ''}`}
        >
          {/* Liste des leçons */}
          <div className={styles.lessonList}>
            {module.lessons.map((lesson, idx) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={idx}
                isDone={modProgress.lessonsCompleted.includes(lesson.id)}
                isActive={selectedLesson?.id === lesson.id}
                onClick={() => setSelectedLesson(lesson)}
              />
            ))}

            {!selectedLesson && (
              <p className={styles.hint}>
                Sélectionnez une leçon pour commencer.
              </p>
            )}
          </div>

          {/* Visionneuse de leçon */}
          {selectedLesson && (
            <LessonViewer
              lesson={selectedLesson}
              isDone={modProgress.lessonsCompleted.includes(selectedLesson.id)}
              onMarkDone={handleMarkDone}
              onClose={() => setSelectedLesson(null)}
            />
          )}
        </div>
      )}

      {/* ── Onglet Quiz ── */}
      {activeTab === 'quiz' && (
        <QuizEngine
          module={module}
          progress={progress}
          onScoreSaved={saveQuizScore}
          onBackToCours={() => switchTab('cours')}
        />
      )}
    </div>
  );
}