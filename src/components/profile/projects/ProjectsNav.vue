<template>
  <header class="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="size-8 text-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">terminal</span>
        </div>
        <RouterLink class="text-white text-lg font-bold tracking-tight" to="/">
          71BK Portfolio
        </RouterLink>
      </div>
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink class="text-slate-400 hover:text-white text-sm font-medium transition-colors" to="/">Home</RouterLink>
        <RouterLink class="text-white text-sm font-medium transition-colors" to="/projects">Projects</RouterLink>
        <RouterLink class="text-slate-400 hover:text-white text-sm font-medium transition-colors" to="/about">About</RouterLink>
        <RouterLink class="text-slate-400 hover:text-white text-sm font-medium transition-colors" to="/contact">Contact</RouterLink>
      </nav>
      <button class="md:hidden text-slate-300 hover:text-white" type="button">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </header>
</template>
