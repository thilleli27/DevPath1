// src/components/Layout/Sidebar.jsx

import MODULES from '../../data/modules';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '⊞', label: 'Tableau de bord' },
  { id: 'modules',   icon: '◈', label: 'Modules' },
  { id: 'progress',  icon: '◎', label: 'Ma Progression' },
];

export default function Sidebar({ page, navigate, progress, selectedModule, isOpen, onClose }) {
  const isActive = (id) =>
    page === id || (page === 'module' && id === 'modules');

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>DP</div>
        <div className={styles.logoText}>Dev<span>Path</span></div>
      </div>

      {/* Navigation principale */}
      <nav className={styles.nav}>
        <span className={styles.navLabel}>Navigation</span>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${isActive(item.id) ? styles.active : ''}`}
            onClick={() => { navigate(item.id); onClose(); }}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        {/* Liens rapides modules */}
        <span className={styles.navLabel} style={{ marginTop: 16 }}>Modules</span>
        {MODULES.map((mod) => {
          const pct = progress.getModuleProgress(mod);
          const isModActive = selectedModule?.id === mod.id && page === 'module';
          return (
            <button
              key={mod.id}
              className={`${styles.navItem} ${isModActive ? styles.active : ''}`}
              onClick={() => { navigate('module', mod); onClose(); }}
            >
              <span className={styles.navIconMono}>{mod.icon}</span>
              {mod.title}
              <span className={styles.modPct}>{pct}%</span>
            </button>
          );
        })}
      </nav>

      {/* Utilisateur */}
      <div className={styles.user}>
        <div className={styles.avatar}>É</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Étudiant</div>
          <div className={styles.userLevel}>Progression : {progress.overallPct}%</div>
        </div>
      </div>
    </aside>
  );
}