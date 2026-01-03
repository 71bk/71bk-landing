<script setup>
import SiteNav from "@/components/profile/common/SiteNav.vue";
import SiteFooter from "@/components/profile/common/SiteFooter.vue";
import ChatPopup from "@/components/profile/chat/ChatPopup.vue";
import LoadingOverlay from "@/components/overlays/LoadingOverlay.vue";
import TransitionOverlay from "@/components/overlays/TransitionOverlay.vue";
import MenuOverlay from "@/components/overlays/MenuOverlay.vue";
import { useUiStore } from "@/stores/ui";
import { watch } from "vue";
import { useRoute } from "vue-router";
import publicAnalytics from "@/api/publicAnalytics";

const uiStore = useUiStore();
const route = useRoute();

// 當任何 overlay 活動時，鎖定頁面滾動
watch(
  () => uiStore.shouldLockScroll,
  (shouldLock) => {
    document.body.style.overflow = shouldLock ? "hidden" : "";
  }
);

const trackPageView = (path) => {
  void publicAnalytics
    .trackEvent({ eventType: "PAGE_VIEW", path })
    .catch(() => {});
};

watch(
  () => route.fullPath,
  (path) => {
    trackPageView(path);
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen bg-background text-main font-sans antialiased selection:bg-primary/20 selection:text-primary relative">
    <!-- Subtle Grid Background -->
    <div
      class="fixed inset-0 -z-10 h-full w-full opacity-[0.03] pointer-events-none"
      style="background-image:
        linear-gradient(rgb(var(--color-text-main)) 1px, transparent 1px),
        linear-gradient(90deg, rgb(var(--color-text-main)) 1px, transparent 1px);
        background-size: 40px 40px;"
    ></div>

    <!-- Overlay Layers (z-index: 8000-9999) -->
    <LoadingOverlay />
    <TransitionOverlay />
    <MenuOverlay />

    <!-- Site Content -->
    <SiteNav />
    <main>
      <router-view />
    </main>
    <SiteFooter />
    <ChatPopup />
  </div>
</template>
