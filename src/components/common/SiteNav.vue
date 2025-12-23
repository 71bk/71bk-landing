<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { t, locale } = useI18n()

const toggleLocale = () => {
  const newLocale = locale.value === 'en' ? 'zh-TW' : 'en'
  setLocale(newLocale)
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface">
          <span class="material-symbols-outlined text-xl font-bold">terminal</span>
        </div>
        <RouterLink class="text-xl font-bold tracking-tight text-main" to="/">71BK</RouterLink>
      </div>
      <nav class="hidden items-center gap-8 md:flex">
        <RouterLink class="text-sm font-medium text-muted transition-colors hover:text-primary" to="/">{{ t('nav.work') }}</RouterLink>
        <RouterLink class="text-sm font-medium text-muted transition-colors hover:text-primary" to="/about">{{ t('nav.about') }}</RouterLink>
        <RouterLink class="text-sm font-medium text-muted transition-colors hover:text-primary" to="/projects">Projects</RouterLink>
      </nav>
      <div class="flex items-center gap-4">
        <!-- 語言切換按鈕 -->
        <button
          @click="toggleLocale"
          class="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-muted transition-colors hover:text-primary hover:bg-surface"
        >
          <span class="material-symbols-outlined text-lg">language</span>
          <span>{{ locale === 'en' ? '中文' : 'EN' }}</span>
        </button>
        
        <RouterLink
          class="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-surface shadow-sm transition-all hover:bg-primary/90 md:block"
          to="/contact"
        >
          {{ t('nav.getInTouch') }}
        </RouterLink>
        <button class="p-2 text-main md:hidden" type="button">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  </header>
</template>
