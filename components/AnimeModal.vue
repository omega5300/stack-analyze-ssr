<script setup lang="ts">
import { modalController } from '@ionic/vue';

import { Anime } from '~~/utils/interfaces/animeInterface';

const { animeID } = defineProps<{ animeID: number }>()

const animeSchema = ref<Anime>(({} as Anime))

watchEffect(async () => {
  try {
    const schema: { data: Anime } = await $fetch(`https://api.jikan.moe/v4/anime/${animeID}`)

    animeSchema.value = schema.data
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: "Error anime",
      subHeader: "problem to anime search by id"
    })
  }
})

const closeModal = () => {
  modalController.dismiss({
    dismissed: true
  })
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>anime info</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal" color="danger">
          <ion-icon :icon="ioniconsCloseCircleOutline" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card>
      <ion-card-header>
        <ion-img :src="animeSchema.images?.webp?.image_url" :alt="animeSchema.title" class="poster" />
        <ion-card-title>{{ animeSchema.title }}</ion-card-title>
        <ion-card-subtitle>{{ animeSchema.title_japanese }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-label position="stacked"> rating: {{ animeSchema.rating }} </ion-label>
          <ion-text>status: {{ animeSchema.status }}</ion-text>
        </ion-item>
        <ion-item>
          <ion-label> episodes: {{ animeSchema.episodes || "current" }} </ion-label>
          <ion-text>type: {{ animeSchema.type }}</ion-text>
        </ion-item>
        <ion-item>
          <ion-accordion-group>
            <ion-accordion value="synopsis">
              <ion-item slot="header">
                <ion-label>synopsis</ion-label>
              </ion-item>
              <ion-item slot="content">
                {{ animeSchema.synopsis || 'no info' }}
              </ion-item>
            </ion-accordion>
            <ion-accordion value="aired">
              <ion-item slot="header">
                <ion-label>aired time:</ion-label>
              </ion-item>
              <ion-item slot="content">{{ animeSchema.aired?.string }}</ion-item>
            </ion-accordion>
          </ion-accordion-group>
        </ion-item>
        <ion-item>duration: {{ animeSchema.duration }} </ion-item>
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
