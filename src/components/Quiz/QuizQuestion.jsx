// src/components/Quiz/QuizQuestion.jsx
// Affiche une question avec ses options et la barre de progression

import styles from './Quiz.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  correctCount,
  progressPct,
  selected,
  showExplanation,
  onSelect,
}) {
  const getOptionClass = (idx) => {
    if (selected === null) return '';
    if (idx === question.correct) return styles.optCorrect;
    if (idx === selected && idx !== question.correct) return styles.optWrong;
    return '';
  };

  return (
    <div className={styles.container}>
      {/* Barre de progression */}
      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <span>
            Question {questionIndex + 1} / {totalQuestions}
          </span>
          <span>{correctCount} correcte{correctCount > 1 ? 's' : ''}</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className={`${styles.questionCard} fade-in`}>
        <div className={styles.questionNum}>
          Question {questionIndex + 1}
        </div>
        <div className={styles.questionText}>{question.question}</div>

        <div className={styles.options}>
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              className={`${styles.option} ${getOptionClass(idx)}`}
              onClick={() => onSelect(idx)}
              disabled={selected !== null}
            >
              <span className={styles.letter}>{LETTERS[idx]}</span>
              {opt}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`${styles.explanation} fade-in`}>
            <strong>💡 Explication :</strong> {question.explanation}
          </div>
        )}
      </div>
    </div>
  );
}