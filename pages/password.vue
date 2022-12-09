<script setup lang="ts">
definePageMeta({
  alias: ['/password']
})

useHead({
  title: 'password generator',
  meta: [
    { name: 'description', content: 'password generator tool designed for some user for search safe password' },
    { name: 'keywords', content: 'stack-analyze, password generator, stack-analyze password generator' }
  ]
})

const password = ref('')

const isEmptyPassword = computed(() => password.value.length === 0)

const generatePassword = () => {
  const chars = '01234567890abcdefghijklmnoprqstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let retVal = '';

  for (let i = 0; i < 12; i++) {
    retVal += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  password.value = retVal
}

const copyPassword = async () => {
  await navigator.clipboard.writeText(password.value)
}

const resetPassword = () => {
  password.value = ''
}
</script>

<template>
  <IonPage>
    <stack-toolbar page-title="password generator" />
    <ion-content>
      <ion-item>
        <ion-button slot="start" size="large" fill="outline" color="secondary" @click="generatePassword">
          <ion-icon slot="icon-only" :icon="ioniconsDiceOutline" />
        </ion-button>

        <ion-label>{{ password || 'no password' }}</ion-label>

        <ion-button fill="outline" size="large" color="success" slot="end" :disabled="isEmptyPassword"
          @click="copyPassword">
          <ion-icon slot="icon-only" :icon="ioniconsCopyOutline" />
        </ion-button>

        <ion-button fill="outline" size="large" color="danger" slot="end" :disabled="isEmptyPassword"
          @click="resetPassword">
          <ion-icon slot="icon-only" :icon="ioniconsRefreshCircleOutline" />
        </ion-button>
      </ion-item>
    </ion-content>
  </IonPage>
</template>
