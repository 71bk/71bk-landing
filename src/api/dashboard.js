import http from '@/utils/http'

/**
 * Dashboard API Module
 */

/**
 * Get dashboard summary
 * @param {number} [days=7] - recent days to include
 * @returns {Promise<Object>} summary data
 */
export const getSummary = async (days = 7) => {
  return await http.get('/admin/dashboard/summary', { params: { days } })
}

/**
 * Get dashboard events
 * @param {Object} params - query params
 * @param {number} [params.page=0] - page index
 * @param {number} [params.size=6] - page size
 * @param {number} [params.limit=6] - limit (same as size)
 * @returns {Promise<Object>} events payload
 */
export const getEvents = async (params = {}) => {
  const { page = 0, size = 6, limit } = params
  const query = { page, size }
  if (typeof limit === 'number') query.limit = limit
  return await http.get('/admin/dashboard/events', { params: query })
}

export default {
  getSummary,
  getEvents
}
