import { type FC } from 'react';
import { Pie } from 'react-chartjs-2';
import { type Olympic } from '../models/Olympic';

interface MedalPieChartProps {
  data: Olympic[];
  onCountryClick: (countryId: number) => void;
}

export const MedalPieChart: FC<MedalPieChartProps> = ({ data, onCountryClick }) => {
  const calculateTotalMedals = (country: Olympic) => {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  };

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: 'Total des médailles',
        data: data.map((d) => calculateTotalMedals(d)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: 'white' } },
    },
    onClick: (_event: unknown, elements: { index: number }[]) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        onCountryClick(data[dataIndex].id);
      }
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};