import http from '@/utils/http'

/**
 * Portfolio API Module
 * 作品集 CRUD 操作
 */

// ========================
// Project CRUD
// ========================

/**
 * 取得所有專案列表
 * @param {Object} params - 查詢參數
 * @param {string} [params.status] - 狀態篩選 (DRAFT, PUBLISHED, ARCHIVED)
 * @param {string} [params.category] - 類別篩選 (SYSTEM, FRONTEND, BACKEND, TOOL)
 * @param {boolean} [params.featured] - 精選篩選
 * @param {string} [params.q] - 關鍵字搜尋
 * @returns {Promise<Array>} 專案列表
 */
export const getProjects = async (params = {}) => {
  return await http.get('/admin/portfolio/projects', { params })
}

/**
 * 取得專案詳情
 * @param {number|string} id - 專案 ID
 * @returns {Promise<Object>} 專案詳情
 */
export const getProject = async (id) => {
  return await http.get(`/admin/portfolio/projects/${id}`)
}

/**
 * 建立新專案
 * @param {Object} data - 專案資料
 * @returns {Promise<Object>} 新建的專案
 */
export const createProject = async (data) => {
  return await http.post('/admin/portfolio/projects', data)
}

/**
 * 更新專案
 * @param {number|string} id - 專案 ID
 * @param {Object} data - 專案資料
 * @returns {Promise<Object>} 更新後的專案
 */
export const updateProject = async (id, data) => {
  return await http.put(`/admin/portfolio/projects/${id}`, data)
}

/**
 * 刪除專案
 * @param {number|string} id - 專案 ID
 * @returns {Promise<void>}
 */
export const deleteProject = async (id) => {
  return await http.delete(`/admin/portfolio/projects/${id}`)
}

// ========================
// Project Techs (子資源)
// ========================

/**
 * 取得專案的技術標籤
 * @param {number|string} projectId - 專案 ID
 * @returns {Promise<Array>} 技術標籤列表
 */
export const getProjectTechs = async (projectId) => {
  return await http.get(`/admin/portfolio/projects/${projectId}/techs`)
}

/**
 * 替換專案的技術標籤
 * @param {number|string} projectId - 專案 ID
 * @param {Array<string>} techs - 技術名稱陣列
 * @returns {Promise<Array>} 更新後的技術標籤
 */
export const replaceProjectTechs = async (projectId, techs) => {
  return await http.put(`/admin/portfolio/projects/${projectId}/techs`, { techs })
}

// ========================
// Project Links (子資源)
// ========================

/**
 * 取得專案的外部連結
 * @param {number|string} projectId - 專案 ID
 * @returns {Promise<Array>} 連結列表
 */
export const getProjectLinks = async (projectId) => {
  return await http.get(`/admin/portfolio/projects/${projectId}/links`)
}

/**
 * 取得單一連結
 * @param {number|string} projectId - 專案 ID
 * @param {number|string} linkId - 連結 ID
 * @returns {Promise<Object>} 連結詳情
 */
export const getProjectLink = async (projectId, linkId) => {
  return await http.get(`/admin/portfolio/projects/${projectId}/links/${linkId}`)
}

/**
 * 建立專案連結
 * @param {number|string} projectId - 專案 ID
 * @param {Object} data - 連結資料 { type, url, label?, sortOrder? }
 * @returns {Promise<Object>} 新建的連結
 */
export const createProjectLink = async (projectId, data) => {
  return await http.post(`/admin/portfolio/projects/${projectId}/links`, data)
}

/**
 * 更新專案連結
 * @param {number|string} projectId - 專案 ID
 * @param {number|string} linkId - 連結 ID
 * @param {Object} data - 連結資料 { type, url, label?, sortOrder? }
 * @returns {Promise<Object>} 更新後的連結
 */
export const updateProjectLink = async (projectId, linkId, data) => {
  return await http.put(`/admin/portfolio/projects/${projectId}/links/${linkId}`, data)
}

/**
 * 刪除專案連結
 * @param {number|string} projectId - 專案 ID
 * @param {number|string} linkId - 連結 ID
 * @returns {Promise<void>}
 */
export const deleteProjectLink = async (projectId, linkId) => {
  return await http.delete(`/admin/portfolio/projects/${projectId}/links/${linkId}`)
}

export default {
  // Project CRUD
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  // Project Techs
  getProjectTechs,
  replaceProjectTechs,
  // Project Links
  getProjectLinks,
  getProjectLink,
  createProjectLink,
  updateProjectLink,
  deleteProjectLink
}
