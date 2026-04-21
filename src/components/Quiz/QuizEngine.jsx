// src/components/Quiz/QuizEngine.jsx
// Orchestrateur du quiz : affiche intro, questions ou résultats

import { useCallback } from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import QuizIntro from './QuizIntro';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

export default function QuizEngine({ module, progress, onScoreSaved, onBackToCours }) {
  const { quizScores } = progress.progress[module.id];

  const handleFinish = useCallback(
    (score) => onScoreSaved(module.id, score),
    [module.id, onScoreSaved]
  );

  const { state, start, restart, selectAnswer, currentQuestion, correctCount, progressPct } =
    useQuiz(module.quiz, handleFinish);

  /* ── Pas encore commencé ── */
  if (!state) {
    return (
      <QuizIntro
        module={module}
        quizScores={quizScores}
        onStart={start}
      />
    );
  }

  /* ── Résultats finaux ── */
  if (state.done) {
    return (
      <QuizResult
        score={state.finalScore}
        total={module.quiz.length}
        correct={state.answers.filter((a, i) => a === module.quiz[i].correct).length}
        onRestart={restart}
        onBackToCours={onBackToCours}
      />
    );
  }

  /* ── Question en cours ── */
  return (
    <QuizQuestion
      question={currentQuestion}
      questionIndex={state.current}
      totalQuestions={module.quiz.length}
      correctCount={correctCount}
      progressPct={progressPct}
      selected={state.selected}
      showExplanation={state.showExplanation}
      onSelect={selectAnswer}
    />
  );
}