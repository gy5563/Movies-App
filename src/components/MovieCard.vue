<script setup lang="ts">
import api from '@/services/api';
import type { Movie } from '@/types/movie';

// Define props using TypeScript interface
defineProps<{
    movie: Movie
}>();

// Define emits (optional but good practice in TS)
defineEmits<{
    (e: 'click'): void
}>();
</script>

<template>
    <div class="movie-card" @click="$emit('click')">
        <img :src="api.getImageUrl(movie.poster_path)" :alt="movie.title" />
        <div class="info">
            <h3>{{ movie.title }}</h3>
            <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
        </div>
    </div>
</template>

<style scoped>
/* Same CSS as before */
.movie-card {
    width: 200px;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.movie-card:hover {
    transform: scale(1.05);
}

img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.info {
    padding: 10px;
    background: #fff;
}

h3 {
    font-size: 1rem;
    margin: 0 0 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>