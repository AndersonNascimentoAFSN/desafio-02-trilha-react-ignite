import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';
import '../styles/content.scss';
import Header from './Header';

interface MovieResponse {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponse {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponse;
}

export function Content(props: ContentProps) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieResponse[]>([]);

  useEffect(() => {
    api.get<MovieResponse[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [props.selectedGenreId]);

  return (
    <div className="container">
      <Header title={props.selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}