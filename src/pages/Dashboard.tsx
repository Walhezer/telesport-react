import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { HeaderComponent, type Indicator } from '../components/HeaderComponent';
import { MedalPieChart } from '../components/MedalPieChart';

export const Dashboard: FC = () => {
  const { data, isLoading, error } = useData();
  const navigate = useNavigate();

  if (isLoading) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center text-2xl">Chargement des données...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 text-red-500 flex justify-center items-center text-2xl">{error}</div>;
  if (!data) return null;

  const indicators: Indicator[] = [
    { label: 'Pays participants', value: data.length },
    { label: 'Éditions des JO', value: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderComponent title="Historique des Jeux Olympiques - TéléSport" indicators={indicators} />
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-4">
          <MedalPieChart data={data} onCountryClick={(id) => navigate(`/country/${id}`)} />
        </div>

        <div className="text-sm text-gray-400 text-center">
          <p>Cliquez sur la part d'un pays pour voir ses détails</p>
        </div>
      </div>
    </div>
  );
};