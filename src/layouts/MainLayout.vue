<script setup>
import SiteNav from "@/components/common/SiteNav.vue";
import SiteFooter from "@/components/common/SiteFooter.vue";
</script>

<template>
  <div class="min-h-screen bg-background text-main font-sans antialiased selection:bg-primary/20 selection:text-primary">
    <SiteNav />
    <main>
      <router-view />
    </main>
    <SiteFooter />
  </div>
</template>
