<script setup>
import ProjectsHero from "@/components/profile/projects/ProjectsHero.vue";
import ProjectsFilters from "@/components/profile/projects/ProjectsFilters.vue";
import ProjectsGrid from "@/components/profile/projects/ProjectsGrid.vue";
import CursorPreview from "@/components/overlays/CursorPreview.vue";
import { useSeo } from "@/composables/useSeo";

// SEO
useSeo({
  title: '作品集',
  description: '瀏覽 71BK 的專案作品集，包含全端、前端開發、後端開發等多種類型的專案展示。'
})
</script>

<template>
  <div class="flex flex-col">
    <!-- Cursor Preview (滑鼠跟隨預覽圖) -->
    <CursorPreview />

    <main class="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      <ProjectsHero />
      <ProjectsFilters>
        <ProjectsGrid />
      </ProjectsFilters>
    </main>
  </div>
</template>
