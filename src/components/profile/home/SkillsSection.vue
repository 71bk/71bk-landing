<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { fadeInUp, staggerIn } = useScrollAnimation()

// Element refs
const sectionHeader = ref(null)
const skillsGrid = ref(null)

onMounted(() => {
  // 標題進場
  fadeInUp(sectionHeader, { y: 40, duration: 0.8 })
  
  // 技能卡片依序進場
  staggerIn(skillsGrid, '.skill-card', { y: 60, stagger: 0.12, start: 'top 95%' })
})
</script>

<template>
  <section class="py-24 bg-background" id="skills">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <div ref="sectionHeader" class="mx-auto max-w-2xl lg:text-center mb-16 opacity-0">
        <h2 class="text-3xl font-bold tracking-tight text-main sm:text-4xl">{{ t('skills.title') }}</h2>
        <p class="mt-4 text-lg leading-8 text-muted">
          {{ t('skills.subtitle') }}
        </p>
      </div>

      <!-- Skills Grid -->
      <div ref="skillsGrid" class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Frontend -->
        <div class="skill-card rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-border/60 hover:shadow-lg hover:ring-primary/30 transition-all duration-300">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">web</span>
            </div>
            <h3 class="text-lg font-semibold text-main">
              <span class="text-primary/40 font-mono mr-1 font-normal"></span>{{ t('skills.frontend') }}
            </h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">React</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Vue 3 &amp; Vite</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Tailwind CSS</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">JavaScript</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">TypeScript</span>
            </li>
          </ul>
        </div>

        <!-- Backend -->
        <div class="skill-card rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-border/60 hover:shadow-lg hover:ring-primary/30 transition-all duration-300">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">dns</span>
            </div>
            <h3 class="text-lg font-semibold text-main">{{ t('skills.backend') }}</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">java</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Spring Boot</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Spring Security</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">JWT &amp; OAuth2</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Restful APIs</span>
            </li>
          </ul>
        </div>

        <!-- DevOps -->
        <div class="skill-card rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-border/60 hover:shadow-lg hover:ring-primary/30 transition-all duration-300">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">cloud_sync</span>
            </div>
            <h3 class="text-lg font-semibold text-main">{{ t('skills.devops') }}</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">GitHub &amp; Git</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Docker</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">Cloudflare</span>
            </li>
                        <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">AWS &amp; Vercel</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">SQLServer &amp; MySQL</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors group/item">
              <span class="material-symbols-outlined text-xl text-primary/60 group-hover/item:text-primary transition-colors">check_circle</span>
              <span class="text-sm font-mono font-medium tracking-wide">CI/CD Pipelines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
