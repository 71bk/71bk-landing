<script setup>
/**
 * PortfolioEditorView - 作品編輯頁面
 * 
 * 整合 ProjectForm（Meta 區塊）與 MarkdownEditor（內容編輯）
 * 支援新增與編輯模式
 */
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectForm from '@/components/admin/ProjectForm.vue'
import MarkdownEditor from '@/components/admin/MarkdownEditor.vue'
import { getProjectBySlug } from '@/data/mockData'

const route = useRoute()
const router = useRouter()

// 判斷編輯模式
const isEditMode = computed(() => !!route.params.slug)
const pageTitle = computed(() => isEditMode.value ? '編輯作品' : '新增作品')

// 表單狀態
const project = ref({
  titleZh: '',
  titleEn: '',
  summaryZh: '',
  summaryEn: '',
  coverImageUrl: '',
  category: 'FRONTEND',
  difficultyScore: 3,
  impactScore: 3,
  techs: [],
  links: []
})

// Markdown 內容
const contentMdZh = ref('')
const contentMdEn = ref('')

// 當前編輯的語言
const currentLang = ref('zh')

// 切換內容對應 computed
const currentContent = computed({
  get: () => currentLang.value === 'zh' ? contentMdZh.value : contentMdEn.value,
  set: (value) => {
    if (currentLang.value === 'zh') {
      contentMdZh.value = value
    } else {
      contentMdEn.value = value
    }
  }
})

// 載入作品資料（編輯模式）
const loadProject = () => {
  if (isEditMode.value && route.params.slug) {
    const existingProject = getProjectBySlug(route.params.slug)
    if (existingProject) {
      project.value = {
        titleZh: existingProject.titleZh || '',
        titleEn: existingProject.titleEn || '',
        summaryZh: existingProject.summaryZh || '',
        summaryEn: existingProject.summaryEn || '',
        coverImageUrl: existingProject.coverImageUrl || '',
        category: existingProject.category || 'FRONTEND',
        difficultyScore: existingProject.difficultyScore || 3,
        impactScore: existingProject.impactScore || 3,
        techs: existingProject.techs || [],
        links: existingProject.links || []
      }
      contentMdZh.value = existingProject.contentMdZh || ''
      contentMdEn.value = existingProject.contentMdEn || ''
    }
  }
}

onMounted(() => {
  loadProject()
})

watch(() => route.params.slug, () => {
  loadProject()
})

// 儲存狀態
const isSaving = ref(false)
const isDirty = ref(false)

// 監聽變更
watch([project, contentMdZh, contentMdEn], () => {
  isDirty.value = true
}, { deep: true })

// 儲存作品
const handleSave = async () => {
  isSaving.value = true
  
  const payload = {
    ...project.value,
    contentMdZh: contentMdZh.value,
    contentMdEn: contentMdEn.value
  }
  
  console.log('Saving project:', payload)
  
  // TODO: 呼叫 API 儲存
  // await projectsApi.save(payload)
  
  setTimeout(() => {
    isSaving.value = false
    isDirty.value = false
    alert('儲存成功！（目前為 Mock 狀態）')
  }, 500)
}

// 取消編輯
const handleCancel = () => {
  if (isDirty.value) {
    if (!confirm('您有未儲存的變更，確定要離開嗎？')) {
      return
    }
  }
  router.push('/admin/portfolio')
}

// 預覽作品
const handlePreview = () => {
  // 開新視窗預覽
  const previewUrl = `/projects/${route.params.slug || 'preview'}`
  window.open(previewUrl, '_blank')
}
</script>

<template>
  <section class="admin-page admin-portfolio-editor">
    <!-- 頁面標題 -->
    <div class="editor-header">
      <div class="header-left">
        <h1>{{ pageTitle }}</h1>
        <span v-if="isDirty" class="dirty-indicator">● 未儲存</span>
      </div>
      <div class="header-actions">
        <button 
          type="button" 
          class="admin-btn admin-btn-secondary"
          @click="handleCancel"
        >
          取消
        </button>
        <button 
          type="button" 
          class="admin-btn admin-btn-secondary"
          @click="handlePreview"
        >
          預覽
        </button>
        <button 
          type="button" 
          class="admin-btn admin-btn-primary"
          :disabled="isSaving"
          @click="handleSave"
        >
          {{ isSaving ? '儲存中...' : '儲存' }}
        </button>
      </div>
    </div>

    <!-- Meta 表單區塊 -->
    <ProjectForm 
      :project="project"
      @update:project="project = $event"
    />

    <!-- Markdown 內容編輯區塊 -->
    <div class="content-section">
      <div class="content-header">
        <h3 class="content-title">📄 內容編輯</h3>
        
        <!-- 語言切換 -->
        <div class="lang-tabs">
          <button 
            type="button"
            class="lang-tab"
            :class="{ active: currentLang === 'zh' }"
            @click="currentLang = 'zh'"
          >
            中文
          </button>
          <button 
            type="button"
            class="lang-tab"
            :class="{ active: currentLang === 'en' }"
            @click="currentLang = 'en'"
          >
            English
          </button>
        </div>
      </div>
      
      <MarkdownEditor 
        v-model="currentContent"
        :key="currentLang"
        :placeholder="currentLang === 'zh' 
          ? '## 專案背景\n\n描述此專案的背景與動機...\n\n## 技術架構\n\n- 前端：Vue 3\n- 後端：Spring Boot\n- 資料庫：MySQL'
          : '## Background\n\nDescribe the project background...\n\n## Tech Stack\n\n- Frontend: Vue 3\n- Backend: Spring Boot\n- Database: MySQL'"
      />
    </div>

    <!-- Markdown 小提示 -->
    <div class="markdown-tips">
      <h4>💡 Markdown 語法提示</h4>
      <div class="tips-grid">
        <div class="tip-item">
          <code>## 標題</code>
          <span>大標題</span>
        </div>
        <div class="tip-item">
          <code>### 標題</code>
          <span>小標題</span>
        </div>
        <div class="tip-item">
          <code>**粗體**</code>
          <span>粗體文字</span>
        </div>
        <div class="tip-item">
          <code>*斜體*</code>
          <span>斜體文字</span>
        </div>
        <div class="tip-item">
          <code>- 項目</code>
          <span>無序列表</span>
        </div>
        <div class="tip-item">
          <code>1. 項目</code>
          <span>有序列表</span>
        </div>
        <div class="tip-item">
          <code>`程式碼`</code>
          <span>行內程式碼</span>
        </div>
        <div class="tip-item">
          <code>[文字](URL)</code>
          <span>連結</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-portfolio-editor {
  max-width: 1200px;
  margin: 0 auto;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(var(--color-border));
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-left h1 {
  margin-bottom: 0;
}

.dirty-indicator {
  color: #f59e0b;
  font-size: 0.875rem;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

/* 內容編輯區 */
.content-section {
  margin-top: 1.5rem;
  background-color: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.75rem;
  overflow: hidden;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.content-section :deep(.markdown-editor) {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: rgb(var(--color-background));
  border-bottom: 1px solid rgb(var(--color-border));
}

.content-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
  margin: 0;
}

.lang-tabs {
  display: flex;
  gap: 0.5rem;
}

.lang-tab {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.375rem;
  background-color: rgb(var(--color-surface));
  color: rgb(var(--color-text-muted));
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-tab:hover {
  border-color: rgb(var(--color-primary));
  color: rgb(var(--color-primary));
}

.lang-tab.active {
  background-color: rgb(var(--color-primary));
  border-color: rgb(var(--color-primary));
  color: white;
}

/* Markdown 提示 */
.markdown-tips {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background-color: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.75rem;
}

.markdown-tips h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
  margin-bottom: 0.75rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.tip-item code {
  padding: 0.25rem 0.5rem;
  background-color: rgb(var(--color-background));
  border-radius: 0.25rem;
  font-family: monospace;
  color: rgb(var(--color-primary));
}

.tip-item span {
  color: rgb(var(--color-text-muted));
}
</style>
