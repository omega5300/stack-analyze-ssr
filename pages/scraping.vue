<script setup lang="ts">
import { WebScraping } from '~~/utils/interfaces/scrapingInterface';

definePageMeta({
  alias: ['/scraping']
})

useHead({
  title: 'web scraping',
  meta: [
    { name: 'description', content: 'tool for scraping website no page writing with javascript' },
    { name: 'keywords', content: 'stack-analyze, web scraping, stack-analyze web scraping' }
  ]
})


// static params
const scrapingOptList = [
  "title", "images", "metadata", "headings",
  "tableHead", "tableData", "links", "cites"
];

const { startWithHttp, validateWebsite, website } = useHttp()

const resultScraping = ref<string | WebScraping[]>('')

const scrapingOpt = ref("");

const shellClass = computed(
  () => resultScraping.value !== "" ? "shell-results" : "shell-msg"
);

// popup opts
const popoverOptions = {
  mode: "ios",
  showBackdrop: true,
  backdropDismiss: false
};

const validateScraping = computed(() => !scrapingOpt.value);

const isEmptyScraping = computed(() => !resultScraping.value);

const startScraping = async () => {
  if (!website.value.match(startWithHttp)) {
    return useToast("http or https:// is required", "danger")
  }

  try {
    const data = await $fetch('/api/scraping', {
      query: {
        website: website.value,
        opt: scrapingOpt.value
      }
    })

    resultScraping.value = data
  } catch (err) {
    resultScraping.value = (err as Error).message
  }

  website.value = ''
  scrapingOpt.value = ''
}

const resetScraping = () => {
  resultScraping.value = "";
};
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="web scraping" />
    <ion-content>
      <stack-input v-model="website" />
      <ion-item>
        <ion-label>scraping elements</ion-label>
        <ion-select class="scraping-select" placeholder="enter a selector" v-model="scrapingOpt" interface="popover"
          :interface-options="popoverOptions" :disabled="validateWebsite">
          <ion-select-option v-for="option in scrapingOptList" :value="option">
            {{ option }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-grid>
        <http-buttons :disabled-init="validateScraping" :disabled-clear="isEmptyScraping" @init-function="startScraping"
        @clear-function="resetScraping" />
      </ion-grid>
      <ion-item>
        <pre :class="['stack-result', 'shell', shellClass]">{{
    resultScraping || "wait scraping results" 
        }}</pre>
      </ion-item>
    </ion-content>
  </ion-page>
</template>