import { type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { HeaderComponent, type Indicator } from '../components/HeaderComponent';
import { MedalLineChart } from '../components/MedalLineChart';

export const CountryDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useData();

  if (isLoading) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center text-2xl">Chargement des données...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex justify-center items-center text-2xl">{error}</div>;
  if (!data) return null;

  const country = data.find((c) => c.id === Number(id));

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Pays introuvable</h2>
        <button onClick={() => navigate('/')} className="bg-teal-600 px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors font-semibold">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const indicators: Indicator[] = [
    { label: 'Participations', value: country.participations.length },
    { label: 'Total médailles', value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0) },
    { label: 'Total athlètes', value: country.participations.reduce((sum, p) => sum + p.athleteCount, 0) },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="mb-6 text-teal-400 hover:text-teal-300 flex items-center font-semibold">
          &larr; Retour au Dashboard
        </button>
        
        <HeaderComponent title={country.name} indicators={indicators} />
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <MedalLineChart participations={country.participations} />
        </div>
      </div>
    </div>
  );
};