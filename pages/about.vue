<script setup lang="ts">
import { IonicSlides } from '@ionic/vue'

import { Pagination } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/vue'

import { cards } from '~~/utils/cards'

import 'swiper/css'
import 'swiper/css/pagination'
import '@ionic/vue/css/ionic-swiper.css'

const modules = [Pagination, IonicSlides]
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="about" />
    <ion-content>
      <swiper :loop="true" :pagination="true" :modules="modules">
        <swiper-slide v-for="card of cards" :key="card.id">
          <ion-card mode="ios" color="light">
            <ion-card-header mode="md">
              <ion-img :src="card.img" :alt="card.id" />
              <ion-card-subtitle>{{ card.details }}</ion-card-subtitle>
              <ion-card-title>{{ card.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content mode="md">
              <ion-button v-for="social of card.social" :key="social.color" fill="clear" :href="social.link"
                target="_blank" :color="social.color">
                <ion-icon slot="icon-only" :icon="social.logo" />
              </ion-button>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>
