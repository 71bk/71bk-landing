<template>
  <div class="admin-page">
    <!-- Header -->
    <h1>系統設定</h1>

    <div class="settings-grid">
      <!-- Admin Profile Card -->
      <div class="admin-card">
        <h3 class="admin-card-title admin-mb-3">管理員資料</h3>
        
        <div class="profile-section">
          <img
            :src="authStore.avatarUrl || defaultAvatar"
            :alt="authStore.displayName"
            class="profile-avatar"
          />
          <div class="profile-info">
            <div class="profile-name">{{ authStore.displayName }}</div>
            <div class="profile-email">{{ truncateId(authStore.lineUserId) }}</div>
            <span class="admin-badge admin-badge-info">管理員</span>
          </div>
        </div>

        <div class="profile-actions admin-mt-3">
          <button 
            class="admin-btn admin-btn-danger" 
            :disabled="authStore.isLoading"
            @click="handleSignOut"
          >
            {{ authStore.isLoading ? '登出中...' : '登出' }}
          </button>
        </div>
      </div>

      <!-- System Status Card -->
      <div class="admin-card">
        <h3 class="admin-card-title admin-mb-3">系統狀態</h3>
        
        <div class="status-list">
          <div class="status-item">
            <span class="status-key">應用程式版本</span>
            <span class="status-value">v1.0.0</span>
          </div>
          <div class="status-item">
            <span class="status-key">前端</span>
            <span class="status-value">Vue 3 + Vite</span>
          </div>
          <div class="status-item">
            <span class="status-key">後端</span>
            <span class="status-value">
              Spring Boot 4
              <span class="status-indicator connected">已連線</span>
            </span>
          </div>
          <div class="status-item">
            <span class="status-key">資料庫</span>
            <span class="status-value">
              MySQL 8
              <span class="status-indicator connected">已連線</span>
            </span>
          </div>
          <div class="status-item">
            <span class="status-key">環境</span>
            <span class="status-value">
              <span class="env-badge production">正式環境</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

// Default avatar placeholder
const defaultAvatar = 'https://placehold.co/80x80?text=👤'

// Truncate LINE User ID
const truncateId = (id) => {
  if (!id) return '-'
  return id.substring(0, 16) + '...'
}

// Sign Out Handler
const handleSignOut = async () => {
  const confirmed = confirm('確定要登出嗎？')
  if (confirmed) {
    await authStore.logout()
    router.push('/admin/login')
  }
}
</script>

<style scoped>
/* Settings Grid */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

/* Profile Section */
.profile-section {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgb(var(--color-primary));
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
}

.profile-email {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
  font-family: 'Fira Code', 'Monaco', monospace;
}

.profile-actions {
  padding-top: 1rem;
  border-top: 1px solid rgb(var(--color-border));
}

/* Status List */
.status-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgb(var(--color-border));
}

.status-item:last-child {
  border-bottom: none;
}

.status-key {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--color-text-muted));
}

.status-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Status Indicator */
.status-indicator {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.status-indicator.connected {
  background-color: #dcfce7;
  color: #166534;
}

.status-indicator.disconnected {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Environment Badge */
.env-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.env-badge.production {
  background-color: #fef3c7;
  color: #92400e;
}

.env-badge.development {
  background-color: #dbeafe;
  color: #1e40af;
}

/* Card alignment */
.admin-card {
  text-align: left;
}
</style>
