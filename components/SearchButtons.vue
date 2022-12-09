<script setup lang="ts">
const { clearSearch } = defineProps<{
  clearSearch: boolean;
}>()

const emit = defineEmits<{
  (e: 'startSearch'): void;
  (e: 'clearSearch'): void;
}>()
</script>

<template>
  <ion-row>
    <ion-col>
      <ion-button color="secondary" fill="outline" expand="block" @click="emit('startSearch')">
        search
      </ion-button>
    </ion-col>
    <ion-col>
      <ion-button color="danger" fill="outline" expand="block" :disabled="clearSearch" @click="emit('clearSearch')">
        clear
      </ion-button>
    </ion-col>
  </ion-row>
</template>
