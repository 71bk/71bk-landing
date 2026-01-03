<script setup>
import { ref, computed, provide, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/store/projects'

const { locale } = useI18n()

const projectsStore = useProjectsStore()
const { categories: storeCategories, availableTechs } = storeToRefs(projectsStore)

onMounted(() => {
  projectsStore.fetchProjects({ locale: locale.value })
})

watch(locale, (nextLocale) => {
  projectsStore.fetchProjects({ locale: nextLocale })
})

// 篩選狀態
const selectedCategory = ref(null) // null = All
const selectedTechs = ref([])

// 取得分類選項（加上 All）
const categories = computed(() => {
  return [
    { value: null, labelZh: '全部', labelEn: 'All' },
    ...storeCategories.value
  ]
})

// 取得技術標籤（從 API 資料）
const techs = computed(() => availableTechs.value)

// 切換分類
const selectCategory = (value) => {
  selectedCategory.value = value
}

// 切換技術標籤
const toggleTech = (techName) => {
  const index = selectedTechs.value.indexOf(techName)
  if (index === -1) {
    selectedTechs.value.push(techName)
  } else {
    selectedTechs.value.splice(index, 1)
  }
}

// 檢查技術是否被選中
const isTechSelected = (techName) => {
  return selectedTechs.value.includes(techName)
}

// 清除所有篩選
const clearFilters = () => {
  selectedCategory.value = null
  selectedTechs.value = []
}

// 是否有啟用篩選
const hasFilters = computed(() => {
  return selectedCategory.value !== null || selectedTechs.value.length > 0
})

// 提供篩選條件給子元件（ProjectsGrid）
provide('filters', {
  selectedCategory,
  selectedTechs
})
</script>

<template>
  <div class="flex flex-col xl:flex-row gap-8 xl:gap-12 border-t border-border pt-8">
    <!-- Category 篩選 -->
    <div class="flex flex-col gap-4 min-w-[200px] shrink-0">
      <span class="text-xs font-mono font-bold tracking-widest text-primary/60 uppercase">
        {{ locale === 'en' ? 'Category' : '分類' }}
      </span>
      <div class="flex flex-wrap xl:flex-col gap-2">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="[
            'flex items-center px-4 py-2.5 rounded-lg text-sm font-bold transition-all text-left group',
            selectedCategory === cat.value
              ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1'
              : 'bg-surface text-muted border border-border hover:border-primary/50 hover:text-primary'
          ]"
          type="button"
          @click="selectCategory(cat.value)"
        >
          {{ locale === 'en' ? cat.labelEn : cat.labelZh }}
        </button>
      </div>
    </div>

    <!-- 右側區域 -->
    <div class="flex flex-col gap-8 flex-1">
      <!-- Technology 篩選 -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono font-bold tracking-widest text-primary/60 uppercase">
            {{ locale === 'en' ? 'Technologies' : '技術' }}
          </span>
          <button
            v-if="hasFilters"
            class="text-xs font-mono font-bold text-primary hover:text-white hover:bg-primary px-3 py-1 rounded border border-primary transition-all uppercase tracking-wider"
            type="button"
            @click="clearFilters"
          >
            Clear All
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tech in techs"
            :key="tech.id"
            :class="[
              'px-4 py-2 rounded-md text-xs font-mono font-bold transition-all uppercase tracking-wider',
              isTechSelected(tech.name)
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-surface border border-border text-muted hover:border-primary/50 hover:text-primary'
            ]"
            type="button"
            @click="toggleTech(tech.name)"
          >
            {{ tech.name }}
          </button>
        </div>
      </div>

      <!-- 作品列表 slot -->
      <slot />
    </div>
  </div>
</template>
