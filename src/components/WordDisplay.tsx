import React from 'react';

interface WordDisplayProps {
  maskedMovie: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ maskedMovie }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-6">
      {maskedMovie.map((char, index) => (
        <div 
          key={index} 
          className={`
            ${char === ' ' ? 'w-6' : 'w-10'} 
            h-12 
            flex 
            justify-center 
            items-center 
            ${char === ' ' ? '' : 'border-b-2 border-yellow-400'} 
            text-2xl 
            font-bold
            ${char !== '_' && char !== ' ' ? 'animate-popIn' : ''}
          `}
        >
          {char !== ' ' && char}
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;