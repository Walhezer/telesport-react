import { type FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * Page d'erreur 404 affichée lorsqu'une route demandée n'existe pas.
 * Propose une interface de secours avec un bouton pour rediriger l'utilisateur vers l'accueil.
 * 
 * @returns {JSX.Element} La vue de la page introuvable.
 */
export const NotFound: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4 text-center">
      <h1 className="text-7xl font-bold text-teal-500 mb-4 tracking-widest">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page introuvable</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Oups ! La page que vous essayez de consulter n'existe pas ou a été déplacée.
      </p>
      
      <Link 
        to="/" 
        className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-500 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-400"
        aria-label="Retourner à la page d'accueil"
      >
        Retour au Dashboard
      </Link>
    </div>
  );
};