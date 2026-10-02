import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Dashboard } from './pages/Dashboard';
import { CountryDetail } from './pages/CountryDetail';
import { NotFound } from './pages/NotFound'; 

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
);

/**
 * Composant racine de l'application.
 * Initialise les paramètres globaux.
 * Définit l'arborescence du routage côté client.
 * 
 * @returns {JSX.Element} Le routeur principal englobant toutes les vues de l'application.
 */
export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/country/:id" element={<CountryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};