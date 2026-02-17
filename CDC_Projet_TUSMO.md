# Cahier des charges – Projet final DWWM  
## Application TUSMO (jeu du mot du jour)

---

## 1. Contexte et objectifs

### 1.1 Présentation du projet

**TUSMO** est un jeu de déduction de mot, inspiré du célèbre *Wordle*, dans lequel le joueur doit deviner un **mot de 5 lettres** en **6 tentatives maximum**. À chaque proposition, le jeu indique quelles lettres sont bien placées (vert), mal placées (jaune) ou absentes (gris).

Ce projet permet de mobiliser l’ensemble des compétences acquises en formation : **HTML, CSS, JavaScript**, structuration du code, **manipulation du DOM**, **gestion d’événements**, **stockage local**.

### 1.2 Objectifs pédagogiques

- Concevoir et réaliser une **application web complète** et utilisable.
- Mettre en œuvre une **architecture de code** claire (fonctions, modules si besoin).
- Gérer un **état de jeu** (tentatives, mot à trouver, historique).
- Proposer une **interface responsive** et accessible.
- Respecter un **cahier des charges** et une deadline.

---

## 2. Règles du jeu

### 2.1 Déroulement d’une partie

1. Un **mot de 5 lettres** est choisi (mot du jour ou mot aléatoire selon le mode).
2. Le joueur saisit un mot de 5 lettres et valide.
3. Pour chaque lettre de la proposition :
   - **Vert** : la lettre est dans le mot et **bien placée**.
   - **Jaune** : la lettre est dans le mot mais **mal placée**.
   - **Gris** : la lettre **n’est pas** dans le mot.
4. Le joueur dispose de **6 tentatives** maximum.
5. La partie s’arrête en cas de **mot trouvé** (victoire) ou après **6 échecs** (défaite).

### 2.2 Règles de calcul des couleurs

- Une lettre ne doit être colorée **qu’une fois** par occurrence dans le mot secret (ex. si le mot est "TASSE" et que le joueur propose "SSSAA", seules 2 S et 1 A sont prises en compte).
- Priorité : d’abord les **vertes** (bonnes positions), puis les **jaunes** (présentes mais mal placées), le reste en **gris**.

---

## 3. Spécifications fonctionnelles

### 3.1 Fonctionnalités obligatoires

| N° | Fonctionnalité | Description |
|----|----------------|-------------|
| F1 | **Grille de jeu** | Grille 6 lignes × 5 cases affichant les tentatives. |
| F2 | **Saisie du mot** | Le joueur saisit 5 lettres (clavier physique ou clavier virtuel à l’écran). |
| F3 | **Validation** | Un mot ne peut être validé que s’il comporte exactement 5 lettres et appartient à une liste de mots autorisés. |
| F4 | **Feedback visuel** | Après validation, chaque case prend la couleur correspondante (vert / jaune / gris) avec une animation si possible. |
| F5 | **Fin de partie** | Affichage d’un message de victoire ou de défaite, avec révélation du mot en cas d’échec. |
| F6 | **Mot du jour** | Un même mot pour tous les joueurs par jour (même mot pendant 24 h, basé sur la date). |
| F7 | **Nouvelle partie** | Possibilité de rejouer (nouveau mot du jour le lendemain, ou bouton « Rejouer » pour un mot aléatoire selon les choix techniques). |

### 3.2 Fonctionnalités attendues

| N° | Fonctionnalité | Description |
|----|----------------|-------------|
| F8 | **Clavier virtuel** | Clavier à l’écran reflétant les couleurs des lettres déjà utilisées (vert / jaune / gris). |
| F9 | **Responsive** | Interface utilisable sur mobile, tablette et desktop. |
| F10 | **Accessibilité** | Contraste suffisant, focus clavier, messages pour lecteurs d’écran (aria-label, rôles). |
| F11 | **Persistence** | Sauvegarde de la partie en cours (localStorage) : rechargement de la page sans perdre la grille. |
| F12 | **Statistiques** | Affichage du nombre de parties gagnées / perdues et du nombre de coups pour gagner (stockage local). |

### 3.3 Fonctionnalités bonus (optionnelles)

- **Mode difficile** : les lettres jaunes doivent être réutilisées dans les tentatives suivantes.
- **Partage du résultat** : génération d’un résumé type « TUSMO 3/6 » avec émojis (🟩🟨⬜) à copier/coller (réseaux sociaux).
- **Thème sombre / clair** avec persistance du choix.
- **Animation** à la validation de la ligne (flip, shake en cas de mot invalide).
- **Son** (optionnel) : petit son à la validation ou en fin de partie.

---

## 4. Spécifications techniques

### 4.1 Stack technique imposée (minimum)

- **HTML5** sémantique.
- **CSS3** : mise en page (Flexbox/Grid), responsive, pas de framework obligatoire (Bootstrap autorisé si maîtrisé).
- **JavaScript** vanilla (pas de framework type React/Vue imposé pour ce projet).

### 4.2 Contraintes techniques

- **Liste de mots** : fournir un fichier (JSON ou JS) contenant des mots de 5 lettres en français. Le mot du jour peut être dérivé de la date (ex. index = jour de l’année % nombre de mots).
- **Navigateur** : l’application doit fonctionner dans les dernières versions de Chrome, Firefox, Safari ou Edge.
- **Pas de backend obligatoire** : tout peut être fait en front (mot du jour déterministe à partir de la date, stockage en localStorage). Un backend (PHP, Node, etc.) peut être proposé en bonus pour une liste de mots dynamique ou des statistiques multi-appareils.

### 4.3 Structure de projet recommandée

```
tusmo/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js          (point d’entrée, initialisation)
│   ├── game.js         (logique du jeu : vérification mot, couleurs)
│   ├── grid.js         (affichage grille, mise à jour des cases)
│   ├── keyboard.js     (clavier virtuel si présent)
│   └── storage.js      (localStorage : sauvegarde partie, stats)
├── data/
│   └── mots.json       (liste des mots de 5 lettres)
└── README.md
```

Une autre découpe (un seul fichier JS bien commenté, ou plus de modules) est acceptée si claire et maintenable.

---

## 5. Livrables et évaluation

### 5.1 Livrables à remettre

1. **Code source** : dépôt Git (GitHub, GitLab, etc.) ou archive (ZIP) contenant tous les fichiers du projet.
2. **README.md** : 
   - titre du projet et nom des participants ;
   - instructions pour lancer le projet (ouvrir `index.html` ou commande de serveur) ;
   - éventuellement capture d’écran ou lien vers une démo en ligne.
3. **Démo** : projet déployé en ligne (Netlify, Vercel, GitHub Pages, etc.) ou démo en présentiel. (optionnel)

---

## 6. Ressources et contraintes

### 6.1 Liste de mots

- Les étudiants peuvent construire une liste de mots de 5 lettres à partir de dictionnaires libres (liste française).
- Une liste minimale de mots est recommandée pour varier le mot du jour.
- Différenciation possible : une liste pour les **mots à deviner** (mot du jour) et une liste plus large pour **valider** que la proposition du joueur est un mot autorisé.

### 6.2 Références

- [TUSMO (jeu en ligne)](https://www.tusmo.xyz/) – référence métier.
- [Wordle](https://www.nytimes.com/games/wordle/) – référence gameplay.
- MDN (JavaScript, DOM, localStorage) pour la documentation technique.

### 6.3 Contraintes déontologiques

- Pas de copie de code d’un autre projet sans citation.
- Réutilisation de listes de mots sous licence libre autorisée (citer la source dans le README).
- Projet individuel sauf indication contraire du formateur (travail en binôme possible si précisé).

---

## 7. Résumé des attendus

Livrer une **application TUSMO jouable** qui :

- Respecte les **règles du jeu** (5 lettres, 6 coups, couleurs vert/jaune/gris).
- Propose un **mot du jour** reproductible (même mot pour une même date).
- Offre une **interface claire**, **responsive** et si possible **accessible**.
- Sauvegarde la **partie en cours** et affiche des **statistiques** simples.
- S’appuie sur un **code structuré** et un **dépôt / README** propres.

---