import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import zhTW from '../locales/zh-TW.json'

// 取得瀏覽器語言或從 localStorage 讀取
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) return savedLocale

  const browserLocale = navigator.language
  if (browserLocale.startsWith('zh')) return 'zh-TW'
  return 'en'
}

const i18n = createI18n({
  legacy: false,                    // 使用 Composition API
  locale: getDefaultLocale(),       // 預設語言
  fallbackLocale: 'en',             // 後備語言
  messages: {
    en,
    'zh-TW': zhTW
  }
})

// 切換語言並儲存到 localStorage
export const setLocale = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

export default i18n
