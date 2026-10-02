import { type FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { HeaderComponent, type Indicator } from '../components/HeaderComponent';
import { MedalLineChart } from '../components/MedalLineChart';

/**
 * Page de détail d'un pays affichant ses statistiques olympiques et l'évolution chronologique de ses médailles.
 * Intercepte les ID invalides dans l'URL pour rediriger l'utilisateur vers la page 404.
 *
 * @returns {JSX.Element | null} La vue détaillée du pays ou null pendant le processus de redirection/chargement.
 */
export const CountryDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useData();

  useEffect(() => {
    if (!isLoading && !error && data) {
      const countryExists = data.find((c) => c.id === Number(id));
      if (!countryExists) {
        navigate('/404', { replace: true });
      }
    }
  }, [id, data, isLoading, error, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500" role="status"></div>
      </div>
    );
  }

  if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex justify-center items-center text-2xl">{error}</div>;
  if (!data) return null;

  const country = data.find((c) => c.id === Number(id));
  if (!country) return null;

  const indicators: Indicator[] = [
    { label: 'Participations', value: country.participations.length },
    { label: 'Total médailles', value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0) },
    { label: 'Total athlètes', value: country.participations.reduce((sum, p) => sum + p.athleteCount, 0) },
  ];

  const sortedParticipations = [...country.participations].sort((a, b) => a.year - b.year);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <main className="max-w-6xl mx-auto grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">

        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-2">
          <button
            onClick={() => navigate('/')}
            className="text-teal-400 hover:text-teal-300 flex items-center font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1"
            aria-label="Retour au tableau de bord"
          >
            &larr; Retour au Dashboard
          </button>
        </div>

        <HeaderComponent title={country.name} indicators={indicators} />

        <section className="col-span-4 md:col-span-8 lg:col-span-12 bg-gray-800 p-4 md:p-8 rounded-lg shadow-xl mb-4">
          <div className="sr-only">Graphique d'évolution des médailles pour {country.name}</div>
          <div className="relative h-[400px] w-full">
            <MedalLineChart participations={sortedParticipations} />
          </div>
        </section>

      </main>
    </div>
  );
};