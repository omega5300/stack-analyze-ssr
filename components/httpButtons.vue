<script setup lang="ts">
const { disabledClear, disabledInit } = defineProps<{
  disabledInit: boolean;
  disabledClear: boolean;
}>()

const emit = defineEmits<{
  (e: 'initFunction'): void
  (e: 'clearFunction'): void
}>()
</script>

<template>
  <ion-row>
    <ion-col>
      <ion-button expand="block" fill="outline" color="secondary" :disabled="disabledInit"
        @click="emit('initFunction')">start</ion-button>
    </ion-col>
    <ion-col>
      <ion-button expand="block" fill="outline" color="danger" :disabled="disabledClear"
        @click="emit('clearFunction')">reset</ion-button>
    </ion-col>
  </ion-row>
</template>