import http from '@/utils/http'

/**
 * Public Analytics API Module
 */

/**
 * Track public analytics event
 * @param {Object} payload - event payload
 * @returns {Promise<Object|null>} response data
 */
export const trackEvent = async (payload) => {
  const analyticsEnabled =
    String(import.meta.env.VITE_PUBLIC_ANALYTICS_ENABLED || '').toLowerCase() === 'true'
  if (!analyticsEnabled) return null
  if (!payload || !payload.eventType) return null
  return await http.post('/public/analytics/events', payload)
}

export default {
  trackEvent
}
