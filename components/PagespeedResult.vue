<script setup lang="ts">
const {
  pagespeedMode,
  pagespeedURL,
  pagespeedScore
} = defineProps<{
  pagespeedMode: "Desktop" | "Mobile";
  pagespeedURL: string;
  pagespeedScore: number;
}>()

const resultColor = (score: number) => {
  switch (true) {
    case score === 0:
      return "dark";
      break;
    case score === 1 || score <= 49:
      return "danger";
      break;
    case score === 50 || score <= 89:
      return "warning";
      break;
    case score >= 90 || score === 100:
      return "success";
      break;
  }
}
</script>

<template>
  <ion-item>
    <ion-label position="stacked">{{ pagespeedMode }}:</ion-label>
    <ion-badge slot="end" :color="resultColor(pagespeedScore)">
      {{ pagespeedScore }} / 100
    </ion-badge>
    <ion-text>{{ pagespeedURL || 'no website' }}</ion-text>
  </ion-item>
</template>