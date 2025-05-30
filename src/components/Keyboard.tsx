import React from 'react';

interface KeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  onGuess: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, correctLetters, onGuess }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const getKeyClass = (letter: string) => {
    if (!guessedLetters.has(letter)) {
      return "bg-purple-800 hover:bg-purple-700 text-white";
    } else if (correctLetters.has(letter)) {
      return "bg-green-600 text-white cursor-default";
    } else {
      return "bg-red-600 text-white cursor-default";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
          {row.map(letter => (
            <button
              key={letter}
              onClick={() => onGuess(letter)}
              disabled={guessedLetters.has(letter)}
              className={`
                w-8 h-10 sm:w-10 sm:h-12
                rounded-md 
                font-bold 
                transition-all 
                duration-200
                ${getKeyClass(letter)}
                ${guessedLetters.has(letter) ? 'transform scale-95' : 'hover:scale-105'}
                shadow-md
              `}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;