<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="py-24" id="contact">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl bg-main px-6 py-24 shadow-2xl sm:px-24 xl:py-32">
        <h2 class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-surface sm:text-4xl">
          {{ t('cta.title') }}
        </h2>
        <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-surface/70">
          {{ t('cta.subtitle') }}
        </p>
        <div class="mt-10 flex justify-center">
          <a
            class="rounded-lg bg-primary px-8 py-3.5 text-base font-bold text-surface shadow-sm hover:bg-primary/90"
            href="mailto:hello@71bk.dev"
          >
            {{ t('cta.button') }}
          </a>
        </div>
        <svg
          aria-hidden="true"
          class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          viewBox="0 0 1024 1024"
        >
          <circle cx="512" cy="512" fill="url(#gradient-cta)" fill-opacity="0.25" r="512"></circle>
          <defs>
            <radialGradient id="gradient-cta">
              <stop stop-color="rgb(var(--color-primary))"></stop>
              <stop offset="1" stop-color="rgb(var(--color-primary))"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </section>
</template>
