// src/pages/ModulesList.jsx
// Liste de tous les modules disponibles

import MODULES from '../data/modules';
import ModuleCard from '../components/Modules/ModuleCard';
import styles from './ModulesList.module.css';
import '../styles/components.css';

export default function ModulesList({ navigate, progress }) {
  return (
    <div className={`${styles.page} fade-in`}>
      <h2 className="section-title">◈ Tous les modules</h2>
      <p className={styles.subtitle}>
        {MODULES.length} modules · {MODULES.reduce((a, m) => a + m.lessons.length, 0)} leçons ·{' '}
        {MODULES.length} quiz
      </p>

      <div className={styles.grid}>
        {MODULES.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            progressPct={progress.getModuleProgress(mod)}
            onClick={() => navigate('module', mod)}
          />
        ))}
      </div>
    </div>
  );
}