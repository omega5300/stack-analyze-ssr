<script setup lang="ts">
import { modalController } from '@ionic/vue'

import { StackChangelog } from '#components'

import { groups } from '~~/utils/pages';

definePageMeta({
  alias: ['/']
})

useHead({
  title: 'stack-analyze',
  meta: [
    { name: 'description', content: 'tools service created special all user' },
    { name: 'keywords', content: 'stack-analyze, menu tools' }
  ]
})

const accordionGroup = ref();

const openChangelog = async () => {
  const modal = await modalController.create({
    component: StackChangelog,
    backdropDismiss: false,
    mode: 'ios',
    cssClass: 'modal'
  })

  return modal.present()
}

const closeAccordion = () => {
  if (accordionGroup.value) {
    accordionGroup.value.$el.value = undefined;
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title color="secondary">stack-analyze</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item button @click="openChangelog">
        <ion-icon slot="start" color="secondary" :icon="ioniconsLibraryOutline" />
        <ion-label>Changelog</ion-label>
      </ion-item>
      <ion-accordion-group ref="accordionGroup">
        <ion-accordion v-for="group of groups" :value="group.section">
          <ion-item slot="header">
            <ion-label color="secondary">{{ group.name }}</ion-label>
          </ion-item>
          <ion-list slot="content">
            <ion-item v-for="page of group.pages" :router-link="page.url" class="pointer">
              <ion-icon slot="start" :color="group.color" :icon="page.icon" />
              <ion-label :color="group.color">{{ page.title }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>
      <ion-item router-link="/about" class="pointer">
        <ion-icon slot="start" color="secondary" :icon="ioniconsPeopleOutline" />
        <ion-label color="secondary">about app</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<style>
.modal {
  --height: 95%;
  --width: 90%;
}
</style>
