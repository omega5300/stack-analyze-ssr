<script setup lang="ts">
import { TechStack } from '~~/utils/interfaces/stackInterface';

definePageMeta({
  alias: ['/tech-stack']
})

useHead({
  title: 'tech-stack',
  meta: [
    { name: 'description', content: 'tools for analyze website tecnologies' },
    { name: 'keywords', content: 'stack-analyze, tech stack analyze, analyze tecnologies' }
  ]
})

const apps = ref<TechStack[]>([])

const isEmptyStack = computed(() => apps.value.length === 0)

const { validateWebsite, website, startWithHttp } = useHttp()

const getStack = async () => {
  if(!website.value.match(startWithHttp)) return useToast('http or https:// is required', 'warning')

  try {
    const data: TechStack[] = await $fetch('https://stack-analyze-api.onrender.com/stack', {
      params: { url: website.value }
    })

    apps.value = data
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: 'error to analyze',
      subHeader: 'problem to tech stack-function'
    })
  }
  website.value = ''
}

const clearStack = () => {
  apps.value = []
}
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="tech-stack" />
    <ion-content>
      <stack-input v-model="website" />
      <ion-grid>
        <http-buttons :disabled-init="validateWebsite" :disabled-clear="isEmptyStack" @init-function="getStack" @clear-function="clearStack" />
        <ion-row>
          <tech-stack-card v-for="app of apps" :key="app.id" :stack-data="app" />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>