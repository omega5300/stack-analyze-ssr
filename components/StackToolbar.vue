<script setup lang="ts">
defineProps<{
  pageTitle: string
}>()
</script>

<template>
  <ion-header>
    <ion-toolbar color="secondary">
      <ion-title color="light">{{ pageTitle }}</ion-title>
      <ion-buttons slot="start" >
        <ion-back-button default-href="/" :icon="ioniconsHomeOutline" />
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>