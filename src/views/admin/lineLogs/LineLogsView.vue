<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="admin-flex-between admin-mb-3">
      <h1>訊息紀錄</h1>
      <div class="header-filters">
        <select v-model="directionFilter" class="admin-input filter-select" @change="loadLogs">
          <option value="">全部方向</option>
          <option value="INBOUND">僅接收</option>
          <option value="OUTBOUND">僅發送</option>
        </select>
      </div>
    </div>

    <div v-if="userIdFromQuery" class="admin-card admin-mb-3">
      <div class="admin-flex-between admin-mb-2">
        <h3 class="admin-card-title">Push Message</h3>
        <span v-if="isSending" class="push-message-status">Sending...</span>
      </div>
      <div class="push-message-form">
        <input
          v-model="pushMessageText"
          type="text"
          class="admin-input"
          placeholder="Type a message"
        />
        <button
          class="admin-btn admin-btn-primary"
          type="button"
          :disabled="isSending || !pushMessageText.trim()"
          @click="sendMessage"
        >
          Send
        </button>
      </div>
      <p v-if="pushError" class="push-message-error">{{ pushError }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="admin-card loading-state">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="admin-card error-state">
      <p>{{ error }}</p>
      <button class="admin-btn admin-btn-secondary" @click="loadLogs">重試</button>
    </div>

    <!-- Logs Table -->
    <div v-else class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>狀態</th>
            <th>方向</th>
            <th>類型</th>
            <th>用戶</th>
            <th>訊息內容</th>
            <th>時間</th>
            <th>Payload</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id">
            <!-- Status -->
            <td>
              <span :class="['admin-badge', getStatusBadge(log.status)]">
                {{ getStatusText(log.status) }}
              </span>
            </td>

            <!-- Direction -->
            <td>
              <span :class="['direction-tag', log.direction?.toLowerCase()]">
                {{ log.direction === 'INBOUND' ? '⬇️ 接收' : '⬆️ 發送' }}
              </span>
            </td>

            <!-- Type -->
            <td>
              <code class="type-code">{{ log.messageType || '-' }}</code>
            </td>

            <!-- User -->
            <td>
              <span class="user-id">{{ truncateId(log.lineUserId) }}</span>
            </td>

            <!-- Message -->
            <td>
              <span class="message-text">{{ truncateMessage(log.messageText) }}</span>
            </td>

            <!-- Time -->
            <td>{{ formatDate(log.createdAt) }}</td>

            <!-- Payload -->
            <td>
              <button
                class="admin-btn admin-btn-secondary btn-sm"
                @click="openModal(log)"
              >
                查看 JSON
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="logs.length === 0" class="empty-state">
        沒有符合篩選條件的紀錄。
      </div>
    </div>

    <!-- JSON Payload Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Payload JSON</h3>
            <button class="modal-close" @click="closeModal">✕</button>
          </div>
          <div class="modal-body">
            <pre class="json-display">{{ formatJson(selectedLog?.payloadJson) }}</pre>
          </div>
          <div class="modal-footer">
            <button class="admin-btn admin-btn-secondary" @click="closeModal">
              關閉
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import lineApi from '@/api/line'

const route = useRoute()

// Get userId from query params
const userIdFromQuery = route.query.userId || null

// State
const logs = ref([])
const isLoading = ref(true)
const error = ref(null)
const directionFilter = ref('')
const pushMessageText = ref('')
const isSending = ref(false)
const pushError = ref(null)

// Modal state
const showModal = ref(false)
const selectedLog = ref(null)

// Load logs on mount
onMounted(() => {
  loadLogs()
})

// Load logs from API
const loadLogs = async () => {
  if (!userIdFromQuery) {
    error.value = '請從 LINE 用戶頁面點擊「查看紀錄」進入。'
    isLoading.value = false
    return
  }

  try {
    isLoading.value = true
    error.value = null
    
    const params = {}
    if (directionFilter.value) {
      params.direction = directionFilter.value
    }
    
    const response = await lineApi.getUserMessages(userIdFromQuery, params)
    
    // Handle paginated response
    if (response.content) {
      logs.value = response.content
    } else if (Array.isArray(response)) {
      logs.value = response
    } else {
      logs.value = []
    }
  } catch (err) {
    error.value = '載入訊息紀錄失敗，請稍後再試。'
    console.error('Failed to load logs:', err)
  } finally {
    isLoading.value = false
  }
}

const sendMessage = async () => {
  if (!userIdFromQuery) {
    pushError.value = 'Missing user id.'
    return
  }

  const message = pushMessageText.value.trim()
  if (!message || isSending.value) return

  try {
    isSending.value = true
    pushError.value = null
    await lineApi.pushMessage(userIdFromQuery, message)
    pushMessageText.value = ''
    await loadLogs()
  } catch (err) {
    pushError.value = 'Failed to send message.'
    console.error('Failed to push message:', err)
  } finally {
    isSending.value = false
  }
}

// Status badge class
const getStatusBadge = (status) => {
  const statusMap = {
    RECEIVED: 'admin-badge-info',
    SENT: 'admin-badge-success',
    FAILED: 'admin-badge-error'
  }
  return statusMap[status] || 'admin-badge-info'
}

// Status text
const getStatusText = (status) => {
  const textMap = {
    RECEIVED: '已接收',
    SENT: '已發送',
    FAILED: '失敗'
  }
  return textMap[status] || status
}

// Truncate LINE User ID
const truncateId = (id) => {
  if (!id) return '-'
  return id.substring(0, 10) + '...'
}

// Truncate message text
const truncateMessage = (text) => {
  if (!text) return '-'
  if (text.length > 50) {
    return text.substring(0, 50) + '...'
  }
  return text
}

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Format JSON
const formatJson = (json) => {
  if (!json) return '{}'
  if (typeof json === 'string') {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch {
      return json
    }
  }
  return JSON.stringify(json, null, 2)
}

// Modal functions
const openModal = (log) => {
  selectedLog.value = log
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedLog.value = null
}
</script>

<style scoped>
/* Filter select */
.filter-select {
  width: 180px;
}

/* Push message */
.push-message-form {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.push-message-form .admin-input {
  flex: 1;
}

.push-message-error {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #b91c1c;
}

.push-message-status {
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

/* Direction tag */
.direction-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.direction-tag.inbound {
  background-color: #dbeafe;
  color: #1e40af;
}

.direction-tag.outbound {
  background-color: #dcfce7;
  color: #166534;
}

/* Type code */
.type-code {
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  background-color: rgb(var(--color-background));
  border-radius: 0.25rem;
  color: rgb(var(--color-text-muted));
}

/* User ID */
.user-id {
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
}

/* Message text */
.message-text {
  font-size: 0.875rem;
  color: rgb(var(--color-text-main));
  max-width: 250px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Small button */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
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
  max-width: 700px;
  max-height: 80vh;
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
  overflow: auto;
  flex: 1;
}

.json-display {
  background-color: rgb(var(--color-background));
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgb(var(--color-text-main));
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgb(var(--color-border));
}
</style>
