<script setup>
import { useRoute } from 'vue-router'
import publicAnalytics from '@/api/publicAnalytics'

const route = useRoute()

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const handleLinkClick = (link) => {
  const payload = {
    eventType: 'LINK_CLICK',
    path: route.fullPath
  }
  if (props.project?.id != null) payload.projectId = props.project.id
  if (link?.id != null) payload.linkId = link.id

  void publicAnalytics.trackEvent(payload).catch(() => {})
}
</script>

<template>
  <section class="relative pt-16 pb-12 lg:pt-24 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-wider mb-8 border border-primary/20 shadow-sm">
        <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
        Case_Study
      </div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-main tracking-tight leading-[1.1] mb-6">
        {{ project.title }}
      </h1>
      <p class="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-10">
        {{ project.summary }}
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          v-for="link in project.links?.filter(l => l.type === 'DEMO')"
          :key="link.id"
          :href="link.url"
          target="_blank"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-mono font-bold text-surface bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group"
          @click="handleLinkClick(link)"
        >
          <span class="material-symbols-outlined text-[20px] group-hover:-translate-y-0.5 transition-transform">rocket_launch</span>
          {{ link.label || 'Live Demo' }}
        </a>
        <a
          v-for="link in project.links?.filter(l => l.type === 'GITHUB')"
          :key="link.id"
          :href="link.url"
          target="_blank"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-mono font-bold text-main bg-surface border border-border rounded-lg hover:bg-background transition-all group"
          @click="handleLinkClick(link)"
        >
          <span class="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">code</span>
          {{ link.label || 'View Code' }}
        </a>
      </div>
    </div>
  </section>
</template>
