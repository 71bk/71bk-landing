<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/store/projects'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import ProjectCard from "@/components/profile/home/ProjectCard.vue"

const { t, locale } = useI18n()
const { fadeInUp, staggerIn } = useScrollAnimation()

const projectsStore = useProjectsStore()
const { featuredProjects: featuredProjectsRaw, categories } = storeToRefs(projectsStore)

// Element refs for animations
const sectionHeader = ref(null)
const projectsGrid = ref(null)

onMounted(() => {
  projectsStore.fetchProjects({ locale: locale.value })
  
  // 標題進場動畫
  fadeInUp(sectionHeader, { y: 40, duration: 0.8 })
  
  // 卡片依序進場
  staggerIn(projectsGrid, '.project-card', { y: 60, stagger: 0.15 })
})

watch(locale, (nextLocale) => {
  projectsStore.fetchProjects({ locale: nextLocale })
})

const getCategoryLabel = (categoryValue) => {
  const category = categories.value.find((item) => item.value === categoryValue)
  if (!category) return categoryValue
  return locale.value === 'en' ? category.labelEn : category.labelZh
}

// 取得精選作品（最多 3 個）
const MAX_VISIBLE_TECHS = 4

const featuredProjects = computed(() => {
  return featuredProjectsRaw.value
    .slice(0, 3)
    .map((project) => {
      const allTechs = project.techs?.map((tech) => tech.name) ?? []
      return {
        id: project.id,
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        category: getCategoryLabel(project.category),
        coverImage: project.coverImage,
        techs: allTechs.slice(0, MAX_VISIBLE_TECHS),
        extraTechsCount: Math.max(0, allTechs.length - MAX_VISIBLE_TECHS)
      }
    })
})
</script>

<template>
  <section class="py-20" id="work">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div ref="sectionHeader" class="flex flex-col gap-2 mb-12 opacity-0">
        <h2 class="text-3xl font-bold tracking-tight text-main sm:text-4xl">{{ t('featured.title') }}</h2>
        <p class="text-muted text-lg">{{ t('featured.subtitle') }}</p>
      </div>
      <div ref="projectsGrid" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="project in featuredProjects"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          class="block h-full project-card"
        >
          <ProjectCard
            :title="project.title"
            :description="project.summary"
          >
            <template #media>
              <img
                v-if="project.coverImage"
                :src="project.coverImage"
                :alt="project.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div v-else class="absolute inset-0 bg-[radial-gradient(rgb(var(--color-border))_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
            </template>
            <template #tags>
              <span
                v-for="tech in project.techs"
                :key="tech"
                class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-mono font-bold text-primary tracking-wider uppercase ring-1 ring-primary/20 shadow-sm"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.extraTechsCount > 0"
                class="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-mono font-medium text-muted ring-1 ring-border"
              >
                +{{ project.extraTechsCount }}
              </span>
            </template>
          </ProjectCard>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
