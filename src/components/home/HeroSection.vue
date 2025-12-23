<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-main sm:text-6xl mb-6">
          {{ t('hero.title', { highlight: '' }) }}
          <span class="text-primary">{{ t('hero.highlight') }}</span>
        </h1>
        <p class="mx-auto max-w-2xl text-lg leading-8 text-muted mb-10">
          {{ t('hero.description') }}
        </p>
        <div class="flex items-center justify-center gap-x-6">
          <a
            class="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-surface shadow-sm hover:bg-primary/90"
            href="#work"
          >
            {{ t('hero.viewProjects') }}
          </a>
          <a
            class="group text-sm font-semibold leading-6 text-main hover:text-primary transition-colors flex items-center gap-1"
            href="#skills"
          >
            {{ t('hero.aboutMe') }}
            <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
    <div aria-hidden="true" class="absolute -top-24 right-0 -z-10 transform-gpu overflow-hidden blur-3xl">
      <div class="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-primary/10 to-primary/5 opacity-30"></div>
    </div>
  </section>
</template>
