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

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/country/:id" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};