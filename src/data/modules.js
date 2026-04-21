// src/data/modules.js
// Contenu pédagogique complet de DevPath

const MODULES = [
  // ─── HTML5 ────────────────────────────────────────────────────────────────
  {
    id: 'html',
    title: 'HTML5',
    icon: '⟨/⟩',
    color: '#E34F26',
    gradient: 'linear-gradient(135deg, #E34F26 0%, #ef7d55 100%)',
    description: 'Les fondations du web : structure, sémantique, accessibilité.',
    lessons: [
      {
        id: 'html-1',
        title: 'Structure de base',
        duration: '15 min',
        content: `## Structure de base HTML5

Un document HTML5 suit une structure stricte et sémantique.

\`\`\`html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon site</title>
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </body>
</html>
\`\`\`

### Points clés
- **DOCTYPE** : déclare la version HTML
- **lang** : important pour l'accessibilité et le SEO
- **charset UTF-8** : support des caractères spéciaux
- **viewport** : indispensable pour le responsive

### Balises sémantiques
| Balise | Rôle |
|--------|------|
| \`<header>\` | En-tête de page ou section |
| \`<nav>\` | Navigation principale |
| \`<main>\` | Contenu principal |
| \`<article>\` | Contenu autonome |
| \`<section>\` | Section thématique |
| \`<aside>\` | Contenu secondaire |
| \`<footer>\` | Pied de page |`,
      },
      {
        id: 'html-2',
        title: 'Formulaires & Accessibilité',
        duration: '20 min',
        content: `## Formulaires HTML5

Les formulaires permettent la collecte de données utilisateur.

\`\`\`html
<form action="/submit" method="POST">
  <label for="name">Nom :</label>
  <input type="text" id="name" name="name" required
         placeholder="Jean Dupont" autocomplete="name">

  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required>

  <label for="age">Âge :</label>
  <input type="number" id="age" min="1" max="120">

  <button type="submit">Envoyer</button>
</form>
\`\`\`

### Types d'input HTML5
- \`text\`, \`email\`, \`password\`, \`number\`
- \`date\`, \`time\`, \`color\`, \`range\`
- \`checkbox\`, \`radio\`, \`file\`
- \`search\`, \`tel\`, \`url\`

### Accessibilité (a11y)
- Toujours lier **\`<label>\`** à **\`<input>\`** via \`for\`/\`id\`
- Utiliser \`aria-label\` quand pas de label visible
- Ajouter \`role\` et attributs ARIA si besoin
- Contraste suffisant (ratio ≥ 4.5:1)`,
      },
    ],
    quiz: [
      {
        id: 'q-html-1',
        question: 'Quelle balise HTML5 est utilisée pour le contenu principal d\'une page ?',
        options: ['<content>', '<main>', '<body>', '<section>'],
        correct: 1,
        explanation: '<main> représente le contenu principal de la page. Il ne doit apparaître qu\'une seule fois par document.',
      },
      {
        id: 'q-html-2',
        question: 'Quel attribut rend un champ de formulaire obligatoire ?',
        options: ['mandatory', 'obligatory', 'required', 'needed'],
        correct: 2,
        explanation: "L'attribut 'required' rend un champ obligatoire et déclenche une validation native du navigateur.",
      },
      {
        id: 'q-html-3',
        question: 'Quel est le bon DOCTYPE pour HTML5 ?',
        options: ['<!DOCTYPE HTML5>', '<!DOCTYPE html>', "<html version='5'>", '<!HTML5>'],
        correct: 1,
        explanation: '<!DOCTYPE html> est la déclaration DOCTYPE simplifiée d\'HTML5.',
      },
      {
        id: 'q-html-4',
        question: 'Quelle balise est sémantiquement correcte pour une barre de navigation ?',
        options: ["<div class='nav'>", '<navigation>', '<nav>', '<menu>'],
        correct: 2,
        explanation: '<nav> est la balise sémantique dédiée à la navigation principale.',
      },
    ],
  },

  // ─── CSS ──────────────────────────────────────────────────────────────────
  {
    id: 'css',
    title: 'CSS',
    icon: '✦',
    color: '#264DE4',
    gradient: 'linear-gradient(135deg, #264DE4 0%, #5b78ea 100%)',
    description: 'Mise en forme, animations, Flexbox, Grid et responsive design.',
    lessons: [
      {
        id: 'css-1',
        title: 'Flexbox',
        duration: '25 min',
        content: `## CSS Flexbox

Flexbox est un modèle de mise en page unidimensionnel.

\`\`\`css
.container {
  display: flex;
  flex-direction: row;        /* row | column | row-reverse */
  justify-content: center;   /* alignement axe principal */
  align-items: center;       /* alignement axe secondaire */
  flex-wrap: wrap;           /* retour à la ligne */
  gap: 1rem;                 /* espacement */
}

.item {
  flex: 1;           /* raccourci flex-grow flex-shrink flex-basis */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  align-self: flex-end;
}
\`\`\`

### justify-content
| Valeur | Effet |
|--------|-------|
| \`flex-start\` | Début de l'axe |
| \`flex-end\` | Fin de l'axe |
| \`center\` | Centré |
| \`space-between\` | Espace entre les éléments |
| \`space-around\` | Espace autour |
| \`space-evenly\` | Espace égal |

### Cas d'usage parfaits
- Navigation horizontale
- Centrage vertical/horizontal
- Cartes en ligne avec espacement égal`,
      },
      {
        id: 'css-2',
        title: 'CSS Grid',
        duration: '25 min',
        content: `## CSS Grid

Grid est un modèle de mise en page bidimensionnel.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

.item-large {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

### Unités utiles
- \`fr\` : fraction de l'espace disponible
- \`minmax(min, max)\` : taille min/max
- \`auto-fit\` + \`minmax\` : responsive sans media queries

\`\`\`css
/* Grille responsive magique */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
\`\`\``,
      },
    ],
    quiz: [
      {
        id: 'q-css-1',
        question: 'Quelle propriété CSS active le modèle Flexbox ?',
        options: ['display: block', 'display: flex', 'position: flex', 'flex: true'],
        correct: 1,
        explanation: 'display: flex transforme un élément en conteneur flex.',
      },
      {
        id: 'q-css-2',
        question: 'Comment centrer un élément verticalement ET horizontalement en Flexbox ?',
        options: [
          'align: center center',
          'center: both',
          'justify-content: center; align-items: center',
          'margin: auto',
        ],
        correct: 2,
        explanation:
          'justify-content: center aligne sur l\'axe principal, align-items: center sur l\'axe secondaire.',
      },
      {
        id: 'q-css-3',
        question: 'Quelle unité CSS est spécifique à Grid ?',
        options: ['px', 'em', 'fr', '%'],
        correct: 2,
        explanation:
          "L'unité 'fr' (fraction) est spécifique à CSS Grid et représente une fraction de l'espace disponible.",
      },
      {
        id: 'q-css-4',
        question: 'Quel sélecteur CSS cible le premier enfant d\'un élément ?',
        options: [':first-child', ':first', '::first', '.first'],
        correct: 0,
        explanation:
          ':first-child est une pseudo-classe qui cible le premier enfant de son parent.',
      },
    ],
  },

  // ─── JAVASCRIPT ───────────────────────────────────────────────────────────
  {
    id: 'js',
    title: 'JavaScript',
    icon: 'JS',
    color: '#F7A800',
    gradient: 'linear-gradient(135deg, #F7A800 0%, #F7DF1E 100%)',
    description: 'Variables, fonctions, DOM, events, async/await et ES6+.',
    lessons: [
      {
        id: 'js-1',
        title: 'ES6+ Fondamentaux',
        duration: '30 min',
        content: `## JavaScript ES6+

### Variables
\`\`\`js
const PI = 3.14;       // valeur non réassignable
let count = 0;         // portée de bloc
count++;

// Déstructuration
const { name, age } = user;
const [first, ...rest] = array;

// Template literals
const msg = \`Bonjour \${name}, tu as \${age} ans.\`;
\`\`\`

### Fonctions
\`\`\`js
// Arrow function
const add = (a, b) => a + b;

// Paramètres par défaut
const greet = (name = 'World') => \`Hello \${name}!\`;

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
\`\`\`

### Spread & Méthodes tableau
\`\`\`js
const merged = [...arr1, ...arr2];

const doubled = numbers.map(n => n * 2);
const evens   = numbers.filter(n => n % 2 === 0);
const total   = numbers.reduce((acc, n) => acc + n, 0);
const found   = numbers.find(n => n > 10);

// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const name = user.name ?? 'Anonyme';
\`\`\``,
      },
      {
        id: 'js-2',
        title: 'Asynchrone & Promises',
        duration: '30 min',
        content: `## JavaScript Asynchrone

### Promises
\`\`\`js
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'Alice' });
      else reject(new Error('Invalid ID'));
    }, 1000);
  });
};
\`\`\`

### Async / Await
\`\`\`js
const getUser = async (id) => {
  try {
    const user = await fetchUser(id);
    console.log(user.name);
    return user;
  } catch (error) {
    console.error('Erreur :', error.message);
  }
};
\`\`\`

### Fetch API
\`\`\`js
const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
};

// Promise.all : requêtes en parallèle
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
\`\`\``,
      },
    ],
    quiz: [
      {
        id: 'q-js-1',
        question: 'Quelle méthode de tableau retourne un nouveau tableau transformé ?',
        options: ['forEach()', 'filter()', 'map()', 'find()'],
        correct: 2,
        explanation:
          'map() retourne un nouveau tableau avec chaque élément transformé par la fonction callback.',
      },
      {
        id: 'q-js-2',
        question: "Qu'est-ce qu'une Promise en JavaScript ?",
        options: [
          'Un type de variable',
          'Une fonction synchrone',
          'Un objet représentant une valeur future',
          'Une boucle asynchrone',
        ],
        correct: 2,
        explanation:
          'Une Promise représente une valeur qui peut être disponible maintenant, dans le futur, ou jamais.',
      },
      {
        id: 'q-js-3',
        question: "Quel opérateur permet l'accès sécurisé aux propriétés imbriquées ?",
        options: ['&&', '||', '??', '?.'],
        correct: 3,
        explanation:
          "L'optional chaining (?.) évite les erreurs si une propriété intermédiaire est null ou undefined.",
      },
      {
        id: 'q-js-4',
        question: 'Quelle est la différence entre let et const ?',
        options: [
          'Aucune différence',
          'const ne peut pas être réassigné, let peut l\'être',
          'let est global, const est local',
          'const est pour les nombres, let pour les chaînes',
        ],
        correct: 1,
        explanation:
          'const empêche la réassignation de la variable (mais un objet référencé peut être muté).',
      },
    ],
  },

  // ─── REACT ────────────────────────────────────────────────────────────────
  {
    id: 'react',
    title: 'React',
    icon: '⚛',
    color: '#61DAFB',
    gradient: 'linear-gradient(135deg, #0f6b8a 0%, #61DAFB 100%)',
    description: 'Composants, hooks, state management et cycle de vie.',
    lessons: [
      {
        id: 'react-1',
        title: 'Composants & Props',
        duration: '25 min',
        content: `## React — Composants & Props

### Composant fonctionnel
\`\`\`jsx
const Greeting = ({ name, age }) => (
  <div className="greeting">
    <h1>Bonjour, {name}!</h1>
    <p>Tu as {age} ans.</p>
  </div>
);

// Utilisation
<Greeting name="Alice" age={25} />
\`\`\`

### Props avancées
\`\`\`jsx
const Button = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false
}) => (
  <button
    className={\`btn btn-\${variant}\`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Children prop
const Card = ({ title, children }) => (
  <div className="card">
    <h2>{title}</h2>
    <div className="card-body">{children}</div>
  </div>
);
\`\`\`

### Listes & Clés
\`\`\`jsx
const List = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
\`\`\``,
      },
      {
        id: 'react-2',
        title: 'Hooks essentiels',
        duration: '35 min',
        content: `## React Hooks

### useState
\`\`\`jsx
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
    </div>
  );
};
\`\`\`

### useEffect
\`\`\`jsx
import { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const data = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
      setUser(data);
      setLoading(false);
    };
    fetchUser();

    return () => { /* cleanup */ };
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  return <div>{user?.name}</div>;
};
\`\`\`

### Hook personnalisé
\`\`\`jsx
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? defaultValue
  );

  const setStored = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStored];
};
\`\`\``,
      },
    ],
    quiz: [
      {
        id: 'q-react-1',
        question: "Quel hook React est utilisé pour gérer l'état local d'un composant ?",
        options: ['useEffect', 'useState', 'useRef', 'useContext'],
        correct: 1,
        explanation:
          'useState permet de déclarer une variable d\'état et une fonction pour la modifier.',
      },
      {
        id: 'q-react-2',
        question: 'Pourquoi doit-on fournir une clé (key) dans les listes React ?',
        options: [
          'C\'est obligatoire syntaxiquement',
          'Pour le style CSS',
          'Pour que React identifie les éléments et optimise les re-renders',
          "Pour l'accessibilité",
        ],
        correct: 2,
        explanation:
          'Les clés permettent à React d\'identifier quels éléments ont changé, été ajoutés ou supprimés.',
      },
      {
        id: 'q-react-3',
        question: 'Quand s\'exécute useEffect avec un tableau de dépendances vide [] ?',
        options: [
          'À chaque render',
          'Une seule fois au montage du composant',
          'Jamais',
          'À chaque changement de state',
        ],
        correct: 1,
        explanation:
          'useEffect avec [] s\'exécute une seule fois après le premier rendu, équivalent à componentDidMount.',
      },
      {
        id: 'q-react-4',
        question: 'Comment passer des données d\'un composant parent à un enfant ?',
        options: ["Via l'état global", 'Via les props', 'Via useEffect', 'Via localStorage'],
        correct: 1,
        explanation:
          'Les props (propriétés) permettent le passage de données du composant parent vers l\'enfant.',
      },
    ],
  },
];

export default MODULES;