<script setup>
/**
 * MarkdownEditor - Split View Markdown 編輯器
 * 
 * 左側：Markdown 編輯區
 * 右側：即時預覽區（套用與前台相同的 prose 樣式）
 */
import { computed } from 'vue'
import { useMarkdown } from '@/composables/useMarkdown'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '請輸入 Markdown 內容...\n\n## 標題範例\n\n- 列表項目 1\n- 列表項目 2\n\n**粗體文字** 與 *斜體文字*'
  }
})

const emit = defineEmits(['update:modelValue'])

const { renderMarkdown } = useMarkdown()

// 雙向綁定處理
const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 即時渲染預覽
const renderedContent = computed(() => {
  return renderMarkdown(props.modelValue)
})
</script>

<template>
  <div class="markdown-editor">
    <!-- 左側編輯區 -->
    <div class="editor-section">
      <div class="editor-header">
        <span class="editor-header-icon">✏️</span>
        <span class="editor-header-title">編輯 (Markdown)</span>
      </div>
      <textarea 
        v-model="content"
        :placeholder="placeholder"
        class="editor-textarea"
        spellcheck="false"
      ></textarea>
    </div>
    
    <!-- 右側預覽區 -->
    <div class="preview-section">
      <div class="editor-header">
        <span class="editor-header-icon">👁️</span>
        <span class="editor-header-title">預覽</span>
      </div>
      <div class="preview-content-wrapper">
        <!-- 
          套用與前台 ProjectDetailContent 完全相同的 prose 樣式
          確保後台預覽 = 前台呈現
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
                        prose-blockquote:border-l-primary prose-blockquote:text-muted
                        preview-content">
          <div v-if="renderedContent" v-html="renderedContent"></div>
          <p v-else class="text-muted italic">預覽區域 - 開始輸入 Markdown 內容...</p>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.markdown-editor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 500px;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: rgb(var(--color-surface));
}

/* 響應式：手機版上下排列 */
@media (max-width: 768px) {
  .markdown-editor {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}

.editor-section,
.preview-section {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.editor-section {
  border-right: 1px solid rgb(var(--color-border));
}

@media (max-width: 768px) {
  .editor-section {
    border-right: none;
    border-bottom: 1px solid rgb(var(--color-border));
  }
}

.editor-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgb(var(--color-background));
  border-bottom: 1px solid rgb(var(--color-border));
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--color-text-muted));
}

.editor-header-icon {
  font-size: 1rem;
}

.editor-header-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.editor-textarea {
  flex: 1;
  width: 100%;
  padding: 1rem;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  line-height: 1.6;
  border: none;
  resize: none;
  background-color: rgb(var(--color-surface));
  color: rgb(var(--color-text-main));
  overflow-y: auto;
}

.editor-textarea:focus {
  outline: none;
}

.editor-textarea::placeholder {
  color: rgb(var(--color-text-muted));
  opacity: 0.6;
}

.preview-content-wrapper {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: rgb(var(--color-surface));
}

.preview-content {
  min-height: 100%;
}
</style>
