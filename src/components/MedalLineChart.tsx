import { type FC } from 'react';
import { Line } from 'react-chartjs-2';
import { type Participation } from '../models/Olympic';

interface MedalLineChartProps {
  participations: Participation[];
}

export const MedalLineChart: FC<MedalLineChartProps> = ({ participations }) => {
  const evolutionData = {
    labels: participations.map((p) => p.year.toString()),
    datasets: [
      {
        label: 'Nombre de médailles',
        data: participations.map((p) => p.medalsCount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const evolutionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { color: 'white' } },
    },
    scales: {
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Line data={evolutionData} options={evolutionOptions} />
    </div>
  );
};