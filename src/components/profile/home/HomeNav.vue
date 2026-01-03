<template>
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface">
          <span class="material-symbols-outlined text-xl font-bold">terminal</span>
        </div>
        <RouterLink class="text-xl font-bold tracking-tight text-main" to="/home">71BK</RouterLink>
      </div>
      <nav class="hidden items-center gap-8 md:flex">
        <a class="text-sm font-medium text-muted transition-colors hover:text-primary" href="#work">Work</a>
        <a class="text-sm font-medium text-muted transition-colors hover:text-primary" href="#skills">Skills</a>
        <a class="text-sm font-medium text-muted transition-colors hover:text-primary" href="#skills">About</a>
        <a class="text-sm font-medium text-muted transition-colors hover:text-primary" href="#contact">Contact</a>
      </nav>
      <div class="flex items-center gap-4">
        <a
          class="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-surface shadow-sm transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:block"
          href="#contact"
        >
          Get in Touch
        </a>
        <button class="p-2 text-main md:hidden" type="button">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  </header>
</template>
