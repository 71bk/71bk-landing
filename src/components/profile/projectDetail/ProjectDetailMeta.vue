<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

defineProps({
  project: {
    type: Object,
    required: true
  }
})

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <section class="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <!-- 分類 -->
      <div class="flex flex-col gap-2">
        <span class="text-[10px] text-muted uppercase tracking-widest font-mono font-bold">{{ locale === 'en' ? 'Category' : '分類' }}</span>
        <span class="text-main font-bold">{{ project.category }}</span>
      </div>
      
      <!-- 難度 -->
      <div class="flex flex-col gap-2">
        <span class="text-[10px] text-muted uppercase tracking-widest font-mono font-bold">{{ locale === 'en' ? 'Difficulty' : '難度' }}</span>
        <div class="flex gap-1">
          <span
            v-for="i in 5"
            :key="i"
            class="w-3 h-3 rounded-sm transition-colors"
            :class="i <= project.difficultyScore ? 'bg-primary' : 'bg-border'"
          ></span>
        </div>
      </div>
      
      <!-- 影響力 -->
      <div class="flex flex-col gap-2">
        <span class="text-[10px] text-muted uppercase tracking-widest font-mono font-bold">{{ locale === 'en' ? 'Impact' : '影響力' }}</span>
        <div class="flex gap-1">
          <span
            v-for="i in 5"
            :key="i"
            class="w-3 h-3 rounded-sm transition-colors"
            :class="i <= project.impactScore ? 'bg-primary' : 'bg-border'"
          ></span>
        </div>
      </div>
      
      <!-- 發布日期 -->
      <div class="flex flex-col gap-2">
        <span class="text-[10px] text-muted uppercase tracking-widest font-mono font-bold">{{ locale === 'en' ? 'Published' : '發布時間' }}</span>
        <span class="text-main font-bold font-mono text-sm">{{ formatDate(project.publishedAt) }}</span>
      </div>
    </div>
    
    <!-- 技術標籤 -->
    <div class="mt-8 pt-8 border-t border-border flex flex-wrap gap-2">
      <span
        v-for="tech in project.techs"
        :key="tech.id"
        class="inline-flex items-center gap-1 rounded bg-primary/10 px-3 py-1 text-xs font-mono font-bold text-primary tracking-wider uppercase ring-1 ring-primary/20 shadow-sm"
      >
        {{ tech.name }}
      </span>
    </div>
  </section>
</template>
