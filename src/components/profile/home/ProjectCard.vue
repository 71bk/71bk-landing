<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-md ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-primary/40"
  >
    <div class="aspect-video w-full overflow-hidden bg-background relative">
      <slot name="media" />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="mt-2 text-lg font-bold text-main group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
        {{ title }}
      </h3>
      <p class="mt-3 flex-1 text-sm leading-6 text-muted line-clamp-3 min-h-[4.5rem]">
        {{ description }}
      </p>
      <div class="mt-6 flex flex-wrap gap-2">
        <slot name="tags" />
      </div>
    </div>
  </article>
</template>
