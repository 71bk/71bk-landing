<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="editor-header admin-mb-3">
      <h1>{{ isEditMode ? '編輯專案' : '新增專案' }}</h1>
      <div class="header-actions">
        <router-link to="/admin/projects" class="admin-btn admin-btn-secondary">
          取消
        </router-link>
        <button 
          class="admin-btn admin-btn-primary" 
          :disabled="isSaving"
          @click="handleSave"
        >
          {{ isSaving ? '儲存中...' : '儲存專案' }}
        </button>
      </div>
    </div>

    <div v-if="isEditMode" class="admin-card admin-mb-3 analytics-summary">
      <div class="admin-flex-between admin-mb-2">
        <h3 class="admin-card-title">Project Analytics (7d)</h3>
        <span v-if="isAnalyticsLoading" class="analytics-status">Loading...</span>
      </div>
      <div class="analytics-grid">
        <div class="analytics-item">
          <div class="analytics-label">Views</div>
          <div class="analytics-value">{{ analyticsSummary.views.toLocaleString() }}</div>
        </div>
        <div class="analytics-item">
          <div class="analytics-label">Link Clicks</div>
          <div class="analytics-value">{{ analyticsSummary.linkClicks.toLocaleString() }}</div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="admin-card loading-state">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Main Grid Layout: 2/3 + 1/3 -->
      <div class="editor-grid">
        <!-- Left: Main Content Area -->
        <div class="editor-main">
          <!-- Tabs Navigation -->
          <div class="tabs-nav admin-mb-2">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              :class="['tab-btn', { active: activeTab === tab.key }]"
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="admin-card">
            <!-- Tab 1: 繁體中文 -->
            <div v-show="activeTab === 'zh'" class="tab-content">
              <div class="admin-mb-2">
                <label class="admin-label">標題</label>
                <input
                  v-model="form.titleZh"
                  type="text"
                  class="admin-input"
                  placeholder="輸入作品標題..."
                />
              </div>
              <div class="admin-mb-2">
                <label class="admin-label">摘要</label>
                <textarea
                  v-model="form.summaryZh"
                  class="admin-textarea"
                  placeholder="輸入作品摘要..."
                  rows="3"
                ></textarea>
              </div>
              <div class="admin-mb-2">
                <label class="admin-label">內容 (Markdown)</label>
                <MarkdownEditor
                  v-model="form.contentMdZh"
                  placeholder="使用 Markdown 格式撰寫作品詳情...

## 專案背景

描述此專案的背景與動機...

## 技術架構

- 前端：Vue 3
- 後端：Spring Boot"
                />
              </div>
            </div>

            <!-- Tab 2: English -->
            <div v-show="activeTab === 'en'" class="tab-content">
              <div class="admin-mb-2">
                <label class="admin-label">Title</label>
                <input
                  v-model="form.titleEn"
                  type="text"
                  class="admin-input"
                  placeholder="Enter project title..."
                />
              </div>
              <div class="admin-mb-2">
                <label class="admin-label">Summary</label>
                <textarea
                  v-model="form.summaryEn"
                  class="admin-textarea"
                  placeholder="Enter project summary..."
                  rows="3"
                ></textarea>
              </div>
              <div class="admin-mb-2">
                <label class="admin-label">Content (Markdown)</label>
                <MarkdownEditor
                  v-model="form.contentMdEn"
                  placeholder="Write project details in Markdown...

## Background

Describe the project background...

## Tech Stack

- Frontend: Vue 3
- Backend: Spring Boot"
                />
              </div>
            </div>

            <!-- Tab 3: External Links -->
            <div v-show="activeTab === 'links'" class="tab-content">
              <div class="links-header admin-mb-2">
                <h3 class="admin-card-title">外部連結</h3>
                <button class="admin-btn admin-btn-secondary btn-sm" @click="addLink">
                  + 新增連結
                </button>
              </div>

              <div v-if="form.projectLinks.length === 0" class="empty-state">
                尚未新增任何連結。點擊「新增連結」開始新增。
              </div>

              <div
                v-for="(link, index) in form.projectLinks"
                :key="index"
                class="link-row admin-mb-2"
              >
                <div class="link-order-controls">
                  <button
                    class="order-btn"
                    :disabled="index === 0"
                    @click="moveLinkUp(index)"
                    title="上移"
                  >
                    ▲
                  </button>
                  <span class="order-number">{{ index + 1 }}</span>
                  <button
                    class="order-btn"
                    :disabled="index === form.projectLinks.length - 1"
                    @click="moveLinkDown(index)"
                    title="下移"
                  >
                    ▼
                  </button>
                </div>
                <div class="link-fields">
                  <select v-model="link.type" class="admin-input link-type">
                    <option value="DEMO">展示</option>
                    <option value="GITHUB">GitHub</option>
                    <option value="DOC">文件</option>
                    <option value="BLOG">部落格</option>
                    <option value="OTHER">其他</option>
                  </select>
                  <input
                    v-model="link.label"
                    type="text"
                    class="admin-input link-label"
                    placeholder="標籤名稱"
                  />
                  <input
                    v-model="link.url"
                    type="url"
                    class="admin-input link-url"
                    placeholder="https://..."
                  />
                </div>
                <button
                  class="admin-btn admin-btn-danger btn-sm"
                  @click="removeLink(index)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Settings Sidebar -->
        <div class="editor-sidebar">
          <div class="admin-card">
            <h3 class="admin-card-title admin-mb-2">設定</h3>

            <!-- Slug -->
            <div class="admin-mb-2">
              <label class="admin-label">網址代稱 (Slug)</label>
              <div class="slug-input-group">
                <input
                  v-model="form.slug"
                  type="text"
                  class="admin-input"
                  placeholder="my-project-slug"
                />
                <button
                  type="button"
                  class="admin-btn admin-btn-secondary btn-sm"
                  @click="generateSlug"
                  title="從英文標題自動產生"
                >
                  自動產生
                </button>
              </div>
              <small class="slug-hint">點擊「自動產生」從英文標題轉換</small>
            </div>

            <!-- Status -->
            <div class="admin-mb-2">
              <label class="admin-label">狀態</label>
              <select v-model="form.status" class="admin-input">
                <option value="DRAFT">草稿</option>
                <option value="PUBLISHED">已發布</option>
                <option value="ARCHIVED">已封存</option>
              </select>
            </div>

            <!-- Category -->
            <div class="admin-mb-2">
              <label class="admin-label">分類</label>
              <select v-model="form.category" class="admin-input">
                <option value="">選擇分類...</option>
                <option value="SYSTEM">全端</option>
                <option value="FRONTEND">前端</option>
                <option value="BACKEND">後端</option>
                <option value="TOOL">工具</option>
              </select>
            </div>

            <!-- Featured -->
            <div class="admin-mb-2">
              <label class="checkbox-label">
                <input v-model="form.featured" type="checkbox" />
                <span>精選專案</span>
              </label>
            </div>

            <!-- Cover Image -->
            <div class="admin-mb-3">
              <label class="admin-label">封面圖片</label>
              
              <!-- Upload Button -->
              <div class="cover-upload-area">
                <input
                  ref="coverFileInput"
                  type="file"
                  accept="image/*"
                  class="hidden-file-input"
                  @change="handleCoverUpload"
                />
                <button
                  type="button"
                  class="admin-btn admin-btn-secondary"
                  :disabled="isUploading"
                  @click="triggerCoverUpload"
                >
                  {{ isUploading ? '上傳中...' : '📁 選擇圖片' }}
                </button>
                <span class="upload-hint">或直接貼上圖片網址</span>
              </div>
              
              <!-- URL Input -->
              <input
                v-model="form.coverImageUrl"
                type="url"
                class="admin-input admin-mt-1"
                placeholder="https://example.com/image.jpg"
              />
              
              <!-- Preview -->
              <div v-if="form.coverImageUrl" class="cover-preview admin-mt-1">
                <img :src="form.coverImageUrl" alt="封面預覽" />
                <button
                  type="button"
                  class="remove-cover-btn"
                  @click="form.coverImageUrl = ''"
                  title="移除封面"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- Tech Tags Card -->
          <div class="admin-card admin-mt-2">
            <h3 class="admin-card-title admin-mb-2">技術標籤</h3>
            <div v-if="availableTechs.length > 0" class="tech-tags-grid">
              <label
                v-for="tech in availableTechs"
                :key="tech.id"
                class="checkbox-label"
              >
                <input
                  type="checkbox"
                  :value="tech.id"
                  v-model="form.techIds"
                />
                <span>{{ tech.name }}</span>
              </label>
            </div>
            <p v-else class="no-techs">載入中...</p>
          </div>

          <!-- Scores Card -->
          <div class="admin-card admin-mt-2">
            <h3 class="admin-card-title admin-mb-2">評分</h3>
            <div class="admin-mb-2">
              <label class="admin-label">難度 (1-5)</label>
              <input
                v-model.number="form.difficultyScore"
                type="number"
                min="1"
                max="5"
                class="admin-input"
              />
            </div>
            <div class="admin-mb-2">
              <label class="admin-label">影響力 (1-5)</label>
              <input
                v-model.number="form.impactScore"
                type="number"
                min="1"
                max="5"
                class="admin-input"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import portfolioApi from '@/api/portfolio'
import analyticsApi from '@/api/analytics'
import techsApi from '@/api/techs'
import uploadApi from '@/api/upload'
import MarkdownEditor from '@/components/admin/MarkdownEditor.vue'

const route = useRoute()
const router = useRouter()

// Check if edit mode
const isEditMode = computed(() => !!route.params.id)

// State
const isLoading = ref(false)
const isSaving = ref(false)
const isUploading = ref(false)
const availableTechs = ref([])
const isAnalyticsLoading = ref(false)
const projectAnalytics = ref(null)

const analyticsDays = 7

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const analyticsSummary = computed(() => ({
  views: toNumber(projectAnalytics.value?.views, 0),
  linkClicks: toNumber(projectAnalytics.value?.linkClicks, 0)
}))

const loadProjectAnalytics = async (projectId) => {
  if (!projectId) return
  try {
    isAnalyticsLoading.value = true
    projectAnalytics.value = await analyticsApi.getProjectAnalytics(projectId, analyticsDays)
  } catch (err) {
    console.error('Failed to load project analytics:', err)
    projectAnalytics.value = null
  } finally {
    isAnalyticsLoading.value = false
  }
}

// File input ref
const coverFileInput = ref(null)

// Trigger file upload dialog
const triggerCoverUpload = () => {
  coverFileInput.value?.click()
}

// Handle cover image upload
const handleCoverUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('請選擇圖片檔案')
    return
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('圖片大小不能超過 5MB')
    return
  }

  try {
    isUploading.value = true
    const result = await uploadApi.uploadFile(file)
    form.value.coverImageUrl = result.url
  } catch (err) {
    alert('上傳失敗：' + (err.message || '請稍後再試'))
    console.error('Failed to upload cover:', err)
  } finally {
    isUploading.value = false
    // Reset input so same file can be selected again
    event.target.value = ''
  }
}

// Tabs configuration
const tabs = [
  { key: 'zh', label: '繁體中文' },
  { key: 'en', label: 'English' },
  { key: 'links', label: '外部連結' }
]
const activeTab = ref('zh')

// Form data (camelCase to match API response)
const form = ref({
  slug: '',
  status: 'DRAFT',
  featured: false,
  sortOrder: 0,
  category: '',
  difficultyScore: 3,
  impactScore: 3,
  coverImageUrl: '',
  // Bilingual fields
  titleZh: '',
  titleEn: '',
  summaryZh: '',
  summaryEn: '',
  contentMdZh: '',
  contentMdEn: '',
  // Relations
  projectLinks: [],
  techIds: []
})

// Load data on mount
onMounted(async () => {
  // Load available techs
  try {
    availableTechs.value = await techsApi.getTechs()
  } catch (err) {
    console.error('Failed to load techs:', err)
  }

  // If edit mode, load project data
  if (isEditMode.value) {
    await loadProject()
  }
})

// Load project for editing
const loadProject = async () => {
  try {
    isLoading.value = true
    const project = await portfolioApi.getProject(route.params.id)
    
    // Map API response to form
    form.value = {
      slug: project.slug || '',
      status: project.status || 'DRAFT',
      featured: project.featured || false,
      sortOrder: project.sortOrder || 0,
      category: project.category || '',
      difficultyScore: project.difficultyScore || 3,
      impactScore: project.impactScore || 3,
      coverImageUrl: project.coverImageUrl || '',
      titleZh: project.titleZh || '',
      titleEn: project.titleEn || '',
      summaryZh: project.summaryZh || '',
      summaryEn: project.summaryEn || '',
      contentMdZh: project.contentMdZh || '',
      contentMdEn: project.contentMdEn || '',
      // API 回傳 'links'，前端用 'projectLinks'
      projectLinks: project.links || [],
      // API 回傳技術名稱字串陣列，需要轉換為 ID 陣列
      techIds: (project.techs || []).map(techName => {
        const found = availableTechs.value.find(t => t.name === techName)
        return found ? found.id : null
      }).filter(id => id !== null)
    }

    const projectId = project.id ?? route.params.id
    await loadProjectAnalytics(projectId)
  } catch (err) {
    alert('載入專案失敗')
    console.error('Failed to load project:', err)
    router.push('/admin/projects')
  } finally {
    isLoading.value = false
  }
}

// Link management
const addLink = () => {
  const nextSortOrder = form.value.projectLinks.length
  form.value.projectLinks.push({
    type: 'DEMO',
    label: '',
    url: '',
    sortOrder: nextSortOrder
  })
}

const removeLink = (index) => {
  form.value.projectLinks.splice(index, 1)
  // 重新計算 sortOrder
  form.value.projectLinks.forEach((link, i) => {
    link.sortOrder = i
  })
}

const moveLinkUp = (index) => {
  if (index > 0) {
    const links = form.value.projectLinks
    ;[links[index - 1], links[index]] = [links[index], links[index - 1]]
    // 更新 sortOrder
    links.forEach((link, i) => {
      link.sortOrder = i
    })
  }
}

const moveLinkDown = (index) => {
  const links = form.value.projectLinks
  if (index < links.length - 1) {
    ;[links[index], links[index + 1]] = [links[index + 1], links[index]]
    // 更新 sortOrder
    links.forEach((link, i) => {
      link.sortOrder = i
    })
  }
}

// Slug 自動產生
const generateSlug = () => {
  const title = form.value.titleEn || form.value.titleZh
  if (!title) {
    alert('請先輸入英文標題或中文標題')
    return
  }
  
  // 轉換規則：小寫、空格變連字號、移除特殊字符
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // 移除特殊字符
    .replace(/\s+/g, '-')           // 空格變連字號
    .replace(/-+/g, '-')            // 合併多個連字號
    .replace(/^-|-$/g, '')          // 移除首尾連字號
  
  form.value.slug = slug
}

// Save handler
const handleSave = async () => {
  try {
    isSaving.value = true
    
    let projectId = route.params.id
    
    // 1. 儲存專案主體 (不含 techs 和 links)
    const projectData = {
      slug: form.value.slug,
      status: form.value.status,
      featured: form.value.featured,
      sortOrder: form.value.sortOrder,
      category: form.value.category,
      difficultyScore: form.value.difficultyScore,
      impactScore: form.value.impactScore,
      coverImageUrl: form.value.coverImageUrl,
      titleZh: form.value.titleZh,
      titleEn: form.value.titleEn,
      summaryZh: form.value.summaryZh,
      summaryEn: form.value.summaryEn,
      contentMdZh: form.value.contentMdZh,
      contentMdEn: form.value.contentMdEn
    }
    
    if (isEditMode.value) {
      await portfolioApi.updateProject(projectId, projectData)
    } else {
      const newProject = await portfolioApi.createProject(projectData)
      projectId = newProject.id
    }
    
    // 2. 儲存技術標籤 (PUT 替換)
    if (form.value.techIds.length > 0 || isEditMode.value) {
      // 取得選中的技術名稱
      const selectedTechNames = availableTechs.value
        .filter(t => form.value.techIds.includes(t.id))
        .map(t => t.name)
      await portfolioApi.replaceProjectTechs(projectId, selectedTechNames)
    }
    
    // 3. 儲存外部連結
    // 對於編輯模式，需要處理新增、更新、刪除
    if (isEditMode.value) {
      // 取得現有連結
      const existingLinks = await portfolioApi.getProjectLinks(projectId)
      const existingIds = existingLinks.map(l => l.id)
      const currentIds = form.value.projectLinks.filter(l => l.id).map(l => l.id)
      
      // 刪除被移除的連結
      for (const existingId of existingIds) {
        if (!currentIds.includes(existingId)) {
          await portfolioApi.deleteProjectLink(projectId, existingId)
        }
      }
      
      // 更新或新增連結
      for (const link of form.value.projectLinks) {
        const linkData = {
          type: link.type,
          url: link.url,
          label: link.label || null,
          sortOrder: link.sortOrder
        }
        if (link.id) {
          // 更新現有連結
          await portfolioApi.updateProjectLink(projectId, link.id, linkData)
        } else {
          // 新增連結
          await portfolioApi.createProjectLink(projectId, linkData)
        }
      }
    } else {
      // 新增模式：直接建立所有連結
      for (const link of form.value.projectLinks) {
        await portfolioApi.createProjectLink(projectId, {
          type: link.type,
          url: link.url,
          label: link.label || null,
          sortOrder: link.sortOrder
        })
      }
    }
    
    router.push('/admin/projects')
  } catch (err) {
    alert('儲存失敗：' + (err.message || '請稍後再試'))
    console.error('Failed to save project:', err)
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
/* Header Layout */
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-header h1 {
  margin-bottom: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

/* Analytics summary */
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.analytics-item {
  text-align: center;
}

.analytics-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--color-text-muted));
}

.analytics-value {
  margin-top: 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
}

.analytics-status {
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
}

/* Loading state */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgb(var(--color-border));
  border-top-color: rgb(var(--color-primary));
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Grid Layout: 2/3 + 1/3 */
.editor-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .editor-grid {
    grid-template-columns: 1fr;
  }
}

/* Slug input group */
.slug-input-group {
  display: flex;
  gap: 0.5rem;
}

.slug-input-group .admin-input {
  flex: 1;
}

.slug-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
}

/* Cover Upload */
.cover-upload-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hidden-file-input {
  display: none;
}

.upload-hint {
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
}

.cover-preview {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgb(var(--color-border));
}

.cover-preview img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.remove-cover-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.2s;
}

.remove-cover-btn:hover {
  background-color: rgba(220, 38, 38, 0.9);
}

/* Tabs Navigation */
.tabs-nav {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid rgb(var(--color-border));
  padding-bottom: 0;
}

.tab-btn {
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: rgb(var(--color-text-muted));
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: -1px;
}

.tab-btn:hover {
  color: rgb(var(--color-text-main));
}

.tab-btn.active {
  color: rgb(var(--color-primary));
  border-bottom-color: rgb(var(--color-primary));
}

/* Tab Content */
.tab-content {
  min-height: 400px;
}

/* Content Editor */
.content-editor {
  min-height: 300px;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Links Section */
.links-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.link-order-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}

.order-btn {
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.625rem;
  color: rgb(var(--color-text-muted));
  transition: all 0.2s ease;
}

.order-btn:hover:not(:disabled) {
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-text-main));
}

.order-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.order-number {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(var(--color-text-muted));
  min-width: 20px;
  text-align: center;
}

.link-fields {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.link-type {
  width: 120px;
  flex-shrink: 0;
}

.link-label {
  width: 130px;
  flex-shrink: 0;
}

.link-url {
  flex: 1;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: rgb(var(--color-text-muted));
  background-color: rgb(var(--color-background));
  border-radius: 0.5rem;
}

/* Checkbox Label */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: rgb(var(--color-text-main));
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: rgb(var(--color-primary));
}

/* Tech Tags Grid */
.tech-tags-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.no-techs {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
}

/* Cover Preview */
.cover-preview {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgb(var(--color-border));
}

.cover-preview img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

/* Small Button */
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

/* Sidebar cards alignment */
.editor-sidebar .admin-card {
  text-align: left;
}
</style>
