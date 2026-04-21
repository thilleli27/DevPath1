// src/hooks/useProgress.js
// Hook personnalisé pour gérer la progression de l'étudiant.
// Persiste automatiquement dans localStorage à chaque changement.

import { useState, useEffect, useCallback } from 'react';
import MODULES from '../data/modules';
import { loadProgress, saveProgress, resetProgress } from '../utils/storage';

// Génère l'état initial vide pour tous les modules
const buildInitialProgress = () =>
  Object.fromEntries(
    MODULES.map((m) => [m.id, { lessonsCompleted: [], quizScores: [] }])
  );

export const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = loadProgress();
    return saved ?? buildInitialProgress();
  });

  // Persistance automatique
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Marque une leçon comme terminée */
  const markLessonDone = useCallback((moduleId, lessonId) => {
    setProgress((prev) => {
      const mod = prev[moduleId];
      if (mod.lessonsCompleted.includes(lessonId)) return prev;
      return {
        ...prev,
        [moduleId]: {
          ...mod,
          lessonsCompleted: [...mod.lessonsCompleted, lessonId],
        },
      };
    });
  }, []);

  /** Enregistre un score de quiz */
  const saveQuizScore = useCallback((moduleId, score) => {
    setProgress((prev) => {
      const mod = prev[moduleId];
      return {
        ...prev,
        [moduleId]: {
          ...mod,
          quizScores: [...mod.quizScores, score],
        },
      };
    });
  }, []);

  /** Remet la progression à zéro */
  const reset = useCallback(() => {
    resetProgress();
    setProgress(buildInitialProgress());
  }, []);

  // ── Sélecteurs ─────────────────────────────────────────────────────────────

  /** Pourcentage de progression d'un module (60% leçons + 40% quiz) */
  const getModuleProgress = useCallback(
    (mod) => {
      const p = progress[mod.id];
      const lessonPct = mod.lessons.length
        ? p.lessonsCompleted.length / mod.lessons.length
        : 0;
      const quizPct = p.quizScores.length > 0 ? 1 : 0;
      return Math.round((lessonPct * 0.6 + quizPct * 0.4) * 100);
    },
    [progress]
  );

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  const completedLessons = Object.values(progress).reduce(
    (a, p) => a + p.lessonsCompleted.length,
    0
  );
  const totalQuizzes = MODULES.length;
  const completedQuizzes = Object.values(progress).filter(
    (p) => p.quizScores.length > 0
  ).length;

  const allScores = Object.values(progress).flatMap((p) => p.quizScores);
  const avgScore = allScores.length
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  const overallPct = Math.round(
    (completedLessons / totalLessons) * 60 +
    (completedQuizzes / totalQuizzes) * 40
  );

  return {
    progress,
    markLessonDone,
    saveQuizScore,
    reset,
    getModuleProgress,
    totalLessons,
    completedLessons,
    totalQuizzes,
    completedQuizzes,
    avgScore,
    overallPct,
  };
};