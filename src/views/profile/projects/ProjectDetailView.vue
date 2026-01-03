<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/store/projects'
import publicAnalytics from '@/api/publicAnalytics'
import ProjectDetailHero from "@/components/profile/projectDetail/ProjectDetailHero.vue"
import ProjectDetailShowcase from "@/components/profile/projectDetail/ProjectDetailShowcase.vue"
import ProjectDetailMeta from "@/components/profile/projectDetail/ProjectDetailMeta.vue"
import ProjectDetailContent from "@/components/profile/projectDetail/ProjectDetailContent.vue"
import ProjectDetailGallery from "@/components/profile/projectDetail/ProjectDetailGallery.vue"
import ProjectDetailPager from "@/components/profile/projectDetail/ProjectDetailPager.vue"

const route = useRoute()
const { locale } = useI18n()
const projectsStore = useProjectsStore()
const { publishedProjects, loading } = storeToRefs(projectsStore)

const project = ref(null)
const lastTrackedSlug = ref(null)

const trackProjectView = (projectData) => {
  if (!projectData?.slug) return
  if (lastTrackedSlug.value === projectData.slug) return
  lastTrackedSlug.value = projectData.slug

  const payload = {
    eventType: 'PROJECT_VIEW',
    path: route.fullPath
  }
  if (projectData.id != null) payload.projectId = projectData.id
  if (projectData.slug) payload.slug = projectData.slug

  void publicAnalytics.trackEvent(payload).catch(() => {})
}

const loadProject = async () => {
  const slug = route.params.slug
  if (!slug) {
    project.value = null
    return
  }

  await projectsStore.fetchProjects({ locale: locale.value })
  project.value = await projectsStore.fetchProjectBySlug(String(slug), locale.value)
  trackProjectView(project.value)
}

onMounted(() => {
  loadProject()
})

watch(
  [() => route.params.slug, () => locale.value],
  () => {
    loadProject()
  }
)

// 取得上一個/下一個作品（用於 Pager）
const currentIndex = computed(() => {
  return publishedProjects.value.findIndex(p => p.slug === route.params.slug)
})

const prevProject = computed(() => {
  if (currentIndex.value <= 0) return null
  const p = publishedProjects.value[currentIndex.value - 1]
  return {
    slug: p.slug,
    title: p.title
  }
})

const nextProject = computed(() => {
  if (currentIndex.value >= publishedProjects.value.length - 1) return null
  const p = publishedProjects.value[currentIndex.value + 1]
  return {
    slug: p.slug,
    title: p.title
  }
})

const isLoading = computed(() => loading.value)
</script>

<template>
  <div v-if="project" class="flex flex-col">
    <ProjectDetailHero :project="project" />
    <ProjectDetailShowcase :project="project" />
    <ProjectDetailMeta :project="project" />
    <ProjectDetailContent :project="project" />
    <ProjectDetailGallery :project="project" />
    <ProjectDetailPager :prev="prevProject" :next="nextProject" />
  </div>
  <div v-else-if="isLoading" class="flex items-center justify-center min-h-screen">
    <p class="text-muted">{{ locale === 'en' ? 'Loading project...' : '載入專案中...' }}</p>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <p class="text-muted">Project not found</p>
  </div>
</template>
