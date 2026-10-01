import { type FC } from 'react';

export interface Indicator {
  label: string;
  value: number | string;
}

interface HeaderProps {
  title: string;
  indicators: Indicator[];
}

export const HeaderComponent: FC<HeaderProps> = ({ title, indicators }) => {
  return (
    <header className="col-span-4 md:col-span-8 lg:col-span-12 mb-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-white mb-8">
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {indicators.map((indicator, index) => (
          <div 
            key={index} 
            className="border-2 border-teal-600 rounded-lg p-6 text-center w-full max-w-sm"
            aria-label={`Indicateur : ${indicator.label}, valeur : ${indicator.value}`}
          >
            <p className="text-white text-lg font-semibold mb-2">{indicator.label}</p>
            <p className="text-4xl font-bold text-white">{indicator.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
};