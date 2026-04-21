// src/components/Dashboard/StatCard.jsx

import styles from './StatCard.module.css';

export default function StatCard({ icon, value, label, accentColor }) {
  return (
    <div className={styles.card} style={{ '--card-accent': accentColor }}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}