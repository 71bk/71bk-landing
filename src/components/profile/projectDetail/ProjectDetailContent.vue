<script setup>
import { computed } from 'vue'
import { useMarkdown } from '@/composables/useMarkdown'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const { renderMarkdown } = useMarkdown()

// 使用 useMarkdown composable 渲染 Markdown 內容
const renderedContent = computed(() => {
  if (!props.project.content) return ''
  return renderMarkdown(props.project.content)
})
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <!-- 
      使用 Tailwind Typography 的 prose class 美化文章排版：
      - prose: 啟用 Typography 插件樣式
      - prose-slate: 使用 slate 色系
      - prose-lg: 較大的字體尺寸
      - prose-invert: 深色模式反轉
      - max-w-none: 移除最大寬度限制
    -->
    <article class="prose prose-slate prose-lg prose-invert max-w-none
                    prose-headings:text-main prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-muted prose-p:leading-relaxed
                    prose-li:text-muted
                    prose-strong:text-main
                    prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-surface prose-pre:border prose-pre:border-border
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-primary prose-blockquote:text-muted">
      <div v-html="renderedContent"></div>
    </article>
  </section>
</template>
