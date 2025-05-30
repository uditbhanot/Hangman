import React from 'react';
import { FilmIcon } from 'lucide-react';

interface HeaderProps {
  score: number;
  highScore: number;
}

const Header: React.FC<HeaderProps> = ({ score, highScore }) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <FilmIcon className="w-8 h-8 text-yellow-400 mr-3" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 tracking-wide">
            Hangman
          </h1>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-purple-800 px-4 py-2 rounded-md">
            <p className="text-sm text-yellow-300 font-semibold">Score</p>
            <p className="text-xl font-bold text-white">{score}</p>
          </div>
          
          <div className="bg-purple-800 px-4 py-2 rounded-md">
            <p className="text-sm text-yellow-300 font-semibold">Best</p>
            <p className="text-xl font-bold text-white">{highScore}</p>
          </div>
        </div>
      </div>
      
      <p className="text-purple-200 text-center sm:text-left mb-6">
        Guess the Bollywood movie title letter by letter. Be careful - 6 wrong guesses and it's game over!
      </p>
      
      <div className="w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full"></div>
    </header>
  );
};

export default Header;