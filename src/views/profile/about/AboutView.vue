<script setup>
import AboutHero from "@/components/profile/about/AboutHero.vue"
import AboutSkills from "@/components/profile/about/AboutSkills.vue"
import AboutExperience from "@/components/profile/about/AboutExperience.vue"
import { useSeo } from "@/composables/useSeo"

// SEO
useSeo({
  title: '關於我',
  description: '了解 71BK 的技術背景、專業技能與工作經歷。擁有豐富的全端開發經驗，專注於打造高品質的網頁應用程式。'
})
</script>

<template>
  <div class="w-full max-w-[960px] mx-auto px-8 md:px-10 py-12 flex flex-col gap-16">
    <AboutHero />
    <AboutSkills />
    <AboutExperience />
  </div>
</template>
