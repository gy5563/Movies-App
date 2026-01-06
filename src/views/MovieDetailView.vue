<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import type { MovieDetails } from '@/types/movie';

const route = useRoute();
const router = useRouter();
// Initialize as null, but tell TS it will eventually hold MovieDetails
const movie = ref<MovieDetails | null>(null);

onMounted(async () => {
    const movieId = route.params.id;
    // route.params can be string or string[], verify it's valid
    if (movieId) {
        try {
            const response = await api.getMovieDetails(movieId);
            movie.value = response.data;
        } catch (e) {
            console.error(e);
        }
    }
});
</script>

<template>
    <div v-if="movie" class="detail-container">
        <button @click="router.back()" class="back-btn">← Back</button>
        <div class="content">
            <img :src="api.getImageUrl(movie.poster_path)" class="poster" />
            <div class="text">
                <h1>{{ movie.title }}</h1>
                <p class="tagline">{{ movie.tagline }}</p>

                <div class="genres">
                    <span v-for="g in movie.genres" :key="g.id" class="pill">{{ g.name }}</span>
                </div>

                <div class="meta">
                    <span>📅 {{ movie.release_date }}</span>
                    <span>⭐ {{ movie.vote_average.toFixed(1) }}/10</span>
                    <span>⏱️ {{ movie.runtime }} min</span>
                </div>

                <h3>Overview</h3>
                <p>{{ movie.overview }}</p>
            </div>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped>
/* CSS updates for genres */
.detail-container {
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
}

.back-btn {
    margin-bottom: 20px;
    padding: 10px 20px;
    cursor: pointer;
}

.content {
    display: flex;
    gap: 40px;
}

.poster {
    width: 300px;
    border-radius: 10px;
}

.meta {
    margin: 20px 0;
    color: #666;
    display: flex;
    gap: 20px;
}

.tagline {
    font-style: italic;
    color: #888;
}

.genres {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.pill {
    background: #eee;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
}
</style>