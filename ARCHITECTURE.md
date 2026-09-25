# Documentation d'Architecture Front-End - TéléSport

Ce document décrit l'architecture technique mise en place pour l'application front-end TéléSport dédiée à l'historique des Jeux Olympiques. 
Le projet suit une architecture modulaire basée sur la séparation des responsabilités.

## 1. Arborescence du Projet

La base de code (dossier `src/`) est structurée par type de responsabilité technique et fonctionnelle :

src/
 ├── components/       # Composants de présentation (Dumb Components)
 │    ├── HeaderComponent.tsx
 │    ├── MedalLineChart.tsx
 │    └── MedalPieChart.tsx
 ├── hooks/            # Logique métier et accès aux données (Custom Hooks)
 │    └── useData.ts
 ├── models/           # Définitions des types et interfaces TypeScript
 │    └── Olympic.ts
 ├── pages/            # Vues principales de l'application (Smart Components)
 │    ├── CountryDetail.tsx
 │    └── Dashboard.tsx
 ├── App.tsx           # Configuration du routage (react-router-dom)
 ├── index.css         # Styles globaux
 └── main.tsx          # Point d'entrée de l'application React


2. Architecture des Composants (Smart vs Dumb)
Le projet applique le pattern Container / Presenter pour isoler la logique métier de l'interface utilisateur.

-- Les Vues Conteneurs ("Smart Components")

Localisés dans src/pages/, ces composants gèrent l'état global de la page et la logique métier.

Dashboard (Page d'accueil) : Appelle le hook de données pour récupérer l'ensemble des pays, calcule les indicateurs globaux (KPI) et injecte ces données dans les composants d'affichage.

CountryDetail (Page détail) : Récupère l'ID du pays via les paramètres de l'URL (useParams), filtre les données reçues depuis le hook pour cibler le bon pays, et gère le cas d'erreur si l'ID est invalide.

-- Les Composants de Présentation ("Dumb Components")

Localisés dans src/components/, ces composants ne se préoccupent pas de savoir d'où viennent les données.
Ils reçoivent les informations exclusivement via leurs props et se contentent de les afficher.

HeaderComponent : Affiche le titre de la page et itère dynamiquement sur une liste d'indicateurs (label/valeur) pour un rendu uniforme sur toutes les pages.

MedalPieChart & MedalLineChart : Encapsulent la configuration et le rendu complexe de react-chartjs-2, allégeant ainsi le code des vues conteneurs.

3. Gestion des Données (Custom Hook useData)
La totalité de l'accès aux données est centralisée dans le hook src/hooks/useData.ts.

Rôles de ce hook :

Single Source of Truth : Il stocke et distribue les données olympicsData à l'ensemble de l'application. Les composants visuels n'ont plus aucune donnée codée en dur.

Gestion du cycle de vie de la requête : Il expose trois états distincts gérés par useState :

data : les données formatées et typées prêtes à l'emploi.

isLoading : un booléen permettant aux vues conteneurs d'afficher un écran de chargement (ex: le temps de la requête).

error : un message d'erreur si la récupération échoue, permettant un retour visuel à l'utilisateur.

4. Préparation à l'intégration Back-end (API REST)
L'architecture actuelle est conçue pour basculer facilement d'un jeu de données statique (mock) vers une véritable API REST sans impacter l'interface utilisateur.

Puisque les composants React (Smart et Dumb) dépendent uniquement de l'interface de retour du hook { data, isLoading, error }, ils n'ont aucune connaissance de la façon dont les données sont récupérées.

Lors de l'implémentation du back-end, seul le fichier useData.ts nécessitera d'être modifié. Le délai simulé (setTimeout) et le tableau local seront remplacés par un véritable appel réseau (via fetch ou axios vers l'endpoint de l'API), rendant l'application front-end instantanément fonctionnelle avec le serveur distant.