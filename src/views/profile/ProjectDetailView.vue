<script setup>
defineProps({
  slug: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="page page-project-detail">
    <h1>Project Detail</h1>
    <p>Slug: {{ slug }}</p>
    <p>Problem → Solution → Impact 區塊待補。</p>
  </section>
</template>
