// src/components/Quiz/QuizResult.jsx
// Écran de résultats après la fin du quiz

import styles from './Quiz.module.css';

export default function QuizResult({ score, total, correct, onRestart, onBackToCours }) {
  const emoji  = score >= 80 ? '🏆' : score >= 60 ? '👍' : '📖';
  const label  = score >= 80
    ? 'Excellent ! Maîtrise confirmée.'
    : score >= 60
    ? 'Bon travail ! Continuez à réviser.'
    : 'Relisez les fiches de cours et réessayez.';

  const scoreColor =
    score >= 80 ? 'var(--green)' : score >= 60 ? 'var(--yellow)' : 'var(--red)';

  return (
    <div className={`${styles.result} fade-in`}>
      <span className={styles.resultEmoji}>{emoji}</span>
      <div className={styles.resultScore} style={{ color: scoreColor }}>
        {score}%
      </div>
      <p className={styles.resultLabel}>{label}</p>

      <div className={styles.breakdown}>
        <div className={styles.bdItem}>
          <div className={styles.bdValue} style={{ color: 'var(--green)' }}>
            {correct}
          </div>
          <div className={styles.bdLabel}>Correctes</div>
        </div>
        <div className={styles.bdItem}>
          <div className={styles.bdValue} style={{ color: 'var(--red)' }}>
            {total - correct}
          </div>
          <div className={styles.bdLabel}>Incorrectes</div>
        </div>
        <div className={styles.bdItem}>
          <div className={styles.bdValue}>{total}</div>
          <div className={styles.bdLabel}>Total</div>
        </div>
      </div>

      <div className={styles.resultActions}>
        <button className="btn btn-primary" onClick={onRestart}>
          Recommencer
        </button>
        <button className="btn btn-secondary" onClick={onBackToCours}>
          Retour aux cours
        </button>
      </div>
    </div>
  );
}