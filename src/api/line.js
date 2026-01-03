import http from '@/utils/http'

/**
 * LINE API Module
 * LINE 用戶與訊息管理
 */

/**
 * 取得 LINE 使用者列表
 * @param {Object} params - 查詢參數
 * @param {string} [params.q] - 搜尋關鍵字
 * @param {number} [params.page] - 頁碼
 * @param {number} [params.size] - 每頁筆數
 * @returns {Promise<Object>} 使用者列表 (含分頁資訊)
 */
export const getUsers = async (params = {}) => {
  return await http.get('/admin/line/users', { params })
}

/**
 * 取得使用者訊息列表
 * @param {string} lineUserId - LINE User ID
 * @param {Object} params - 查詢參數
 * @param {string} [params.direction] - 訊息方向 (INBOUND, OUTBOUND)
 * @param {string} [params.status] - 訊息狀態 (RECEIVED, SENT, FAILED)
 * @param {number} [params.page] - 頁碼
 * @param {number} [params.size] - 每頁筆數
 * @returns {Promise<Object>} 訊息列表 (含分頁資訊)
 */
export const getUserMessages = async (lineUserId, params = {}) => {
  return await http.get(`/admin/line/users/${lineUserId}/messages`, { params })
}

/**
 * 推播訊息給使用者
 * @param {string} lineUserId - LINE User ID
 * @param {string} message - 訊息內容
 * @returns {Promise<Object>} 推播結果
 */
export const pushMessage = async (lineUserId, message) => {
  return await http.post(`/admin/line/users/${lineUserId}/messages`, { message })
}

export default {
  getUsers,
  getUserMessages,
  pushMessage
}
