<script setup>
import SkeletonLoader from '@/components/profile/common/SkeletonLoader.vue'
</script>

<template>
  <div class="flex flex-col bg-surface rounded-xl overflow-hidden border border-border">
    <!-- Image Area -->
    <div class="relative h-48 w-full bg-slate-100 dark:bg-slate-800 animate-pulse border-b border-border/50">
       <!-- Category Badge Placeholder -->
       <div class="absolute bottom-3 left-3">
          <SkeletonLoader width="60px" height="20px" border-radius="4px" class="opacity-60" />
       </div>
    </div>
    
    <!-- Content Area -->
    <div class="p-5 flex flex-col flex-1 gap-4">
      <!-- Title -->
      <SkeletonLoader width="70%" height="24px" border-radius="4px" />
      
      <!-- Summary (2 lines) -->
      <div class="flex flex-col gap-2">
        <SkeletonLoader width="100%" height="14px" />
        <SkeletonLoader width="90%" height="14px" />
      </div>
      
      <!-- Tags Area (Simulate mt-auto) -->
      <div class="mt-auto pt-4 border-t border-border flex gap-2">
        <SkeletonLoader width="40px" height="20px" border-radius="4px" />
        <SkeletonLoader width="50px" height="20px" border-radius="4px" />
        <SkeletonLoader width="45px" height="20px" border-radius="4px" />
      </div>
    </div>
  </div>
</template>
