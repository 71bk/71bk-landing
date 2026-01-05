<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="page-header admin-mb-3">
      <div class="header-left">
        <h1>所有專案</h1>
        <span class="project-count">共 {{ projects.length }} 個專案</span>
      </div>
      <router-link to="/admin/projects/new" class="admin-btn admin-btn-primary">
        <span class="btn-icon">+</span>
        新增專案
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="admin-card loading-state">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="admin-card error-state">
      <p>{{ error }}</p>
      <button class="admin-btn admin-btn-secondary" @click="loadProjects">重試</button>
    </div>

    <!-- Projects Table -->
    <div v-else class="projects-card">
      <table class="projects-table">
        <thead>
          <tr>
            <th class="th-cover">封面</th>
            <th class="th-title">標題</th>
            <th class="th-category">分類</th>
            <th class="th-status">狀態</th>
            <th class="th-date">更新時間</th>
            <th class="th-actions">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="project in projects" 
            :key="project.id"
            class="project-row"
          >
            <!-- Cover -->
            <td class="td-cover">
              <div class="cover-wrapper">
                <img
                  :src="project.coverImageUrl || defaultCover"
                  :alt="project.titleZh"
                  class="cover-thumbnail"
                />
                <span v-if="project.featured" class="featured-badge" title="精選專案">⭐</span>
              </div>
            </td>

            <!-- Title -->
            <td class="td-title">
              <div class="title-cell">
                <div class="title-zh">{{ project.titleZh }}</div>
                <div class="title-slug">{{ project.slug }}</div>
              </div>
            </td>

            <!-- Category -->
            <td class="td-category">
              <span :class="['category-tag', `category-${project.category?.toLowerCase()}`]">
                {{ getCategoryText(project.category) }}
              </span>
            </td>

            <!-- Status -->
            <td class="td-status">
              <span :class="['status-badge', `status-${project.status?.toLowerCase()}`]">
                <span class="status-dot"></span>
                {{ getStatusText(project.status) }}
              </span>
            </td>

            <!-- Updated At -->
            <td class="td-date">
              <span class="date-text">{{ formatDate(project.updatedAt) }}</span>
            </td>

            <!-- Actions -->
            <td class="td-actions">
              <div class="action-buttons">
                <router-link
                  :to="`/admin/projects/${project.id}`"
                  class="action-btn action-edit"
                  title="編輯"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </router-link>
                <button
                  class="action-btn action-delete"
                  :disabled="isDeleting === project.id"
                  @click="handleDelete(project)"
                  title="刪除"
                >
                  <svg v-if="isDeleting !== project.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                  <span v-else class="delete-spinner"></span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="projects.length === 0" class="empty-state">
        <div class="empty-icon">📁</div>
        <p class="empty-title">尚無專案</p>
        <p class="empty-desc">點擊「新增專案」開始建立您的作品集</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import portfolioApi from '@/api/portfolio'

// Default cover image placeholder
const defaultCover = 'https://placehold.co/120x80/1e293b/475569?text=No+Image'

// State
const projects = ref([])
const isLoading = ref(true)
const isDeleting = ref(null)
const error = ref(null)

// Load projects on mount
onMounted(() => {
  loadProjects()
})

// Load projects from API
const loadProjects = async () => {
  try {
    isLoading.value = true
    error.value = null
    projects.value = await portfolioApi.getProjects()
  } catch (err) {
    error.value = '載入專案失敗，請稍後再試。'
    console.error('Failed to load projects:', err)
  } finally {
    isLoading.value = false
  }
}

// Status text helper
const getStatusText = (status) => {
  const textMap = {
    PUBLISHED: '已發布',
    DRAFT: '草稿',
    ARCHIVED: '已封存'
  }
  return textMap[status] || status
}

// Category text helper
const getCategoryText = (category) => {
  const textMap = {
    SYSTEM: '全端',
    FRONTEND: '前端',
    BACKEND: '後端',
    TOOL: '工具'
  }
  return textMap[category] || category || '-'
}

// Format date helper
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Delete handler
const handleDelete = async (project) => {
  const confirmed = confirm(`確定要刪除「${project.titleZh}」嗎？此操作無法復原。`)
  if (!confirmed) return

  try {
    isDeleting.value = project.id
    await portfolioApi.deleteProject(project.id)
    // Remove from local list
    const index = projects.value.findIndex((p) => p.id === project.id)
    if (index > -1) {
      projects.value.splice(index, 1)
    }
  } catch (err) {
    alert('刪除失敗：' + (err.message || '請稍後再試'))
    console.error('Failed to delete project:', err)
  } finally {
    isDeleting.value = null
  }
}
</script>

<style scoped>
/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.page-header h1 {
  margin-bottom: 0;
}

.project-count {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
}

.btn-icon {
  margin-right: 0.25rem;
}

/* Projects Card */
.projects-card {
  background-color: rgb(var(--color-surface));
  border-radius: 0.75rem;
  border: 1px solid rgb(var(--color-border));
  overflow: hidden;
}

/* Projects Table */
.projects-table {
  width: 100%;
  border-collapse: collapse;
}

.projects-table th {
  text-align: left;
  padding: 1rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(var(--color-text-muted));
  background-color: rgb(var(--color-background));
  border-bottom: 1px solid rgb(var(--color-border));
}

.projects-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgb(var(--color-border));
  vertical-align: middle;
}

/* Table Columns */
.th-cover { width: 100px; }
.th-title { min-width: 200px; }
.th-category { width: 120px; }
.th-status { width: 100px; }
.th-date { width: 160px; }
.th-actions { width: 100px; text-align: center; }

/* Project Row */
.project-row {
  transition: background-color 0.15s ease;
}

.project-row:hover {
  background-color: rgb(var(--color-background));
}

.project-row:last-child td {
  border-bottom: none;
}

/* Cover */
.cover-wrapper {
  position: relative;
  width: 80px;
}

.cover-thumbnail {
  width: 80px;
  height: 54px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid rgb(var(--color-border));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-row:hover .cover-thumbnail {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.featured-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 0.875rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

/* Title */
.title-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title-zh {
  font-weight: 600;
  color: rgb(var(--color-text-main));
  font-size: 0.9375rem;
}

.title-slug {
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
  font-family: 'Fira Code', 'Monaco', monospace;
}

/* Category Tag */
.category-tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-text-muted));
}

.category-system {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.category-frontend {
  background-color: #fce7f3;
  color: #be185d;
}

.category-backend {
  background-color: #d1fae5;
  color: #047857;
}

.category-tool {
  background-color: #fef3c7;
  color: #b45309;
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-published {
  background-color: #d1fae5;
  color: #047857;
}

.status-published .status-dot {
  background-color: #10b981;
}

.status-draft {
  background-color: #f3f4f6;
  color: #6b7280;
}

.status-draft .status-dot {
  background-color: #9ca3af;
}

.status-archived {
  background-color: #fee2e2;
  color: #dc2626;
}

.status-archived .status-dot {
  background-color: #ef4444;
}

/* Date */
.date-text {
  font-size: 0.8125rem;
  color: rgb(var(--color-text-muted));
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 1px solid rgb(var(--color-border));
  background-color: rgb(var(--color-surface));
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-edit {
  color: rgb(var(--color-text-muted));
}

.action-edit:hover {
  background-color: rgb(var(--color-primary));
  border-color: rgb(var(--color-primary));
  color: white;
}

.action-delete {
  color: rgb(var(--color-text-muted));
}

.action-delete:hover:not(:disabled) {
  background-color: #dc2626;
  border-color: #dc2626;
  color: white;
}

.action-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgb(var(--color-border));
  border-top-color: rgb(var(--color-primary));
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
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

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 1rem;
  color: rgb(var(--color-text-muted));
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 0.5rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
  margin: 0;
}

.empty-desc {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
  margin: 0;
}
</style>
