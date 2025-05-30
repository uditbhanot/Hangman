import React, { useState, useEffect } from 'react';
import HangmanDisplay from './HangmanDisplay';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import GameOver from './GameOver';
import { fetchRandomMovie, MovieData } from '../services/movieService';
import { MAX_MISTAKES } from '../utils/gameConstants';
import Header from './Header';

const HangmanGame: React.FC = () => {
  const [movie, setMovie] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [posterPath, setPosterPath] = useState<string>('');
  const [maskedMovie, setMaskedMovie] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showPoster, setShowPoster] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
    const savedHighScore = localStorage.getItem('bollywoodHangmanHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const startNewGame = async () => {
    setLoading(true);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
    setShowHint(false);
    setShowPoster(false);
    
    try {
      const movieData: MovieData = await fetchRandomMovie();
      setMovie(movieData.title);
      setReleaseDate(movieData.releaseDate);
      setPosterPath(movieData.posterPath);
      
      const masked = movieData.title.split('').map(char => 
        char === ' ' ? ' ' : '_'
      );
      setMaskedMovie(masked);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
      const fallbackMovie = "DILWALE DULHANIA LE JAYENGE";
      setMovie(fallbackMovie);
      setReleaseDate('1995-10-20');
      setPosterPath('/t48miSSfe7COqgbgMyRIyPVTBoM.jpg'); // Default poster path
      setMaskedMovie(fallbackMovie.split('').map(char => 
        char === ' ' ? ' ' : '_'
      ));
    }
    
    setLoading(false);
  };

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) {
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (movie.includes(letter)) {
      const newMaskedMovie = movie.split('').map((char, index) => {
        if (char === letter || maskedMovie[index] !== '_') {
          return char;
        }
        return maskedMovie[index];
      });
      
      setMaskedMovie(newMaskedMovie);
      
      if (!newMaskedMovie.includes('_')) {
        setGameStatus('won');
        const newScore = score + 1;
        setScore(newScore);
        
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('bollywoodHangmanHighScore', newScore.toString());
        }
      }
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      
      if (newWrongGuesses >= MAX_MISTAKES) {
        setGameStatus('lost');
        setScore(0);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      setShowPoster(false);
    }
  };

  const togglePoster = () => {
    // Only toggle poster if hint has been shown first
    if (showHint || showPoster) {
      setShowPoster(!showPoster);
      if (!showPoster) {
        setShowHint(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header score={score} highScore={highScore} />
      
      <div className="mb-8">
        <HangmanDisplay wrongGuesses={wrongGuesses} />
      </div>
      
      <div className="mb-8">
        <WordDisplay maskedMovie={maskedMovie} />
      </div>
      
      <div className="mb-4 flex justify-center space-x-4">
        <button 
          onClick={toggleHint}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          {showHint ? 'Hide Hint' : 'Hint'}
        </button>

        {showHint && <button 
          onClick={togglePoster}
          className={`${showHint || showPoster ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-300 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300`}
          disabled={!showHint && !showPoster}
        >
          {showPoster ? 'Hide Poster' : 'Last Guess'}
        </button>}
      </div>
      
      {showHint && (
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold">Release Date: <span className="text-yellow-600">{releaseDate}</span></p>
        </div>
      )}

      {showPoster && posterPath && (
        <div className="mb-6 flex justify-center">
          <img 
            src={`https://image.tmdb.org/t/p/w300${posterPath}`} 
            alt="Movie Poster" 
            className="rounded-lg shadow-lg max-h-80 transition-all duration-300 hover:scale-105"
          />
        </div>
      )}
      
      {gameStatus === 'playing' ? (
        <Keyboard 
          guessedLetters={guessedLetters} 
          onGuess={handleGuess}
          correctLetters={new Set([...guessedLetters].filter(letter => movie.includes(letter)))}
        />
      ) : (
        <GameOver 
          status={gameStatus} 
          movie={movie} 
          onRestart={startNewGame}
        />
      )}
    </div>
  );
};

export default HangmanGame;