<script setup lang="ts">
import { RefresherEventDetail } from '@ionic/vue';
import { CryptoSchema } from '~~/utils/interfaces/cryptoInterface';

definePageMeta({
  alias: ['/crypto']
})

useHead({
  title: 'crypto market info',
  meta: [
    { name: 'description', content: 'tool readonly and search crypto and value' },
    { name: 'keywords', content: 'stack-analyze, crypto service' }
  ]
})

const coinList = ref<CryptoSchema[]>([]);
const filterCoins = ref<CryptoSchema[]>([]);

const loading = ref(true)

  watchEffect(async () => {
  try {
    const data: CryptoSchema[] = await $fetch('https://api.coingecko.com/api/v3/coins/markets', {
      params: { vs_currency: "usd" }
    })

    coinList.value = data;
    filterCoins.value = data;

    setTimeout(() => {
      loading.value = false
    }, 5000)
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: "Error crypto market",
      subHeader: "problem to crypto market",
    })
    loading.value = true
  }
})

const currency = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const cryptoShadow = (balance: number) => (balance >= 0 ? "shadow-good" : "shadow-bad");

const cryptoStatus = (balance: number) => (balance >= 0 ? "success" : "danger");

const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    event.detail.complete();
  }, 2000)
};

const handleChange = (event: any): void => {
  const query = event.target.value.toLowerCase();
  filterCoins.value = coinList.value.filter(
    d => d.name.toLowerCase().includes(query) || d.symbol.includes(query)
  );
};
</script>
 
<template>
  <ion-page>
    <stack-toolbar page-title="crypto market" />
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content />
      </ion-refresher>
      <ion-searchbar :debounce="1000" @ion-change="handleChange($event)" />
      <ion-list v-if="loading" inset>
        <ion-item>
          <ion-avatar slot="start">
            <ion-skeleton-text :animated="true" />
          </ion-avatar>
          <ion-label>
            <ion-skeleton-text :animated="true" />
            <ion-text><ion-skeleton-text :animated="true" /></ion-text>
          </ion-label>
          <ion-note slot="end">
            <ion-skeleton-text :animated="true" />
          </ion-note>
        </ion-item>
      </ion-list>
      
      <ion-list v-if="!loading" class="scroller" inset>
        <ion-item v-for="coin of filterCoins">
          <ion-avatar slot="start">
            <ion-img
              :class="cryptoShadow(coin.price_change_percentage_24h)"
              :src="coin.image"
              :alt="coin.name"
            />
          </ion-avatar>
          <ion-label>
            {{ coin.name }} ({{ coin.symbol }}) <br />
            <ion-text> price: {{ currency.format(coin.current_price) }} USD </ion-text>
          </ion-label>
          <ion-note :color="cryptoStatus(coin.price_change_percentage_24h)" slot="end">
            {{ coin.price_change_percentage_24h }} %
          </ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.scroller {
  height: 83%;
  overflow: auto;
}
</style>
