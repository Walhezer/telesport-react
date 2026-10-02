import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { HeaderComponent, type Indicator } from '../components/HeaderComponent';
import { MedalPieChart } from '../components/MedalPieChart';

/**
 * Composant principal de l'application affichant le tableau de bord.
 * Gère le cycle de vie des données (chargement, erreur) et affiche les statistiques 
 * globales ainsi qu'un graphique interactif de répartition des médailles.
 * 
 * @returns {JSX.Element} La vue du tableau de bord ou un écran d'état (chargement/erreur).
 */
export const Dashboard: FC = () => {
  const { data, isLoading, error } = useData();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500"
          role="status"
          aria-label="Chargement des données"
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center gap-4 p-4 text-center">
        <p className="text-xl font-bold text-red-500" role="alert">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400"
          aria-label="Recharger la page"
        >
          Retour et réessayer
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-400" role="status">Aucune donnée</p>
      </div>
    );
  }

  const indicators: Indicator[] = [
    { label: 'Pays participants', value: data.length },
    { label: 'Éditions des JO', value: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <main className="max-w-6xl mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
        
        <HeaderComponent title="Historique des Jeux Olympiques - TéléSport" indicators={indicators} />
        
        <section className="col-span-4 md:col-span-8 lg:col-span-12 bg-gray-800 p-4 md:p-8 rounded-lg shadow-xl mb-4">
          <div className="sr-only">
            Graphique en camembert représentant la répartition totale des médailles olympiques par pays.
          </div>
          <div className="relative h-[400px] w-full flex justify-center">
            <MedalPieChart data={data} onCountryClick={(id) => navigate(`/country/${id}`)} />
          </div>
        </section>

        <div className="col-span-4 md:col-span-8 lg:col-span-12 text-sm text-gray-400 text-center">
          <p>Cliquez sur la part d'un pays pour voir ses détails</p>
        </div>
        
      </main>
    </div>
  );
};