// src/pages/Progress.jsx
// Page de progression : anneau global + détail par module + reset

import MODULES from '../data/modules';
import ProgressRing from '../components/Progress/ProgressRing';
import styles from './Progress.module.css';
import '../styles/components.css';

export default function Progress({ navigate, progress }) {
  const {
    overallPct,
    completedLessons,
    totalLessons,
    completedQuizzes,
    totalQuizzes,
    avgScore,
    getModuleProgress,
    progress: rawProgress,
    reset,
  } = progress;

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toute votre progression ?')) {
      reset();
    }
  };

  return (
    <div className={`${styles.page} fade-in`}>
      {/* ── Progression globale ── */}
      <div className={styles.overallCard}>
        <ProgressRing pct={overallPct} size={130} />
        <div className={styles.overallInfo}>
          <h2 className={styles.overallTitle}>Progression globale</h2>
          <p className={styles.overallSub}>
            {completedLessons} / {totalLessons} leçons complétées
          </p>
          <p className={styles.overallSub}>
            {completedQuizzes} / {totalQuizzes} quiz réalisés
            {avgScore > 0 && ` · Score moyen : ${avgScore}%`}
          </p>
          <div className={styles.overallBadges}>
            {overallPct === 100 && (
              <span className="badge badge-green">🏆 Parcours terminé !</span>
            )}
            {overallPct >= 50 && overallPct < 100 && (
              <span className="badge badge-blue">🚀 Bon rythme !</span>
            )}
            {overallPct > 0 && overallPct < 50 && (
              <span className="badge badge-yellow">💪 Continuez !</span>
            )}
            {overallPct === 0 && (
              <span className="badge badge-muted">Pas encore commencé</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Détail par module ── */}
      <h2 className="section-title">◎ Détail par module</h2>

      <div className={styles.moduleList}>
        {MODULES.map((mod) => {
          const p = rawProgress[mod.id];
          const pct = getModuleProgress(mod);
          const bestScore = p.quizScores.length ? Math.max(...p.quizScores) : null;

          const scoreColor =
            bestScore === null
              ? 'var(--text3)'
              : bestScore >= 80
              ? 'var(--green)'
              : bestScore >= 60
              ? 'var(--yellow)'
              : 'var(--red)';

          const status =
            pct === 100
              ? { label: '✓ Complété',   cls: 'badge-green'  }
              : pct > 0
              ? { label: 'En cours',      cls: 'badge-blue'   }
              : { label: 'Non commencé',  cls: 'badge-muted'  };

          return (
            <div className={styles.moduleCard} key={mod.id}>
              {/* En-tête */}
              <div className={styles.mcHeader}>
                <div
                  className={styles.mcIcon}
                  style={{ color: mod.color }}
                  aria-hidden="true"
                >
                  {mod.icon}
                </div>
                <div className={styles.mcInfo}>
                  <h3 className={styles.mcTitle}>{mod.title}</h3>
                  <p className={styles.mcDesc}>{mod.description}</p>
                </div>
                <div
                  className={styles.mcPct}
                  style={{ color: pct > 0 ? mod.color : 'var(--text3)' }}
                >
                  {pct}%
                </div>
              </div>

              {/* Barre de progression */}
              <div className={styles.mcBar}>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%`, background: mod.color }}
                  />
                </div>
              </div>

              {/* Détails chiffrés */}
              <div className={styles.mcDetails}>
                <div className={styles.mcDetail}>
                  <div className={styles.mcDetailLabel}>Leçons</div>
                  <div
                    className={styles.mcDetailValue}
                    style={{ color: mod.color }}
                  >
                    {p.lessonsCompleted.length} / {mod.lessons.length}
                  </div>
                </div>

                <div className={styles.mcDetail}>
                  <div className={styles.mcDetailLabel}>Meilleur score</div>
                  <div
                    className={styles.mcDetailValue}
                    style={{ color: scoreColor }}
                  >
                    {bestScore !== null ? `${bestScore}%` : '—'}
                  </div>
                </div>

                <div className={styles.mcDetail}>
                  <div className={styles.mcDetailLabel}>Tentatives</div>
                  <div className={styles.mcDetailValue}>
                    {p.quizScores.length}
                  </div>
                </div>

                <div className={styles.mcDetail}>
                  <div className={styles.mcDetailLabel}>Statut</div>
                  <span className={`badge ${status.cls}`}>{status.label}</span>
                </div>
              </div>

              {/* Action */}
              <div className={styles.mcAction}>
                <button
                  className="btn btn-secondary"
                  style={{ fontSize: 13 }}
                  onClick={() => navigate('module', mod)}
                >
                  {pct === 0 ? 'Commencer' : 'Continuer'} ce module →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Reset ── */}
      {overallPct > 0 && (
        <div className={styles.resetSection}>
          <p className={styles.resetText}>
            Vous souhaitez recommencer depuis le début ?
          </p>
          <button className="btn btn-danger" onClick={handleReset}>
            🗑 Réinitialiser ma progression
          </button>
        </div>
      )}

      {/* ── État vide ── */}
      {overallPct === 0 && (
        <div className="empty-state">
          <span className="emoji">🚀</span>
          <p>
            Votre progression apparaîtra ici une fois que vous aurez commencé
            les modules.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('modules')}
          >
            Commencer maintenant
          </button>
        </div>
      )}
    </div>
  );
}