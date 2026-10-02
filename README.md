# TéléSport - Historique des Jeux Olympiques

Application web interactive développée pour TéléSport permettant de visualiser les statistiques et l'historique des performances des pays aux Jeux Olympiques.

## Fonctionnalités

- **Tableau de bord interactif** : Vue globale des pays participants et répartition des médailles.
- **Détails par pays** : Statistiques spécifiques (participations, total de médailles, athlètes) et évolution chronologique des résultats.
- **Visualisation de données** : Intégration de graphiques dynamiques avec Chart.js.
- **Responsive Design** : Interface optimisée pour Desktop et Mobile (approche Mobile-first).
- **Navigation SPA fluide** : Routage côté client sécurisé avec page d'erreur 404 (React Router).

## Stack Technique & Choix Architecturaux

- **React 19 & TypeScript** : Typage strict pour éviter les erreurs d'exécution (zéro `any`).
- **Tailwind CSS 4** : Utilisation du système de grille (Grid) pour un responsive design robuste et maintien d'un thème sombre cohérent.
- **Vite 5** : Outil de build ultra-rapide.
- **Chart.js & React-Chartjs-2** : Rendu optimisé des graphiques en camembert et en courbes.

## Prérequis

- **Node.js** 22 LTS (ou supérieur)
- **npm** (inclus avec Node.js)

## Installation et Lancement

1. Cloner le dépôt :
```bash
git clone https://github.com/Walhezer/telesport-react.git
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```
L'application sera accessible sur http://localhost:5173

## Architecture du Projet

Le code a été refactorisé pour suivre une architecture modulaire garantissant la séparation des responsabilités :

```text
src/
├── components/      # Composants UI réutilisables (HeaderComponent, graphiques)
├── pages/           # Vues principales de l'application (Dashboard, CountryDetail, NotFound)
├── hooks/           # Logique métier et centralisation des appels de données (useData)
├── models/          # Interfaces TypeScript pour le typage strict des données
├── App.tsx          # Configuration du routage principal
└── main.tsx         # Point d'entrée de l'application

Gestion des Données

L'application utilise actuellement un mock de données (olympicsData) pour simuler les statistiques. La logique de récupération est centralisée dans un Custom Hook (useData), ce qui permettra plus tard une transition transparente vers une véritable API REST sans modifier l'interface utilisateur.

Aperçus de l'interface

Desktop : ./docs/desktop.png

Mobile : ./docs/mobile.png

Développé dans le cadre du projet TéléSport - OpenClassrooms
