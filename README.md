# DevPath 🚀

Plateforme d'apprentissage du développement web — HTML5, CSS, JavaScript, React.

---

## Structure du projet

```
devpath/
├── public/
│   └── index.html               ← Point d'entrée HTML
│
├── src/
│   ├── index.js                 ← Montage React
│   ├── App.jsx                  ← Router principal (état de navigation)
│   ├── firebase.js              ← Configuration Firebase (à remplir)
│   │
│   ├── data/
│   │   └── modules.js           ← Tout le contenu pédagogique (leçons + quiz)
│   │
│   ├── hooks/
│   │   ├── useProgress.js       ← Hook : progression + persistance localStorage
│   │   └── useQuiz.js           ← Hook : moteur de quiz (questions, score)
│   │
│   ├── utils/
│   │   ├── storage.js           ← Abstraction localStorage / Firebase
│   │   └── markdown.jsx         ← Rendu Markdown simplifié pour les fiches
│   │
│   ├── styles/
│   │   ├── global.css           ← Variables CSS, reset, animations globales
│   │   └── components.css       ← Styles partagés : boutons, badges, tabs…
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx           ← Mise en page principale (sidebar + topbar)
│   │   │   ├── Layout.module.css
│   │   │   ├── Sidebar.jsx          ← Navigation latérale
│   │   │   ├── Sidebar.module.css
│   │   │   ├── Topbar.jsx           ← Barre supérieure (titre + score global)
│   │   │   └── Topbar.module.css
│   │   │
│   │   ├── Modules/
│   │   │   ├── ModuleCard.jsx       ← Carte cliquable d'un module
│   │   │   ├── ModuleCard.module.css
│   │   │   ├── LessonCard.jsx       ← Ligne de leçon dans la liste
│   │   │   ├── LessonCard.module.css
│   │   │   ├── LessonViewer.jsx     ← Panneau de lecture d'une leçon
│   │   │   └── LessonViewer.module.css
│   │   │
│   │   ├── Quiz/
│   │   │   ├── QuizEngine.jsx       ← Orchestrateur : intro → questions → résultats
│   │   │   ├── QuizIntro.jsx        ← Écran de démarrage du quiz
│   │   │   ├── QuizQuestion.jsx     ← Affichage d'une question + options
│   │   │   ├── QuizResult.jsx       ← Écran de résultats final
│   │   │   └── Quiz.module.css      ← Styles partagés du quiz
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── StatCard.jsx         ← Carte de statistique (leçons, score…)
│   │   │   └── StatCard.module.css
│   │   │
│   │   └── Progress/
│   │       ├── ProgressRing.jsx     ← Anneau SVG de progression circulaire
│   │       └── ProgressRing.module.css
│   │
│   └── pages/
│       ├── Dashboard.jsx            ← Page d'accueil
│       ├── Dashboard.module.css
│       ├── ModulesList.jsx          ← Liste de tous les modules
│       ├── ModulesList.module.css
│       ├── ModuleDetail.jsx         ← Détail module (cours + quiz)
│       ├── ModuleDetail.module.css
│       ├── Progress.jsx             ← Suivi de progression détaillé
│       └── Progress.module.css
│
└── package.json
```

---

## Installation

### 1. Prérequis

- Node.js ≥ 16
- npm ou yarn

### 2. Cloner et installer

```bash
# Cloner le projet
git clone <url-du-repo>
cd devpath

# Installer les dépendances
npm install
```

### 3. Lancer en développement

```bash
npm start
```

L'application s'ouvre sur [http://localhost:3000](http://localhost:3000).

---

## Configuration Firebase (optionnelle)

Par défaut, DevPath utilise **localStorage** pour persister les données.

Pour activer la persistance cloud avec Firebase :

### 1. Créer un projet Firebase

1. Rendez-vous sur [https://console.firebase.google.com](https://console.firebase.google.com)
2. Créez un nouveau projet
3. Activez **Firestore Database** (mode test pour commencer)
4. Récupérez la configuration dans **Paramètres du projet → Vos applications**

### 2. Remplir `src/firebase.js`

```js
const firebaseConfig = {
  apiKey:            "VOTRE_API_KEY",
  authDomain:        "votre-projet.firebaseapp.com",
  projectId:         "votre-projet-id",
  storageBucket:     "votre-projet.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId:             "VOTRE_APP_ID"
};
```

### 3. Activer dans `src/utils/storage.js`

Décommentez les fonctions `loadProgressFirebase` et `saveProgressFirebase`,
puis mettez-les à jour dans `src/hooks/useProgress.js`.

---

## Fonctionnalités

| Fonctionnalité               | Description                                              |
|------------------------------|----------------------------------------------------------|
| 📚 Modules                   | HTML5, CSS, JavaScript, React                            |
| 📖 Fiches de cours           | Contenu Markdown avec code, tableaux, exemples          |
| 🎯 Quiz interactifs          | Questions à choix multiples, correction immédiate        |
| 📊 Scores                    | Score par quiz, meilleur score, nombre de tentatives     |
| 📈 Progression               | Suivi global (60% leçons + 40% quiz) par module          |
| 💾 Persistance               | localStorage (ou Firebase en option)                     |
| 📱 Responsive                | Sidebar mobile, grilles adaptatives                      |

---

## Ajouter du contenu

Tout le contenu est dans `src/data/modules.js`.

### Ajouter une leçon

```js
// Dans le tableau lessons d'un module existant :
{
  id: 'css-3',           // identifiant unique
  title: 'Animations',
  duration: '20 min',
  content: `## Animations CSS
...`,                    // Markdown supporté
}
```

### Ajouter une question de quiz

```js
// Dans le tableau quiz d'un module :
{
  id: 'q-css-5',
  question: "Quelle propriété CSS crée une animation ?",
  options: ['transition', 'animation', 'keyframe', 'motion'],
  correct: 1,            // index 0-based
  explanation: "La propriété animation applique une @keyframe à un élément.",
}
```

### Ajouter un module entier

Copiez la structure d'un module existant dans `MODULES` et ajustez
`id`, `title`, `icon`, `color`, `gradient`, `lessons` et `quiz`.

---

## Build production

```bash
npm run build
```

Le dossier `build/` contient les fichiers statiques prêts à déployer
sur Vercel, Netlify, Firebase Hosting, etc.

---

## Stack technique

| Technologie   | Rôle                          |
|---------------|-------------------------------|
| React 18      | UI et gestion d'état          |
| CSS Modules   | Styles scopés par composant   |
| Firebase 10   | Persistance cloud (optionnel) |
| localStorage  | Persistance locale (défaut)   |

---

*Projet réalisé dans le cadre de la formation Concepteur Développeur d'Applications.*