<script setup>
const avatarUrl = "/hero-bg.jpg";
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center py-8">
    <!-- Left: Content -->
    <div class="flex flex-col items-start gap-6 order-2 md:order-1">
      <!-- Status Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-xs font-mono font-bold text-emerald-600 tracking-wide uppercase">Available for work</span>
      </div>

      <!-- Headings -->
      <div class="space-y-2">
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-main">
           {{ $t("about.hero.name") }}
          <span class="text-primary">.</span>
        </h1>
        <h2 class="text-xl sm:text-2xl font-bold text-muted">{{ $t("about.hero.title") }}</h2>
      </div>

      <!-- Description -->
      <p class="text-base text-muted leading-relaxed max-w-lg">
        {{ $t("about.hero.subtitle") }}
      </p>

      <!-- Decorative Line -->
      <div class="h-1 w-20 bg-primary/20 rounded-full mt-2"></div>
    </div>

    <!-- Right: Visual -->
    <div class="relative order-1 md:order-2 flex justify-center md:justify-end">
      <div class="relative w-64 h-64 sm:w-72 sm:h-72 group">
        <!-- Decorative blob behind -->
        <div class="absolute inset-0 bg-primary/10 rounded-tr-[4rem] rounded-bl-[4rem] -rotate-6 transform transition-transform duration-500 group-hover:rotate-0"></div>
        
        <!-- Avatar Image -->
        <div 
          class="absolute inset-0 bg-cover bg-center rounded-tr-[3rem] rounded-bl-[3rem] border-4 border-surface shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
          :style="{ backgroundImage: `url('${avatarUrl}')` }"
        ></div>
        
        <!-- Floating Tech Badge -->
        <div class="absolute -bottom-4 -left-4 bg-surface p-3 rounded-xl shadow-lg border border-border flex items-center gap-3 animate-bounce-slow">
          <div class="bg-primary/10 p-2 rounded-lg">
            <span class="material-symbols-outlined text-primary text-xl">terminal</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] text-muted font-mono uppercase tracking-wider">Role</span>
            <span class="text-sm font-bold text-main font-mono">Full Stack</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
