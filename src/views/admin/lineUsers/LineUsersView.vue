<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="admin-flex-between admin-mb-3">
      <h1>LINE 用戶</h1>
      <div class="header-stats">
        <span class="stat-item">
          <span class="stat-value">{{ totalUsers }}</span>
          <span class="stat-label">總用戶數</span>
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="admin-card loading-state">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="admin-card error-state">
      <p>{{ error }}</p>
      <button class="admin-btn admin-btn-secondary" @click="loadUsers">重試</button>
    </div>

    <!-- Users Table -->
    <div v-else class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>用戶</th>
            <th>LINE ID</th>
            <th>狀態</th>
            <th>最後上線</th>
            <th>加入時間</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <!-- User: Avatar + Display Name -->
            <td>
              <div class="user-cell">
                <img
                  :src="user.pictureUrl || defaultAvatar"
                  :alt="user.displayName"
                  class="user-avatar"
                />
                <span class="user-name">{{ user.displayName || '-' }}</span>
              </div>
            </td>

            <!-- LINE ID (truncated) -->
            <td>
              <code class="line-id">{{ truncateId(user.lineUserId) }}</code>
            </td>

            <!-- Status -->
            <td>
              <span :class="['admin-badge', getStatusBadge(user.lastSeenAt)]">
                {{ getStatusText(user.lastSeenAt) }}
              </span>
            </td>

            <!-- Last Seen -->
            <td>{{ formatDate(user.lastSeenAt) }}</td>

            <!-- Joined -->
            <td>{{ formatDate(user.createdAt) }}</td>

            <!-- Actions -->
            <td>
              <router-link
                :to="`/admin/line-logs?userId=${user.lineUserId}`"
                class="admin-btn admin-btn-secondary btn-sm"
              >
                查看紀錄
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="users.length === 0" class="empty-state">
        尚無 LINE 用戶資料。
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import lineApi from '@/api/line'

// Default avatar placeholder
const defaultAvatar = 'https://placehold.co/40x40?text=👤'

// State
const users = ref([])
const totalUsers = ref(0)
const isLoading = ref(true)
const error = ref(null)

// Load users on mount
onMounted(() => {
  loadUsers()
})

// Load users from API
const loadUsers = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await lineApi.getUsers()
    
    // Handle paginated response (backend uses 'items' instead of 'content')
    if (response.items) {
      users.value = response.items
      totalUsers.value = response.totalElements || response.items.length
    } else if (response.content) {
      users.value = response.content
      totalUsers.value = response.totalElements || response.content.length
    } else if (Array.isArray(response)) {
      users.value = response
      totalUsers.value = response.length
    } else {
      users.value = []
      totalUsers.value = 0
    }
  } catch (err) {
    error.value = '載入用戶失敗，請稍後再試。'
    console.error('Failed to load users:', err)
  } finally {
    isLoading.value = false
  }
}

// Truncate LINE User ID
const truncateId = (id) => {
  if (!id) return '-'
  return id.substring(0, 12) + '...'
}

// Format date
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

// Check if user is active (within 7 days)
const isActive = (lastSeenAt) => {
  if (!lastSeenAt) return false
  const lastSeen = new Date(lastSeenAt)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return lastSeen >= sevenDaysAgo
}

// Get status badge class
const getStatusBadge = (lastSeenAt) => {
  return isActive(lastSeenAt) ? 'admin-badge-success' : 'admin-badge-inactive'
}

// Get status text
const getStatusText = (lastSeenAt) => {
  return isActive(lastSeenAt) ? '活躍' : '離線'
}
</script>

<style scoped>
/* Header stats */
.header-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
}

.stat-label {
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

/* Empty state */
.empty-state {
  padding: 3rem;
  text-align: center;
  color: rgb(var(--color-text-muted));
}

/* User cell */
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgb(var(--color-border));
}

.user-name {
  font-weight: 500;
  color: rgb(var(--color-text-main));
}

/* LINE ID */
.line-id {
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: rgb(var(--color-background));
  border-radius: 0.25rem;
  color: rgb(var(--color-text-muted));
}

/* Inactive badge */
.admin-badge-inactive {
  background-color: #e5e7eb;
  color: #6b7280;
}

/* Small button */
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

/* Card alignment */
.admin-card {
  text-align: left;
}
</style>
