<script setup>
const experiences = [
  {
    role: "about.experience.entry1.role",
    period: "about.experience.entry1.period",
    achievements: [
      "about.experience.entry1.achievement1",
      "about.experience.entry1.achievement2",
      "about.experience.entry1.achievement3",
    ],
  },
  {
    role: "about.experience.entry2.role",
    period: "about.experience.entry2.period",
    achievements: [
      "about.experience.entry2.achievement1",
      "about.experience.entry2.achievement2",
    ],
  },
];
</script>

<template>
  <section class="flex flex-col gap-8">
    <div class="flex flex-col gap-2 border-b border-border pb-4">
      <h2 class="text-2xl font-bold text-main">{{ $t("about.experience.title") }}</h2>
    </div>
    <div class="relative pl-2 md:pl-4 space-y-10">
      <div class="absolute left-[8px] md:left-[16px] top-2 bottom-2 w-px bg-border"></div>
      <div v-for="entry in experiences" :key="entry.role" class="relative flex gap-8 group">
        <div
          class="relative z-10 flex-none w-4 h-4 rounded-full bg-background border-2 border-border mt-1.5 group-hover:border-primary group-hover:bg-primary transition-all duration-300"
        ></div>
        <div class="flex-1 flex flex-col gap-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 class="text-lg font-bold text-main group-hover:text-primary transition-colors">{{ $t(entry.role) }}</h3>
            <p class="text-xs font-mono font-medium text-muted">{{ $t(entry.period) }}</p>
          </div>
          <div class="space-y-1.5">
            <p
              v-for="achievement in entry.achievements"
              :key="achievement"
              class="text-sm text-muted leading-relaxed"
            >
              {{ $t(achievement) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
