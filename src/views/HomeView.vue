<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/movie';

// Explicitly type the ref
const movies = ref<Movie[]>([]);
const searchQuery = ref<string>('');
const router = useRouter();

onMounted(async () => {
    try {
        const response = await api.getPopularMovies();
        movies.value = response.data.results;
    } catch (error) {
        console.error('Failed to fetch movies', error);
    }
});

const handleSearch = async () => {
    try {
        if (searchQuery.value.trim() === '') {
            const response = await api.getPopularMovies();
            movies.value = response.data.results;
        } else {
            const response = await api.searchMovies(searchQuery.value);
            movies.value = response.data.results;
        }
    } catch (error) {
        console.error('Search failed', error);
    }
};

const goToDetails = (id: number) => {
    router.push(`/movie/${id}`);
};
</script>

<template>
    <div class="home">
        <header>
            <h1 class="title">Laalaa Movies</h1>
            <input v-model="searchQuery" @input="handleSearch" placeholder="Search..." class="search-bar" />
        </header>

        <div class="movie-grid">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @click="goToDetails(movie.id)" />
        </div>
    </div>
</template>

<style scoped>
/* Same CSS as before */
.home {
    padding: 2rem 4rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.search-bar {
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.movie-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>