<script setup>
const skillGroups = [
  {
    title: "Frontend",
    skills: ["Vue 3 / Vite", "React", "Tailwind CSS", "TypeScript", "JavaScript"],
  },
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "Spring Security", "JWT / OAuth2","REST APIs"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git","Docker", "AWS/ Vercel", "MySQL","SQLServer","Cloudflare"],
  },
];
</script>

<template>
  <section class="flex flex-col gap-8">
    <div class="flex flex-col gap-2 border-b border-border pb-4">
      <h2 class="text-2xl font-bold text-main">{{ $t("about.skills.title") }}</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="group in skillGroups" :key="group.title" class="flex flex-col gap-4">
        <h3 class="text-xs uppercase tracking-widest font-bold text-muted/60 font-mono">{{ group.title }}</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in group.skills"
            :key="`${group.title}-${skill}`"
            class="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary tracking-wider uppercase hover:bg-primary hover:text-white transition-all cursor-default shadow-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
