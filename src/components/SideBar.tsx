import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button } from "./Button";
import '../styles/sidebar.scss';

interface GenreResponse {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponse[]>([]);

  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponse[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}