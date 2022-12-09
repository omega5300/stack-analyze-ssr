<script lang="ts" setup>
import { format } from 'timeago.js'

import { Bitly } from '~~/utils/interfaces/bitlyInterface';

definePageMeta({
  alias: ['/bitly']
})

useHead({
  title: 'bitly info',
  meta: [
    { name: 'description', content: 'tool for reveal bitly link' },
    { name: 'keywords', content: 'stack-analyze, bitly info, stack-analyze bitly info' }
  ]
})

const config = useRuntimeConfig()

const bitlyRegexp = /bit\.ly\//

const bitlyURL = ref('')
const bitlyResults = ref<Bitly>(({} as Bitly));

// compúted
const validateBitly = computed(() => !bitlyRegexp.test(bitlyURL.value));

const isEmptyBitlyInfo = computed(() => Object.keys(bitlyResults.value).length === 0);

// methods
const bitlyInfo = async () => {
  try {
    const data: Bitly = await $fetch('https://api-ssl.bitly.com/v4/expand', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${config.public.bitlyToken}`,
        "Content-Type": "application/json",
      },
      body: { bitlink_id: bitlyURL.value }
    })

    bitlyResults.value = data
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: 'error info',
      subHeader: 'problem bitly info'
    })
  }

  bitlyURL.value = ''
}

const resetBitlyInfo = () => {
  bitlyResults.value = ({} as Bitly);
};

</script>

<template>
  <ion-page>
    <stack-toolbar page-title="bitly info" />
    <ion-content>
      <stack-input v-model="bitlyURL" msg="enter a bitly link" />
      <ion-grid>
        <http-buttons :disabled-init="validateBitly" :disabled-clear="isEmptyBitlyInfo" @init-function="bitlyInfo" @clear-function="resetBitlyInfo" />
      </ion-grid>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            {{ bitlyResults.link }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-card-subtitle>
            {{ format(bitlyResults.created_at) }}
          </ion-card-subtitle>
          <ion-item>
            {{ bitlyResults.long_url }}
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
