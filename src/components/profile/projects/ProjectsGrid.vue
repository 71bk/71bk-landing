<script setup>
import { ref, computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/store/projects'
import ProjectCard from "@/components/profile/projects/ProjectCard.vue"
import ProjectCardSkeleton from "@/components/profile/projects/ProjectCardSkeleton.vue"

const { locale } = useI18n()

const projectsStore = useProjectsStore()
const { projects: projectsRaw, categories, loading } = storeToRefs(projectsStore)

// 從父元件注入篩選條件
const filters = inject('filters', {
  selectedCategory: { value: null },
  selectedTechs: { value: [] }
})

// 從 CursorPreview 注入 (如果有的話)
const cursorPreview = inject('cursorPreview', null)

const getCategoryLabel = (categoryValue) => {
  const category = categories.value.find((item) => item.value === categoryValue)
  if (!category) return categoryValue
  return locale.value === 'en' ? category.labelEn : category.labelZh
}

// 轉換並篩選作品
const projects = computed(() => {
  return projectsRaw.value
    .filter(p => (p.status ? p.status === 'PUBLISHED' : true))
    // 分類篩選
    .filter(p => {
      if (filters.selectedCategory.value === null) return true
      return p.category === filters.selectedCategory.value
    })
    // 技術篩選（任一技術符合即可）
    .filter(p => {
      if (filters.selectedTechs.value.length === 0) return true
      return p.techs?.some(t => filters.selectedTechs.value.includes(t.name))
    })
    .map(project => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      category: getCategoryLabel(project.category),
      categoryValue: project.category,
      image: project.coverImage,
      imageAlt: project.title,
      techs: project.techs?.map(t => t.name) ?? [],
      featured: project.featured
    }))
})

// 是否有作品
const hasProjects = computed(() => projects.value.length > 0)
const isLoading = computed(() => loading.value)

// Hover 事件處理
function handleProjectEnter(project) {
  if (cursorPreview) {
    cursorPreview.setPreview(project.image, project.title)
  }
}

function handleProjectLeave() {
  if (cursorPreview) {
    cursorPreview.clearPreview()
  }
}
</script>

<template>
  <div class="flex flex-col">
    <!-- Loading: Skeleton Screen -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCardSkeleton v-for="n in 6" :key="n" />
    </div>

    <!-- 有作品時顯示網格 -->
    <div v-else-if="hasProjects" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RouterLink
        v-for="project in projects"
        :key="project.id"
        :to="`/projects/${project.slug}`"
        class="block h-full project-item"
        @mouseenter="handleProjectEnter(project)"
        @mouseleave="handleProjectLeave"
      >
        <ProjectCard :project="project" />
      </RouterLink>
    </div>

    <!-- 無作品時顯示提示 -->
    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
      <span class="material-symbols-outlined text-6xl text-muted mb-4">search_off</span>
      <p class="text-muted text-lg">
        {{ locale === 'en' ? 'No projects found with current filters' : '沒有符合篩選條件的作品' }}
      </p>
    </div>
  </div>
</template>
