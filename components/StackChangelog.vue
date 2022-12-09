<script setup lang="ts">
import { modalController } from '@ionic/vue';

import { versions } from '~~/utils/versions';

const closeModal = () => {
  modalController.dismiss({ dismissed: true })
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>changelog</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal" color="danger">
          <ion-icon :icon="ioniconsCloseCircleOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card v-for="data of versions" :key="data.version">
      <ion-card-header>
        <ion-card-title>Version: {{ data.version }}</ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-text-warp format">
        {{ data.details }}
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<style scoped>
.format {
  white-space: pre;
  tab-size: 2;
  word-wrap: break-word;
}
</style>
