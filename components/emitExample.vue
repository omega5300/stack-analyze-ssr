<script setup lang="ts">
const emit = defineEmits(['yes', 'no'])

function clickYes() {
    emit('yes')
}
function clickNo() {
    emit('no')
}
</script>

<template>
    <ion-button @click="clickYes">YES</ion-button>
    <ion-button @click="clickNo">NO</ion-button>
</template>