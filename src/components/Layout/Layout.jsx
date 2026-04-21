// src/components/Layout/Layout.jsx
// Mise en page principale : sidebar + topbar + contenu

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Layout.module.css';

export default function Layout({ children, page, navigate, progress, selectedModule }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = {
    dashboard: 'Tableau de bord',
    modules:   'Modules',
    module:    selectedModule?.title ?? 'Module',
    progress:  'Ma Progression',
  }[page] ?? 'DevPath';

  return (
    <div className={styles.app}>
      <Sidebar
        page={page}
        navigate={navigate}
        progress={progress}
        selectedModule={selectedModule}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className={styles.main}>
        <Topbar
          title={pageTitle}
          overallPct={progress.overallPct}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}