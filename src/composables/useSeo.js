import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

/**
 * useSeo - SEO Meta Tags Composable
 * 
 * 管理頁面的 SEO 標籤：title, description, og tags
 */

// 預設 SEO 配置
const defaultSeo = {
  siteName: '71BK | Full-Stack Developer',
  titleTemplate: '%s | 71BK',
  description: '專業全端工程師，專精於 Vue.js、React、Node.js 開發。打造高品質網頁應用程式。',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  locale: 'zh-TW'
}

/**
 * 設定 meta tag
 */
function setMeta(name, content, isProperty = false) {
  if (!content) return
  
  const attr = isProperty ? 'property' : 'name'
  let element = document.querySelector(`meta[${attr}="${name}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, name)
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', content)
}

/**
 * 設定頁面 SEO
 */
export function setSeo(options = {}) {
  const {
    title,
    description = defaultSeo.description,
    ogImage = defaultSeo.ogImage,
    ogType = 'website',
    noIndex = false
  } = options

  // Title
  if (title) {
    document.title = defaultSeo.titleTemplate.replace('%s', title)
  } else {
    document.title = defaultSeo.siteName
  }

  // Description
  setMeta('description', description)
  
  // Open Graph
  setMeta('og:title', title || defaultSeo.siteName, true)
  setMeta('og:description', description, true)
  setMeta('og:type', ogType, true)
  setMeta('og:image', ogImage, true)
  setMeta('og:site_name', defaultSeo.siteName, true)
  setMeta('og:locale', defaultSeo.locale, true)
  
  // Twitter
  setMeta('twitter:card', defaultSeo.twitterCard)
  setMeta('twitter:title', title || defaultSeo.siteName)
  setMeta('twitter:description', description)
  setMeta('twitter:image', ogImage)
  
  // Robots
  if (noIndex) {
    setMeta('robots', 'noindex, nofollow')
  } else {
    setMeta('robots', 'index, follow')
  }
}

/**
 * useSeo Composable
 */
export function useSeo(initialOptions = {}) {
  const route = useRoute()
  const currentSeo = ref(initialOptions)

  // 設定 SEO
  function updateSeo(options) {
    currentSeo.value = { ...currentSeo.value, ...options }
    setSeo(currentSeo.value)
  }

  // 初始設定
  onMounted(() => {
    if (Object.keys(initialOptions).length > 0) {
      setSeo(initialOptions)
    }
  })

  // 路由變化時更新 canonical URL
  watch(
    () => route.fullPath,
    (path) => {
      setMeta('og:url', `${window.location.origin}${path}`, true)
    },
    { immediate: true }
  )

  return {
    currentSeo,
    updateSeo,
    setSeo
  }
}

export default useSeo
