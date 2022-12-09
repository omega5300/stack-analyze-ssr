<script setup lang="ts">
import { modalController } from '@ionic/vue';
import { AnimeModal } from '#components';

import { Anime } from '~~/utils/interfaces/animeInterface';

const { animeData } = defineProps<{
  animeData: Anime
}>()

// const AnimeModal = resolveComponent('AnimeModal')

const openModal = async (id: number) => {
  const modal = await modalController.create({
    component: AnimeModal,
    componentProps: { animeID: id },
    backdropDismiss: false,
    cssClass: 'modal-anime',
    mode: 'ios'
  })

  return modal.present()
}
</script>

<template>
   <ion-col size-xl="3" size-lg="3" size-md="4" size-sm="4" size="12">
    <ion-card>
      <ion-card-header>
        <ion-img
          :src="animeData.images.webp.image_url"
          :alt="animeData.title"
          class="poster"
        />
      </ion-card-header>
      <ion-card-content>
        <ion-card-title class="ion-text-sm">
          {{ animeData.title }}
        </ion-card-title>
        <ion-button @click="openModal(animeData.mal_id)" expand="block" color="secondary">
          show info
        </ion-button>
      </ion-card-content>
    </ion-card>
  </ion-col>
</template>

<style>
.poster {
  --height: 334px;
  --width: 225px;
}

.modal-anime {
  --height: 95%;
  --width: 90%;
}
</style>
