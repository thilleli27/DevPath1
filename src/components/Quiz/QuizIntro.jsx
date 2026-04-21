// src/components/Quiz/QuizIntro.jsx
// Écran d'introduction avant de lancer un quiz

import styles from './Quiz.module.css';

export default function QuizIntro({ module, quizScores, onStart }) {
  const bestScore = quizScores.length ? Math.max(...quizScores) : null;

  return (
    <div className={styles.intro}>
      <div className={styles.introEmoji}>🎯</div>
      <h3 className={styles.introTitle}>Quiz — {module.title}</h3>
      <p className={styles.introSub}>
        {module.quiz.length} questions · Testez vos connaissances
      </p>

      {bestScore !== null && (
        <div className={styles.introPrev}>
          <span>
            Tentatives : <strong>{quizScores.length}</strong>
          </span>
          <span>
            Meilleur score :{' '}
            <strong
              style={{
                color:
                  bestScore >= 80
                    ? 'var(--green)'
                    : bestScore >= 60
                    ? 'var(--yellow)'
                    : 'var(--red)',
              }}
            >
              {bestScore}%
            </strong>
          </span>
        </div>
      )}

      <button className="btn btn-primary btn-lg" onClick={onStart}>
        Commencer le quiz →
      </button>
    </div>
  );
}