<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-6 max-w-4xl">
    <h1 class="text-main text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
      {{ t("projects.heroTitle") }}
    </h1>
    <div class="h-1 w-20 bg-primary/20 rounded-full"></div>
  </div>
</template>
