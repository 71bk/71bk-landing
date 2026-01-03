<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="relative aspect-video rounded-2xl overflow-hidden bg-surface border border-border shadow-xl">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center">
        <span class="material-symbols-outlined text-6xl text-muted">image</span>
      </div>
    </div>
  </section>
</template>
