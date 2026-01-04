<template>
  <div class="admin-page">
    <h1>儀表板</h1>

    <!-- KPI 卡片區 -->
    <div class="admin-grid admin-grid-4 admin-mb-4">
      <!-- 總專案數 -->
      <div class="admin-card">
        <div class="kpi-icon">📁</div>
        <div class="kpi-value">{{ kpiData.totalProjects }}</div>
        <div class="kpi-label">總專案數</div>
      </div>

      <!-- 總瀏覽數 -->
      <div class="admin-card">
        <div class="kpi-icon">👁️</div>
        <div class="kpi-value">{{ kpiData.totalViews.toLocaleString() }}</div>
        <div class="kpi-label">總瀏覽數</div>
      </div>

      <!-- LINE 用戶數 -->
      <div class="admin-card">
        <div class="kpi-icon">💬</div>
        <div class="kpi-value">{{ kpiData.lineUsers.toLocaleString() }}</div>
        <div class="kpi-label">LINE 用戶</div>
      </div>

      <!-- 近期訊息 -->
      <div class="admin-card">
        <div class="kpi-icon">✉️</div>
        <div class="kpi-value">{{ kpiData.recentMessages }}</div>
        <div class="kpi-label">近期訊息</div>
      </div>
    </div>

    <!-- 最近活動區 -->
    <div class="admin-card">
      <h3 class="admin-card-title admin-mb-2">近期系統事件</h3>
      <table class="admin-table">
        <thead>
          <tr>
            <th>時間</th>
            <th>事件類型</th>
            <th>專案</th>
            <th>使用者</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in recentEvents" :key="event.id">
            <td>{{ event.time }}</td>
            <td>{{ getEventTypeText(event.eventType) }}</td>
            <td>
              <router-link
                v-if="event.projectId"
                :to="`/admin/projects/${event.projectId}`"
                class="project-link"
              >
                {{ event.projectSlug || `#${event.projectId}` }}
              </router-link>
              <span v-else class="text-muted">-</span>
            </td>
            <td>{{ truncateUser(event.user) }}</td>
            <td>
              <span :class="['admin-badge', getBadgeClass(event.status)]">
                {{ getStatusText(event.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="eventsLoading" class="empty-state">Loading events...</div>
      <div v-else-if="eventsError" class="empty-state">{{ eventsError }}</div>
      <div v-else-if="recentEvents.length === 0" class="empty-state">No events.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dashboardApi from '@/api/dashboard'

const defaultSummary = {
  totalProjects: 0,
  totalViews: 0,
  lineUsers: 0,
  recentMessages: 0
}

// KPI Data
const kpiData = ref({ ...defaultSummary })

const loadSummary = async (days = 7) => {
  try {
    const summary = await dashboardApi.getSummary(days)
    kpiData.value = { ...defaultSummary, ...summary }
  } catch (error) {
    console.error('Failed to load dashboard summary:', error)
    kpiData.value = { ...defaultSummary }
  }
}

onMounted(() => {
  loadSummary()
  loadEvents()
})

// Recent Events Data
const recentEvents = ref([])
const eventsLoading = ref(false)
const eventsError = ref(null)

const loadEvents = async (params = {}) => {
  try {
    eventsLoading.value = true
    eventsError.value = null
    const response = await dashboardApi.getEvents({ size: 6, ...params })
    recentEvents.value = Array.isArray(response?.events) ? response.events : []
  } catch (error) {
    console.error('Failed to load dashboard events:', error)
    eventsError.value = 'Failed to load events'
    recentEvents.value = []
  } finally {
    eventsLoading.value = false
  }
}

// Badge class helper
const getBadgeClass = (status) => {
  const statusMap = {
    Success: 'admin-badge-success',
    Warning: 'admin-badge-warning',
    Error: 'admin-badge-error',
    Info: 'admin-badge-info'
  }
  return statusMap[status] || 'admin-badge-info'
}

// Status text helper
const getStatusText = (status) => {
  const textMap = {
    Success: '成功',
    Warning: '警告',
    Error: '錯誤',
    Info: '資訊'
  }
  return textMap[status] || status
}

// Event type text helper
const getEventTypeText = (eventType) => {
  const typeMap = {
    'PROJECT_CREATED': '專案建立',
    'PROJECT_UPDATED': '專案更新',
    'PROJECT_PUBLISHED': '專案發布',
    'PROJECT_ARCHIVED': '專案封存',
    'PROJECT_DELETED': '專案刪除'
  }
  return typeMap[eventType] || eventType
}

// Truncate user ID for display
const truncateUser = (user) => {
  if (!user) return '-'
  if (user.length > 12) {
    return user.substring(0, 10) + '...'
  }
  return user
}
</script>

<style scoped>
/* KPI Card Styles */
.admin-card {
  text-align: center;
}

.kpi-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
  margin-bottom: 0.25rem;
}

.kpi-label {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
  font-weight: 500;
}

/* Override card alignment for table section */
.admin-card:has(.admin-table) {
  text-align: left;
}

/* Project link styling */
.project-link {
  color: rgb(var(--color-primary));
  text-decoration: none;
  font-weight: 500;
}

.project-link:hover {
  text-decoration: underline;
}

.text-muted {
  color: rgb(var(--color-text-muted));
}
</style>
