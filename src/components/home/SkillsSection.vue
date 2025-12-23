<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="py-24 bg-background" id="skills">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight text-main sm:text-4xl">{{ t('skills.title') }}</h2>
        <p class="mt-4 text-lg leading-8 text-muted">
          {{ t('skills.subtitle') }}
        </p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-border/60">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">web</span>
            </div>
            <h3 class="text-lg font-semibold text-main">{{ t('skills.frontend') }}</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">React &amp; Next.js</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">Vue.js &amp; Nuxt</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">Tailwind CSS</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">TypeScript</span>
            </li>
          </ul>
        </div>

        <div class="rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-border/60">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">dns</span>
            </div>
            <h3 class="text-lg font-semibold text-main">{{ t('skills.backend') }}</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">Node.js &amp; Express</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">Python / Django</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">PHP / Laravel</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">Go (Golang)</span>
            </li>
          </ul>
        </div>

        <div class="rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-border/60">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span class="material-symbols-outlined">cloud_sync</span>
            </div>
            <h3 class="text-lg font-semibold text-main">{{ t('skills.devops') }}</h3>
          </div>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">AWS &amp; Vercel</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">Docker &amp; Kubernetes</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">SQLServer &amp; MySQL</span>
            </li>
            <li class="flex items-center gap-3 text-muted hover:text-main transition-colors">
              <span class="material-symbols-outlined text-xl">check_circle</span>
              <span class="text-sm font-medium">CI/CD Pipelines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
