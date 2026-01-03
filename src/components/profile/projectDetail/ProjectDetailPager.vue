<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

defineProps({
  prev: {
    type: Object,
    default: null
  },
  next: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-border">
    <div class="flex justify-between items-center">
      <!-- 上一個作品 -->
      <div v-if="prev" class="flex-1">
        <RouterLink
          :to="`/projects/${prev.slug}`"
          class="group flex items-center gap-3 text-muted hover:text-main transition-colors"
        >
          <span class="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <div class="flex flex-col items-start">
            <span class="text-[10px] uppercase tracking-widest font-mono font-bold text-muted/60 mb-0.5">{{ locale === 'en' ? 'Previous_Project' : '上一個專案' }}</span>
            <span class="font-bold group-hover:text-primary transition-colors line-clamp-1">{{ prev.title }}</span>
          </div>
        </RouterLink>
      </div>
      <div v-else class="flex-1"></div>
      
      <!-- 返回列表 -->
      <RouterLink
        to="/projects"
        class="px-4 py-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary transition-colors bg-surface hover:shadow-lg hover:shadow-primary/10"
      >
        <span class="material-symbols-outlined">grid_view</span>
      </RouterLink>
      
      <!-- 下一個作品 -->
      <div v-if="next" class="flex-1 flex justify-end">
        <RouterLink
          :to="`/projects/${next.slug}`"
          class="group flex items-center gap-3 text-muted hover:text-main transition-colors text-right"
        >
          <div class="flex flex-col items-end">
            <span class="text-[10px] uppercase tracking-widest font-mono font-bold text-muted/60 mb-0.5">{{ locale === 'en' ? 'Next_Project' : '下一個專案' }}</span>
            <span class="font-bold group-hover:text-primary transition-colors line-clamp-1">{{ next.title }}</span>
          </div>
          <span class="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </RouterLink>
      </div>
      <div v-else class="flex-1"></div>
    </div>
  </section>
</template>
