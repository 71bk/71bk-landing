<script setup>
/**
 * ProjectForm - 作品 Meta 資訊表單
 * 
 * 包含：標題、摘要、封面圖、分類、分數、技術標籤、外部連結
 */
import { ref, computed, watch } from 'vue'
import { mockTechs, mockCategories } from '@/data/mockData'

const props = defineProps({
  project: {
    type: Object,
    default: () => ({
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
  }
})

const emit = defineEmits(['update:project'])

// 本地狀態
const form = ref({ ...props.project })

// 監聽 props 變化
watch(() => props.project, (newVal) => {
  form.value = { ...newVal }
}, { deep: true })

// 當表單變更時發送更新
watch(form, (newVal) => {
  emit('update:project', { ...newVal })
}, { deep: true })

// 連結類型選項
const linkTypes = [
  { value: 'DEMO', label: '展示網站' },
  { value: 'GITHUB', label: 'GitHub' },
  { value: 'DOC', label: '文件' },
  { value: 'VIDEO', label: '影片' },
  { value: 'OTHER', label: '其他' }
]

// 分數選項 (1-5)
const scoreOptions = [1, 2, 3, 4, 5]

// 新增連結
const addLink = () => {
  form.value.links.push({
    id: Date.now(),
    type: 'DEMO',
    url: '',
    label: ''
  })
}

// 移除連結
const removeLink = (index) => {
  form.value.links.splice(index, 1)
}

// 切換技術標籤
const toggleTech = (tech) => {
  const index = form.value.techs.findIndex(t => t.id === tech.id)
  if (index === -1) {
    form.value.techs.push({ ...tech })
  } else {
    form.value.techs.splice(index, 1)
  }
}

// 檢查技術是否已選
const isTechSelected = (tech) => {
  return form.value.techs.some(t => t.id === tech.id)
}
</script>

<template>
  <div class="project-form">
    <!-- 基本資訊 -->
    <div class="form-section">
      <h3 class="form-section-title">📝 基本資訊</h3>
      
      <div class="form-grid">
        <!-- 中文標題 -->
        <div class="form-group">
          <label class="admin-label">中文標題 *</label>
          <input 
            v-model="form.titleZh"
            type="text"
            class="admin-input"
            placeholder="例：Portfolio CMS 整合平台"
          />
        </div>
        
        <!-- 英文標題 -->
        <div class="form-group">
          <label class="admin-label">英文標題 *</label>
          <input 
            v-model="form.titleEn"
            type="text"
            class="admin-input"
            placeholder="e.g. Portfolio CMS Platform"
          />
        </div>
      </div>
      
      <!-- 中文摘要 -->
      <div class="form-group">
        <label class="admin-label">中文摘要 *</label>
        <textarea 
          v-model="form.summaryZh"
          class="admin-textarea"
          rows="3"
          placeholder="簡短描述此專案的核心功能與價值..."
        ></textarea>
      </div>
      
      <!-- 英文摘要 -->
      <div class="form-group">
        <label class="admin-label">英文摘要 *</label>
        <textarea 
          v-model="form.summaryEn"
          class="admin-textarea"
          rows="3"
          placeholder="Brief description of core features and value..."
        ></textarea>
      </div>
    </div>

    <!-- 封面圖 -->
    <div class="form-section">
      <h3 class="form-section-title">🖼️ 封面圖片</h3>
      
      <div class="form-group">
        <label class="admin-label">圖片 URL</label>
        <input 
          v-model="form.coverImageUrl"
          type="url"
          class="admin-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <!-- 圖片預覽 -->
      <div v-if="form.coverImageUrl" class="cover-preview">
        <img :src="form.coverImageUrl" alt="Cover Preview" />
      </div>
    </div>

    <!-- 分類與評分 -->
    <div class="form-section">
      <h3 class="form-section-title">📊 分類與評分</h3>
      
      <div class="form-grid-3">
        <!-- 分類 -->
        <div class="form-group">
          <label class="admin-label">分類</label>
          <select v-model="form.category" class="admin-input">
            <option v-for="cat in mockCategories" :key="cat.value" :value="cat.value">
              {{ cat.labelZh }}
            </option>
          </select>
        </div>
        
        <!-- 難度分數 -->
        <div class="form-group">
          <label class="admin-label">難度分數</label>
          <div class="score-selector">
            <button 
              v-for="score in scoreOptions"
              :key="'diff-' + score"
              type="button"
              class="score-btn"
              :class="{ active: form.difficultyScore === score }"
              @click="form.difficultyScore = score"
            >
              {{ score }}
            </button>
          </div>
        </div>
        
        <!-- 影響力分數 -->
        <div class="form-group">
          <label class="admin-label">影響力分數</label>
          <div class="score-selector">
            <button 
              v-for="score in scoreOptions"
              :key="'impact-' + score"
              type="button"
              class="score-btn"
              :class="{ active: form.impactScore === score }"
              @click="form.impactScore = score"
            >
              {{ score }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 技術標籤 -->
    <div class="form-section">
      <h3 class="form-section-title">🏷️ 技術標籤</h3>
      
      <div class="tech-tags">
        <button
          v-for="tech in mockTechs"
          :key="tech.id"
          type="button"
          class="tech-tag"
          :class="{ selected: isTechSelected(tech) }"
          @click="toggleTech(tech)"
        >
          {{ tech.name }}
        </button>
      </div>
    </div>

    <!-- 外部連結 -->
    <div class="form-section">
      <h3 class="form-section-title">
        🔗 外部連結
        <button type="button" class="add-link-btn" @click="addLink">
          + 新增連結
        </button>
      </h3>
      
      <div v-if="form.links.length === 0" class="empty-links">
        尚未新增任何連結
      </div>
      
      <div 
        v-for="(link, index) in form.links" 
        :key="link.id || index"
        class="link-item"
      >
        <div class="link-grid">
          <!-- 連結類型 -->
          <select v-model="link.type" class="admin-input">
            <option v-for="lt in linkTypes" :key="lt.value" :value="lt.value">
              {{ lt.label }}
            </option>
          </select>
          
          <!-- 顯示文字 -->
          <input 
            v-model="link.label"
            type="text"
            class="admin-input"
            placeholder="顯示文字"
          />
          
          <!-- URL -->
          <input 
            v-model="link.url"
            type="url"
            class="admin-input"
            placeholder="https://..."
          />
          
          <!-- 刪除按鈕 -->
          <button 
            type="button" 
            class="remove-link-btn"
            @click="removeLink(index)"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  background-color: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.form-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(var(--color-border));
}

.form-group {
  margin-bottom: 1rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .form-grid,
  .form-grid-3 {
    grid-template-columns: 1fr;
  }
}

/* 封面預覽 */
.cover-preview {
  margin-top: 1rem;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.5rem;
  overflow: hidden;
  max-width: 400px;
}

.cover-preview img {
  width: 100%;
  height: auto;
  display: block;
}

/* 分數選擇器 */
.score-selector {
  display: flex;
  gap: 0.5rem;
}

.score-btn {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.375rem;
  background-color: rgb(var(--color-surface));
  color: rgb(var(--color-text-muted));
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.score-btn:hover {
  border-color: rgb(var(--color-primary));
  color: rgb(var(--color-primary));
}

.score-btn.active {
  background-color: rgb(var(--color-primary));
  border-color: rgb(var(--color-primary));
  color: white;
}

/* 技術標籤 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid rgb(var(--color-border));
  border-radius: 9999px;
  background-color: rgb(var(--color-surface));
  color: rgb(var(--color-text-muted));
  cursor: pointer;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  border-color: rgb(var(--color-primary));
  color: rgb(var(--color-primary));
}

.tech-tag.selected {
  background-color: rgb(var(--color-primary) / 0.1);
  border-color: rgb(var(--color-primary));
  color: rgb(var(--color-primary));
}

/* 外部連結 */
.add-link-btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background-color: rgb(var(--color-primary));
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-link-btn:hover {
  background-color: rgb(var(--color-primary-dark));
}

.empty-links {
  text-align: center;
  padding: 2rem;
  color: rgb(var(--color-text-muted));
  font-style: italic;
}

.link-item {
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background-color: rgb(var(--color-background));
  border-radius: 0.5rem;
}

.link-item:last-child {
  margin-bottom: 0;
}

.link-grid {
  display: grid;
  grid-template-columns: 120px 1fr 2fr auto;
  gap: 0.5rem;
  align-items: center;
}

@media (max-width: 768px) {
  .link-grid {
    grid-template-columns: 1fr;
  }
}

.remove-link-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-link-btn:hover {
  background-color: #ef4444;
  color: white;
}
</style>
