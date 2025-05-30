import React from 'react';
import { FilmIcon, RefreshCwIcon, TrophyIcon } from 'lucide-react';

interface GameOverProps {
  status: 'won' | 'lost';
  movie: string;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ status, movie, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 animate-fadeInUp">
      {status === 'won' ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <TrophyIcon className="w-16 h-16 text-yellow-400 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">You Won!</h2>
          <p className="text-xl mb-4">The movie was:</p>
          <p className="text-2xl font-bold mb-6 text-yellow-300">{movie}</p>
          <div className="my-4 p-4 bg-purple-800 rounded-lg opacity-90">
            <p className="text-sm md:text-base">
              Fun fact: "{movie}" is a well-known Bollywood classic. How many more can you guess?
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FilmIcon className="w-16 h-16 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-red-400 mb-4">Game Over</h2>
          <p className="text-xl mb-4">The movie was:</p>
          <p className="text-2xl font-bold mb-6 text-yellow-300">{movie}</p>
          <div className="my-4 p-4 bg-purple-800 rounded-lg opacity-90">
            <p className="text-sm md:text-base">
              This Bollywood gem slipped away! Try again with another movie title.
            </p>
          </div>
        </div>
      )}
      
      <button
        onClick={onRestart}
        className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <RefreshCwIcon className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
};

export default GameOver;