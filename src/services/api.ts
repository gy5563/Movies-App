// src/services/api.ts
import axios from 'axios';
import type { TMDBResponse, MovieDetails } from '../types/movie';

const API_KEY = 'cc5279fe31b44e787c6e1a2f4fe4de0b'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default {
  getPopularMovies() {
    // We tell axios the response body will look like TMDBResponse
    return apiClient.get<TMDBResponse>('/movie/popular');
  },
  searchMovies(query: string) {
    return apiClient.get<TMDBResponse>('/search/movie', { params: { query } });
  },
  getMovieDetails(id: string | string[]) {
    return apiClient.get<MovieDetails>(`/movie/${id}`);
  },
  getImageUrl(path: string | null) {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750';
  }
};