// src/utils/storage.js
// Couche d'abstraction pour la persistance des données.
// Utilise localStorage par défaut. Remplacez par Firebase si besoin.

const STORAGE_KEY = 'devpath_progress';

// ── LocalStorage ─────────────────────────────────────────────────────────────

export const loadProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Erreur lecture localStorage :', err);
    return null;
  }
};

export const saveProgress = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Erreur écriture localStorage :', err);
  }
};

export const resetProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Erreur reset localStorage :', err);
  }
};

// ── Firebase (optionnel) ──────────────────────────────────────────────────────
// Décommentez et configurez firebase.js pour activer la persistance cloud.
//
// import { db } from '../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
//
// export const loadProgressFirebase = async (userId) => {
//   const ref = doc(db, 'progress', userId);
//   const snap = await getDoc(ref);
//   return snap.exists() ? snap.data() : null;
// };
//
// export const saveProgressFirebase = async (userId, data) => {
//   const ref = doc(db, 'progress', userId);
//   await setDoc(ref, data, { merge: true });
// };