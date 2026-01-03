<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

// 暫時不顯示 Gallery（等有實際圖片資料再啟用）
</script>

<template>
  <!-- Gallery 區塊（目前隱藏，等有圖片資料再顯示）-->
  <section v-if="false" class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold text-main mb-6">Gallery</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- 圖片會在這裡顯示 -->
    </div>
  </section>
</template>
