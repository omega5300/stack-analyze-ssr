<script setup lang="ts">
import { modalController } from '@ionic/vue';

import { MovieModal } from '#components';

import { Movie } from '~~/utils/interfaces/movieInterface';

const { movieData } = defineProps<{
  movieData: Movie
}>()

const poster = movieData?.poster_path
  ? `http://image.tmdb.org/t/p/w500/${movieData.poster_path}`
  : '/img/No-image-found.jpg'

const openModal = async (id: number) => {
  const modal = await modalController.create({
    component: MovieModal,
    componentProps: {
      movieID: id
    },
    backdropDismiss: false,
    cssClass: 'modal-movie',
    mode: 'ios'
  })

  return modal.present()
}
</script>

<template>
  <ion-col size-lg="3" size-md="4" size-sm="6" size="12">
    <ion-card>
      <ion-card-header>
        <ion-img :src="poster" :alt="movieData.title" />
      </ion-card-header>
      <ion-card-content>
        <ion-card-title>{{ movieData.title }}</ion-card-title>
        <ion-button @click="openModal(movieData.id)">show info</ion-button>
      </ion-card-content>
    </ion-card>
  </ion-col>
</template>

<style>
.poster {
  --height: 334px;
  --width: 225px;
}

.modal-movie {
  --width: 90%;
  --height: 95%;
}
</style>
