<script lang="ts" setup>
import { Anime, AnimePagination } from '~~/utils/interfaces/animeInterface';

definePageMeta({
  alias: ['/anime']
})

useHead({
  title: 'anime search',
  meta: [
    { name: 'description', content: 'tool for query anime, ova and others' },
    { name: 'keywords', content: 'stack-analyze, anime search, stack-analyze anime' }
  ]
})

const anime = ref('')

const animeData = ref<Anime[]>([])

const isEmptyAnimeData = computed(() => animeData.value.length === 0);

const animeSearch = async () => {
  if(!anime.value) return useToast("this field is required", "warning")

  try {
    const animeSchema: AnimePagination = await $fetch('https://api.jikan.moe/v4/anime', {
      params: { q: anime.value }
    })

    animeData.value = animeSchema.data
  } catch(err) {
    useAlert({
      message: (err as Error).message,
      header: '',
      subHeader: ''
    })
  }

  anime.value = ''
}

const clearAnime = () => {
  animeData.value = []
};
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="anime search" />
    <ion-content>
      <stack-input v-model="anime" msg="enter a anime, movie, ova or special:" />
      <ion-grid>
        <search-buttons :clear-search="isEmptyAnimeData" @start-search="animeSearch" @clear-search="clearAnime" />
        <ion-row>
          <anime-card v-for="anime of animeData" :key="anime.mal_id" :anime-data="anime" />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
