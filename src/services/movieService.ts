const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'b03df04a3feceb1c234edbd553ad4e55';

/**
 * Get a bearer token from TMDB API
 * @returns The bearer token for authenticated requests
 */
export const getAuthToken = async (): Promise<string> => {
  try {
    const response = await fetch(`${TMDB_API_URL}/authentication/token/new?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    
    if (data.success && data.request_token) {
      return data.request_token;
    } else {
      throw new Error('Failed to get authentication token');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

/**
 * Movie data interface
 */
export interface MovieData {
  title: string;
  releaseDate: string;
  posterPath: string;
}

/**
 * Fetch a random Bollywood movie from TMDB API
 * @returns A promise that resolves to a MovieData object
 */
export const fetchRandomMovie = async (): Promise<MovieData> => {
  try {
    const authToken = await getAuthToken();
    
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(
      `${TMDB_API_URL}/discover/movie?with_original_language=hi&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`,
      { headers }
    );
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const selectedMovie = data.results[randomIndex];
      
      return {
        title: selectedMovie.title.toUpperCase(),
        releaseDate: selectedMovie.release_date || 'Unknown',
        posterPath: selectedMovie.backdrop_path || ''
      };
    } else {
      throw new Error('No movies found');
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw new Error('Failed to fetch movie data from API');
  }
};