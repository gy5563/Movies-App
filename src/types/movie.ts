// src/types/movie.ts
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
}

export interface MovieDetails extends Movie {
  tagline: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}