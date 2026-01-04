import http from '@/utils/http'

/**
 * Public Analytics API Module
 */

/**
 * 偵測裝置類型
 * @returns {string} 'Desktop' | 'Mobile' | 'Tablet'
 */
const detectDevice = () => {
  const ua = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'Tablet'
  }
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) {
    return 'Mobile'
  }
  return 'Desktop'
}

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
  
  // 自動加入 device 資訊
  const enrichedPayload = {
    ...payload,
    meta: {
      ...payload.meta,
      device: payload.meta?.device || detectDevice()
    }
  }
  
  return await http.post('/public/analytics/events', enrichedPayload)
}

export default {
  trackEvent
}
