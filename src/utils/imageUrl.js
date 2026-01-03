/**
 * 圖片 URL 工具函數
 * 處理後端回傳的圖片路徑，確保使用正確的 API 前綴
 */

const envBaseUrl = import.meta.env.VITE_API_BASE_URL;
const baseUrl =
  typeof envBaseUrl === "string" && envBaseUrl.trim() ? envBaseUrl.trim() : "https://admin.71bk.dev";
const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

/**
 * 將圖片路徑轉換為完整的 URL
 * @param {string} imagePath - 圖片路徑 (可能是相對或絕對路徑)
 * @returns {string|null} 完整的圖片 URL
 * 
 * @example
 * // 相對路徑自動加上 /api 前綴
 * getImageUrl('/uploads/abc.png') // => 'https://admin.71bk.dev/api/uploads/abc.png'
 * 
 * // 已經有 /api 前綴的不重複加
 * getImageUrl('/api/uploads/abc.png') // => 'https://admin.71bk.dev/api/uploads/abc.png'
 * 
 * // 完整 URL 直接回傳
 * getImageUrl('https://example.com/image.png') // => 'https://example.com/image.png'
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // 如果已經是完整 URL，直接回傳
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // 確保路徑以 / 開頭
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // 如果路徑已經包含 /api，直接拼接基礎 URL
  if (path.startsWith('/api/')) {
    return `${normalizedBaseUrl}${path}`;
  }
  
  // 否則加上 /api 前綴
  return `${normalizedBaseUrl}/api${path}`;
};

export default {
  getImageUrl
};
