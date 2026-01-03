import http from '@/utils/http'

/**
 * Analytics API Module
 * 統計數據 API
 */

/**
 * 取得總覽數據
 * @param {number} [days=7] - 統計天數
 * @returns {Promise<Object>} 總覽數據
 */
export const getOverview = async (days = 7) => {
  return await http.get('/admin/analytics', { params: { days } })
}

/**
 * 取得熱門專案
 * @param {number} [days=7] - 統計天數
 * @param {number} [limit=5] - 筆數限制
 * @returns {Promise<Array>} 熱門專案列表
 */
export const getTopProjects = async (days = 7, limit = 5) => {
  return await http.get('/admin/analytics/projects', { params: { days, limit } })
}

/**
 * 取得熱門連結
 * @param {number} [days=7] - 統計天數
 * @param {number} [limit=5] - 筆數限制
 * @returns {Promise<Array>} 熱門連結列表
 */
export const getTopLinks = async (days = 7, limit = 5) => {
  return await http.get('/admin/analytics/links', { params: { days, limit } })
}

/**
 * Get analytics detail for a project
 * @param {number|string} projectId - project id
 * @param {number} [days=7] - recent days range
 * @returns {Promise<Object>} project analytics detail
 */
export const getProjectAnalytics = async (projectId, days = 7) => {
  return await http.get(`/admin/analytics/projects/${projectId}`, { params: { days } })
}

export default {
  getOverview,
  getTopProjects,
  getTopLinks,
  getProjectAnalytics
}
