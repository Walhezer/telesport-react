# Notes d'Architecture - Refonte front-end TéléSport

## 1. Analyse de l'existant et problèmes identifiés

1. Fichier Monolithique (Architecture et Structure)

- Le fichier App.tsx est un composant "fourre-tout" : il contient à la fois le routeur (App), la page d'accueil (Home), la page de détail (Country), 
ainsi que le registre de configuration Chart.js.

- Le composant de la page détail (Country) est déclaré dans le fichier mais n'est pas appelé dans le routeur <Routes>.   

2. Gestion des données et Side Effects

- Données en dur : Le tableau olympicsData est codé en dur directement dans le fichier au lieu d'être géré par un service ou un hook dédié.

- Logique métier dans la vue : Les fonctions de calcul (ex: calculateTotalMedals) et la préparation des objets complexes pour les graphiques (chartData, evolutionData) sont mélangées au rendu du composant, ce qui va à l'encontre du principe de séparation des responsabilités.

- Mauvais usage du useEffect : Le composant Home gère lui-même la logique de simulation d'appel API avec un setTimeout dans un useEffect. Cela devrait être extrait dans un Custom Hook.

- État de chargement fragile : L'état de chargement est déduit de la valeur des données (if (!data)) au lieu d'avoir un véritable état isLoading dédié.

3. Dette Technique et Typage (TypeScript)

- Violation de TypeScript : Le type any est utilisé partout à la place d'interfaces strictes (ex: const olympicsData: any, useState<any>). 
Cela rend le code propice aux erreurs et annule l'intérêt de TypeScript.

- Code résiduel : Il y a de nombreux console.log oubliés dans le code (ex: console.log('App rendered'), console.log('Loading country with id:', id)) qu'il faut supprimer.

4. Interface et Composants Visuels

- Code UI dupliqué : Le code HTML/Tailwind des cartes d'indicateurs (les blocs affichant les chiffres comme "Pays participants" ou "Total médailles") est répété à l'identique dans Home et dans Country. Il manque un composant réutilisable pour respecter le principe DRY (Don't Repeat Yourself).


## 2. Nouvelle architecture proposée

### Schéma de l'arborescence

src/
 ├── components/       # Composants d'affichage
 │    └── HeaderComponent.tsx
 ├── pages/            # Composants conteneurs
 │    ├── Dashboard.tsx
 │    └── CountryDetail.tsx
 ├── hooks/            # Logique de récupération des données
 │    └── useData.ts
 ├── models/           # Définitions des types TypeScript
 │    └── Olympic.ts
 ├── index.css         # Styles globaux
 ├── App.tsx           # Routeur principal de l'application
 └── main.tsx          # Point d'entrée de l'application

## Améliorations apportées 

1. Pattern "Container / Presenter" (Composants Smart vs Dumb)

- Composants conteneurs (Pages) : Dashboard et CountryDetail sont des composants dits "intelligents". Ils ont pour seule responsabilité de récupérer les données (via les hooks) et de gérer les états de la page (chargement, erreur).

- Composants d'affichage (UI) : HeaderComponent est un composant "stupide" et purement visuel. Il prend des paramètres d'entrée (props) et se contente de faire de l'affichage.

- Amélioration : Cela rend le code hautement réutilisable (le HeaderComponent servira sur les deux pages) et facilite la maintenance, car la logique métier n'est plus mélangée à l'UI.

2. Pattern "Custom Hook" (Séparation composant/hook)

- La logique de données (le tableau statique, le setTimeout, et la gestion des états de chargement) est encapsulée dans le Custom Hook useData.

- Amélioration : Les composants visuels n'ont plus à se soucier de comment les données sont récupérées. Ils se contentent d'appeler const { data, loading } = useData(). Cela allège considérablement les fichiers des pages.

