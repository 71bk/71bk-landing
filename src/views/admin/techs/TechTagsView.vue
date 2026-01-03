<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="admin-flex-between admin-mb-3">
      <h1>技術標籤管理</h1>
      <button class="admin-btn admin-btn-primary" @click="openAddModal">
        + 新增標籤
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="admin-card loading-state">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="admin-card error-state">
      <p>{{ error }}</p>
      <button class="admin-btn admin-btn-secondary" @click="loadTechs">重試</button>
    </div>

    <!-- Tags Grid -->
    <div v-else class="admin-card">
      <div class="tags-grid">
        <div
          v-for="tech in techs"
          :key="tech.id"
          class="tag-item"
        >
          <span class="tag-name">{{ tech.name }}</span>
          <span class="tag-count">{{ tech.projectCount || 0 }} 個專案</span>
          <div class="tag-actions">
            <button
              class="action-btn edit"
              @click="openEditModal(tech)"
              title="編輯"
            >
              ✏️
            </button>
            <button
              class="action-btn delete"
              @click="handleDelete(tech)"
              title="刪除"
              :disabled="isDeleting === tech.id"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="techs.length === 0" class="empty-state">
        尚未建立任何技術標籤。點擊「新增標籤」開始新增。
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ isEditMode ? '編輯標籤' : '新增標籤' }}</h3>
            <button class="modal-close" @click="closeModal">✕</button>
          </div>
          <div class="modal-body">
            <div class="admin-mb-2">
              <label class="admin-label">標籤名稱</label>
              <input
                v-model="formData.name"
                type="text"
                class="admin-input"
                placeholder="例如：Vue.js、Spring Boot"
                @keyup.enter="handleSave"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="admin-btn admin-btn-secondary" @click="closeModal">
              取消
            </button>
            <button 
              class="admin-btn admin-btn-primary" 
              @click="handleSave"
              :disabled="!formData.name.trim() || isSaving"
            >
              {{ isSaving ? '儲存中...' : (isEditMode ? '儲存' : '新增') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import techsApi from '@/api/techs'

// State
const techs = ref([])
const isLoading = ref(true)
const isDeleting = ref(null)
const isSaving = ref(false)
const error = ref(null)

// Modal State
const showModal = ref(false)
const isEditMode = ref(false)
const formData = ref({ id: null, name: '' })

// Load techs on mount
onMounted(() => {
  loadTechs()
})

// Load techs from API
const loadTechs = async () => {
  try {
    isLoading.value = true
    error.value = null
    techs.value = await techsApi.getTechs()
  } catch (err) {
    error.value = '載入標籤失敗，請稍後再試。'
    console.error('Failed to load techs:', err)
  } finally {
    isLoading.value = false
  }
}

// Open Add Modal
const openAddModal = () => {
  isEditMode.value = false
  formData.value = { id: null, name: '' }
  showModal.value = true
}

// Open Edit Modal
const openEditModal = (tech) => {
  isEditMode.value = true
  formData.value = { id: tech.id, name: tech.name }
  showModal.value = true
}

// Close Modal
const closeModal = () => {
  showModal.value = false
  formData.value = { id: null, name: '' }
}

// Save (Add or Edit)
const handleSave = async () => {
  if (!formData.value.name.trim()) return

  try {
    isSaving.value = true

    if (isEditMode.value) {
      // Update existing
      await techsApi.updateTech(formData.value.id, { name: formData.value.name.trim() })
    } else {
      // Create new
      await techsApi.createTech({ name: formData.value.name.trim() })
    }

    // Reload list
    await loadTechs()
    closeModal()
  } catch (err) {
    alert('儲存失敗：' + (err.message || '請稍後再試'))
    console.error('Failed to save tech:', err)
  } finally {
    isSaving.value = false
  }
}

// Delete
const handleDelete = async (tech) => {
  if (tech.projectCount > 0) {
    alert(`無法刪除「${tech.name}」，因為有 ${tech.projectCount} 個專案正在使用此標籤。`)
    return
  }

  const confirmed = confirm(`確定要刪除「${tech.name}」嗎？`)
  if (!confirmed) return

  try {
    isDeleting.value = tech.id
    await techsApi.deleteTech(tech.id)
    
    // Remove from local list
    const index = techs.value.findIndex(t => t.id === tech.id)
    if (index > -1) {
      techs.value.splice(index, 1)
    }
  } catch (err) {
    alert('刪除失敗：' + (err.message || '請稍後再試'))
    console.error('Failed to delete tech:', err)
  } finally {
    isDeleting.value = null
  }
}
</script>

<style scoped>
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

/* Error state */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: rgb(var(--color-text-muted));
}

/* Tags Grid */
.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

/* Tag Item */
.tag-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: rgb(var(--color-background));
  border-radius: 0.5rem;
  border: 1px solid rgb(var(--color-border));
  transition: all 0.2s ease;
}

.tag-item:hover {
  border-color: rgb(var(--color-primary));
}

.tag-name {
  font-weight: 600;
  color: rgb(var(--color-text-main));
  flex: 1;
}

.tag-count {
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
  background-color: rgb(var(--color-surface));
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}

/* Tag Actions */
.tag-actions {
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tag-item:hover .tag-actions {
  opacity: 1;
}

.action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: rgb(var(--color-surface));
}

.action-btn.delete:hover {
  background-color: #fee2e2;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Empty State */
.empty-state {
  padding: 3rem;
  text-align: center;
  color: rgb(var(--color-text-muted));
}

/* Card alignment */
.admin-card {
  text-align: left;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background-color: rgb(var(--color-surface));
  border-radius: 0.75rem;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgb(var(--color-border));
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: rgb(var(--color-text-muted));
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: rgb(var(--color-text-main));
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgb(var(--color-border));
}
</style>
