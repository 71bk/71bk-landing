<script setup>
import { onMounted } from 'vue'
import HeroSection from "@/components/profile/home/HeroSection.vue"
import FeaturedProjects from "@/components/profile/home/FeaturedProjects.vue"
import SkillsSection from "@/components/profile/home/SkillsSection.vue"
import CtaSection from "@/components/profile/home/CtaSection.vue"
import { useSeo } from "@/composables/useSeo"

// SEO
useSeo({
  title: '首頁',
  description: '71BK - 專業全端工程師，專精於 Vue.js、React、Node.js、Spring Boot 開發。打造高品質網頁應用程式與全端解決方案。'
})
</script>

<template>
  <HeroSection />
  <FeaturedProjects />
  <SkillsSection />
  <CtaSection />
</template>
