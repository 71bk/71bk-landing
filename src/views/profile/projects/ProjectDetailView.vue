<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug;
</script>

<template>
  <div class="py-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <h1 class="text-3xl font-bold mb-6">Project: {{ slug }}</h1>
      <p class="text-muted">Project detail page coming soon...</p>
    </div>
  </div>
</template>
