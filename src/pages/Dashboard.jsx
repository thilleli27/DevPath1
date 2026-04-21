// src/pages/Dashboard.jsx
// Page d'accueil : bannière, stats globales, accès rapide aux modules

import MODULES from '../data/modules';
import StatCard from '../components/Dashboard/StatCard';
import ModuleCard from '../components/Modules/ModuleCard';
import styles from './Dashboard.module.css';
import '../styles/components.css';

export default function Dashboard({ navigate, progress }) {
  const {
    completedLessons,
    totalLessons,
    completedQuizzes,
    totalQuizzes,
    avgScore,
    overallPct,
    getModuleProgress,
  } = progress;

  const stats = [
    { icon: '📚', value: completedLessons,        label: 'Leçons complétées',  color: 'var(--accent)' },
    { icon: '🎯', value: avgScore ? `${avgScore}%` : '—', label: 'Score moyen quiz', color: 'var(--green)'  },
    { icon: '✅', value: completedQuizzes,         label: 'Quiz réussis',        color: 'var(--yellow)' },
    { icon: '🔥', value: `${overallPct}%`,         label: 'Progression globale', color: '#f97316'       },
  ];

  return (
    <div className={`${styles.page} fade-in`}>
      {/* Bannière de bienvenue */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>
            Bonjour, <span>Étudiant</span> 👋
          </h1>
          <p className={styles.bannerSub}>
            Continuez votre apprentissage du développement web. Vous progressez bien !
          </p>
          <div className={styles.bannerStats}>
            <div className={styles.bStat}>
              <strong>{completedLessons}</strong>
              <span>/ {totalLessons} leçons</span>
            </div>
            <div className={styles.bStat}>
              <strong>{completedQuizzes}</strong>
              <span>/ {totalQuizzes} quiz</span>
            </div>
            {avgScore > 0 && (
              <div className={styles.bStat}>
                <strong>{avgScore}%</strong>
                <span>score moyen</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.bannerGlow} aria-hidden="true" />
      </div>

      {/* Cartes de stats */}
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <StatCard key={i} {...s} accentColor={s.color} />
        ))}
      </div>

      {/* Modules */}
      <h2 className="section-title">◈ Modules disponibles</h2>
      <div className={styles.modulesGrid}>
        {MODULES.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            progressPct={getModuleProgress(mod)}
            onClick={() => navigate('module', mod)}
          />
        ))}
      </div>

      {/* CTA si aucun quiz fait */}
      {completedQuizzes === 0 && (
        <div className={styles.cta}>
          <p>
            💡 <strong>Conseil :</strong> Commencez par le module HTML5 pour poser des bases solides.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('module', MODULES[0])}
          >
            Commencer HTML5 →
          </button>
        </div>
      )}
    </div>
  );
}