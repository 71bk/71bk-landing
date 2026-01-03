<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="group flex h-full flex-col bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg">
    <div class="relative h-48 overflow-hidden">
      <img
        :alt="project.imageAlt"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        :data-alt="project.dataAlt"
        :src="project.image"
      />
      <!-- 圖片遮罩：保持深色漸層，讓白色文字可讀 -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-3 left-3">
        <span
          class="px-2 py-1 rounded bg-surface/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-wider border border-border"
        >
          {{ project.category }}
        </span>
      </div>
    </div>
    <div class="p-5 flex flex-col flex-1">
      <h3 class="text-main text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
        {{ project.title }}
      </h3>
      <p class="text-muted text-sm leading-relaxed mb-4 line-clamp-2 min-h-[3rem]">
        {{ project.summary }}
      </p>
      <div class="mt-auto flex flex-wrap gap-2 pt-4 border-t border-border">
        <template v-for="(tech, index) in project.techs" :key="`${project.title}-${tech}-${index}`">
          <span class="text-xs text-primary font-mono font-bold tracking-wider uppercase bg-primary/10 px-3 py-1 rounded shadow-sm border border-primary/10">{{ tech }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
