<script setup lang="ts">
defineEmits<{
  (e: 'update:modelValue', id: string): void
}>()

defineProps<{
  msg?: string
  modelValue: string
}>()
</script>

<template>
  <ion-item>
    <ion-label color="secondary" position="floating">{{ msg || 'enter a url' }}</ion-label>
    <ion-input 
      type="url" 
      autocomplete="off" 
      :value="modelValue"
      @ion-input="$emit('update:modelValue', $event.target.value)" 
    />
  </ion-item>
</template>