// src/hooks/useQuiz.js
// Hook qui gère toute la logique du moteur de quiz :
// navigation entre questions, validation, score final.

import { useState, useCallback } from 'react';

const DELAY_MS = 1800; // délai avant passage à la question suivante

export const useQuiz = (questions, onFinish) => {
  const [state, setState] = useState(null); // null = quiz non démarré

  /** Démarre ou redémarre le quiz */
  const start = useCallback(() => {
    setState({
      current: 0,
      answers: [],
      selected: null,
      showExplanation: false,
      done: false,
      finalScore: null,
    });
  }, []);

  /** L'étudiant sélectionne une réponse */
  const selectAnswer = useCallback(
    (optionIndex) => {
      if (!state || state.selected !== null || state.done) return;

      setState((q) => ({ ...q, selected: optionIndex, showExplanation: true }));

      setTimeout(() => {
        setState((q) => {
          const answers = [...q.answers, optionIndex];
          const next = q.current + 1;

          if (next >= questions.length) {
            const correct = answers.filter(
              (a, i) => a === questions[i].correct
            ).length;
            const score = Math.round((correct / questions.length) * 100);
            onFinish?.(score);
            return {
              ...q,
              answers,
              selected: null,
              showExplanation: false,
              done: true,
              finalScore: score,
            };
          }

          return {
            ...q,
            answers,
            current: next,
            selected: null,
            showExplanation: false,
          };
        });
      }, DELAY_MS);
    },
    [state, questions, onFinish]
  );

  /** Réinitialise pour recommencer */
  const restart = useCallback(() => { start(); }, [start]);

  // Données dérivées utiles pour l'UI
  const currentQuestion = state ? questions[state.current] : null;
  const correctCount = state
    ? state.answers.filter((a, i) => a === questions[i].correct).length
    : 0;
  const progressPct = state
    ? Math.round((state.current / questions.length) * 100)
    : 0;

  return {
    state,
    start,
    restart,
    selectAnswer,
    currentQuestion,
    correctCount,
    progressPct,
  };
};