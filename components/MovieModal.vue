<script setup lang="ts">
import { modalController } from "@ionic/vue"

import { Movie } from "~~/utils/interfaces/movieInterface"

const { movieID } = defineProps<{
  movieID: number;
}>();

const config = useRuntimeConfig()

const movieResult = ref<Movie>(({} as Movie))

watchEffect(async () => {
  try {
    const data: Movie = await $fetch(`https://api.themoviedb.org/3/movie/${movieID}`, {
      params: { api_key: config.public.movieToken },
    })

    movieResult.value = data
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: "Error movie info by id",
      subHeader: "problem to req api",
    })
  }
})

const closeModal = () => {
  modalController.dismiss({
    dismissed: true,
  })
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>movie info</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal" color="danger">
          <ion-icon :icon="ioniconsCloseCircleOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card>
      <ion-card-header>
        <ion-img :src="
          movieResult?.poster_path
            ? `http://image.tmdb.org/t/p/w500/${movieResult.poster_path}`
            : '/img/No-image-found.jpg'
        " :alt="movieResult.title" class="poster" />
        <ion-card-title>{{ movieResult.title }}</ion-card-title>
        <ion-card-subtitle>
          release date: {{ movieResult.release_date }}
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-item>{{ movieResult.overview }}</ion-item>
        <ion-item>
          <ion-label> vote average: {{ movieResult.vote_average }} </ion-label>
        </ion-item>
        <ion-item> vote count: {{ movieResult.vote_count }} </ion-item>
        <ion-item>language: {{ movieResult.original_language }}</ion-item>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<style scoped>
.poster {
  max-height: 100%;
  width: 225px;
  margin-inline: auto;
}
</style>