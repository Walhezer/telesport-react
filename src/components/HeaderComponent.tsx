import { type FC } from 'react';

export interface Indicator {
  label: string;
  value: string | number;
}

interface HeaderProps {
  title: string;
  indicators: Indicator[];
}

export const HeaderComponent: FC<HeaderProps> = ({ title, indicators }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {indicators.map((indicator, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex-1 max-w-sm border-2 border-teal-600">
            <h3 className="text-xl font-semibold mb-2">{indicator.label}</h3>
            <p className="text-4xl font-bold">{indicator.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};