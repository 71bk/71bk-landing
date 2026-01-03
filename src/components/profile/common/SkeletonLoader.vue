<script setup>
defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '1rem' // h-4
  },
  borderRadius: {
    type: String,
    default: '0.25rem' // rounded
  }
})
</script>

<template>
  <div 
    class="bg-slate-200 dark:bg-slate-700 animate-pulse"
    :style="{ width, height, borderRadius }"
  ></div>
</template>
