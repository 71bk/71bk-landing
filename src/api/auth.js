import http from '@/utils/http'

/**
 * Auth API Module
 * 處理 LINE OAuth 登入相關的 API 呼叫
 */

/**
 * 取得 LINE 登入網址
 * @returns {Promise<string>} LINE OAuth 登入 URL
 */
export const getLineLoginUrl = async () => {
  const data = await http.get('/auth/line/authorization-url')
  return data // 回傳完整登入 URL 字串
}

/**
 * 取得當前登入的使用者資訊
 * @returns {Promise<Object>} 使用者資料
 */
export const getCurrentUser = async () => {
  return await http.get('/auth/me')
}

/**
 * 刷新 Token (Refresh Cookie)
 * @returns {Promise<void>}
 */
export const refreshToken = async () => {
  return await http.post('/auth/refresh')
}

/**
 * 登出 (清除 Cookie)
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await http.post('/auth/logout')
}

/**
 * 驗證登入狀態 (靜默檢查)
 * @returns {Promise<Object|null>} 使用者資料或 null
 */
export const verifyAuth = async () => {
  try {
    return await http.get('/auth/me')
  } catch (error) {
    // 401 錯誤會被 http.js 靜默處理
    if (error.silent || error.status === 401) {
      return null
    }
    throw error
  }
}

export default {
  getLineLoginUrl,
  getCurrentUser,
  refreshToken,
  logout,
  verifyAuth
}
