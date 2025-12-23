<script setup>
import { useI18n } from 'vue-i18n'
import ProjectCard from "@/components/home/ProjectCard.vue";

const { t } = useI18n()
</script>

<template>
  <section class="py-20" id="work">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex flex-col gap-2 mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-main sm:text-4xl">{{ t('featured.title') }}</h2>
        <p class="text-muted text-lg">{{ t('featured.subtitle') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          :title="t('featured.projects.ecommerce.title')"
          :description="t('featured.projects.ecommerce.description')"
        >
          <template #media>
            <div
              class="absolute inset-0 bg-[radial-gradient(rgb(var(--color-border))_1px,transparent_1px)] [background-size:16px_16px] opacity-50"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-3/4 h-3/4 bg-surface shadow-lg rounded-lg border border-border flex flex-col p-3 gap-2"
              >
                <div class="h-2 w-1/3 bg-background rounded"></div>
                <div class="flex gap-2 h-full">
                  <div class="w-1/4 bg-background rounded h-full"></div>
                  <div class="w-3/4 bg-background rounded h-full"></div>
                </div>
              </div>
            </div>
          </template>
          <template #tags>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">code</span> Vue
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">dns</span> Laravel
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">database</span> MySQL
            </span>
          </template>
        </ProjectCard>

        <ProjectCard
          :title="t('featured.projects.saas.title')"
          :description="t('featured.projects.saas.description')"
        >
          <template #media>
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-surface"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="grid grid-cols-2 gap-4">
                <div class="h-12 w-12 bg-surface rounded-lg shadow-sm border border-border"></div>
                <div class="h-12 w-12 bg-primary/20 rounded-lg shadow-sm border border-primary/10"></div>
                <div class="h-12 w-12 bg-primary rounded-lg shadow-sm"></div>
                <div class="h-12 w-12 bg-surface rounded-lg shadow-sm border border-border"></div>
              </div>
            </div>
          </template>
          <template #tags>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">javascript</span> React
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">settings</span> Node.js
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">cloud</span> AWS
            </span>
          </template>
        </ProjectCard>

        <ProjectCard
          :title="t('featured.projects.api.title')"
          :description="t('featured.projects.api.description')"
        >
          <template #media>
            <div class="absolute inset-0 flex items-center justify-center gap-1">
              <div class="w-1 h-12 bg-border rounded-full"></div>
              <div class="w-1 h-16 bg-primary rounded-full"></div>
              <div class="w-1 h-8 bg-border rounded-full"></div>
              <div class="w-1 h-14 bg-border rounded-full"></div>
              <div class="w-1 h-10 bg-border rounded-full"></div>
            </div>
          </template>
          <template #tags>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">terminal</span> Go
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">deployed_code</span> Docker
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
              <span class="material-symbols-outlined text-[14px]">bolt</span> Redis
            </span>
          </template>
        </ProjectCard>
      </div>
    </div>
  </section>
</template>
