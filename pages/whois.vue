<script setup lang="ts">
import { Whois } from '~~/utils/interfaces/whoisInterface';

definePageMeta({
  alias: ['/whois']
})

useHead({
  title: 'whois info',
  meta: [
    { name: 'description', content: 'tools for query domain info' },
    { name: 'keywords', content: 'stack-analyze, whois info' }
  ]
})

const { startWithHttp, validateWebsite, website } = useHttp()

const whoisInfo = ref<Whois>({} as Whois)

const isEmptywhoisInfo = computed(
  () => Object.keys(whoisInfo.value).length === 0
)

const clearDomainInfo = () => {
  whoisInfo.value = ({} as Whois)
}

const getDomainInfo = async () => {
  if (website.value.match(startWithHttp)) return useToast('http or https is not neccesary', 'warning')

  try {
    const data: Whois = await $fetch('/api/whois', {
      query: {
        website: website.value
      }
    })

    whoisInfo.value = data

    console.info(whoisInfo.value)
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: 'Error whois info',
      subHeader: 'problem to whois'
    })
  }

  website.value = ''
}
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="whois info" />
    <ion-content>
      <stack-input v-model="website" />
      <ion-grid>
        <http-buttons :disabled-init="validateWebsite" :disabled-clear="isEmptywhoisInfo" @init-function="getDomainInfo"
        @clear-function="clearDomainInfo" />
      </ion-grid>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            {{ whoisInfo.website || 'no domain info' }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre class="stack-result">{{
            whoisInfo.info || 'no domain info'
            }}</pre>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>