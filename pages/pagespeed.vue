<script setup lang="ts">
definePageMeta({
  alias: ['/pagespeed']
})

useHead({
  title: 'pagespeed',
  meta: [
    { name: 'description', content: 'tool using google pagespeed api only results page' },
    { name: 'keywords', content: 'stack-analyze, pagespeed, google pagespeed service' }
  ]
})

const { validateWebsite, website, startWithHttp } = useHttp()

// states 
const [
  desktopScore,
  mobileScore,
  desktopURL,
  mobileURL
] = [ref(0), ref(0), ref(""), ref("")];

const isEmptyResults = computed(() => !desktopScore.value && !mobileScore.value && !desktopURL.value && !mobileURL.value)

const getPagespeed = async () => {
  if(!website.value.match(startWithHttp)) return useToast('http or https:// is required', 'warning')

  try {
    const [desktop, mobile] = [
      await usePagespeed(website.value, 'desktop'),
      await usePagespeed(website.value, 'mobile'),
    ]

    desktopScore.value = Math.round(
      desktop.lighthouseResult.categories.performance.score * 100
    );

    mobileScore.value = Math.round(
      mobile.lighthouseResult.categories.performance.score * 100
    );

    desktopURL.value = desktop.id;
    mobileURL.value = mobile.id;
  } catch (err) {
    useAlert({
      message: (err as Error).message,
      header: 'error to analyze',
      subHeader: 'problem to tech stack-function'
    })
  }
  website.value = ''
}

const resetPagespeed = (): void => {
  desktopScore.value = 0;
  mobileScore.value = 0;
  desktopURL.value = "";
  mobileURL.value = "";
}
</script>

<template>
  <ion-page>
    <stack-toolbar page-title="pagespeed" />
    <ion-content>
      <stack-input v-model="website" />

      <ion-grid>
        <http-buttons :disabled-init="validateWebsite" :disabled-clear="isEmptyResults" @init-function="getPagespeed"
          @clear-function="resetPagespeed" />
      </ion-grid>

      <pagespeed-result pagespeedMode="Desktop" :pagespeedURL="desktopURL" :pagespeedScore="desktopScore" />

      <pagespeed-result pagespeedMode="Mobile" :pagespeedURL="mobileURL" :pagespeedScore="mobileScore" />
    </ion-content>
  </ion-page>
</template>