<script lang="ts" setup>
import { Movie, MovieSchema } from '~~/utils/interfaces/movieInterface';

definePageMeta({
  alias: ['/movie']
})

useHead({
  title: 'bitly info',
  meta: [
    { name: 'description', content: 'tool for query movie' },
    { name: 'keywords', content: 'stack-analyze, movie info, stack-analyze movie' }
  ]
})

const config = useRuntimeConfig()

const movieTitle = ref('')

const movies = ref<Movie[]>([])

const isEmptyMovies = computed(() => movies.value.length === 0)

const movieSearch = async () => {
  if(!movieTitle.value) return useToast("this field is required", "warning")

  try {
    const data: MovieSchema = await $fetch('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: config.public.movieToken,
        query: movieTitle.value
      }
    })

    const results = data.results.sort((x, y) => {
      const primaryDate = new Date(x.release_date)
      const secondaryDate = new Date(y.release_date)

      return primaryDate.getTime() - secondaryDate.getTime()
    })
    
    movies.value = results
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: 'Error movie info',
      subHeader: 'problem to req api'
    })
  }

  movieTitle.value = ''
}

const clearMovies = () => {
  movies.value = []
};
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="movie search" />
    <ion-content>
      <stack-input v-model="movieTitle" msg="enter a movie title" />
      <ion-grid>
        <search-buttons :clear-search="isEmptyMovies" @start-search="movieSearch" @clear-search="clearMovies" />
        <ion-row>
          <movie-card v-for="movie of movies" :key="movie.id" :movie-data="movie" />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>