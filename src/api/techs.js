import http from '@/utils/http'

/**
 * Techs API Module
 * 技術標籤 CRUD 操作
 */

/**
 * 取得所有技術標籤
 * @returns {Promise<Array>} 技術標籤列表
 */
export const getTechs = async (params = {}) => {
  return await http.get('/admin/portfolio/techs', { params })
}

/**
 * Get tech by id
 * @param {number|string} id - tech id
 * @returns {Promise<Object>} tech data
 */
export const getTech = async (id) => {
  return await http.get(`/admin/portfolio/techs/${id}`)
}

/**
 * 建立新技術標籤
 * @param {Object} data - 標籤資料
 * @param {string} data.name - 標籤名稱
 * @returns {Promise<Object>} 新建的標籤
 */
export const createTech = async (data) => {
  return await http.post('/admin/portfolio/techs', data)
}

/**
 * 更新技術標籤
 * @param {number|string} id - 標籤 ID
 * @param {Object} data - 標籤資料
 * @returns {Promise<Object>} 更新後的標籤
 */
export const updateTech = async (id, data) => {
  return await http.put(`/admin/portfolio/techs/${id}`, data)
}

/**
 * 刪除技術標籤
 * @param {number|string} id - 標籤 ID
 * @returns {Promise<void>}
 */
export const deleteTech = async (id) => {
  return await http.delete(`/admin/portfolio/techs/${id}`)
}

export default {
  getTechs,
  getTech,
  createTech,
  updateTech,
  deleteTech
}
