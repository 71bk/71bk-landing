import http from '@/utils/http'

/**
 * Upload API Module
 * 檔案上傳
 */

/**
 * 上傳檔案
 * @param {File} file - 要上傳的檔案
 * @returns {Promise<Object>} 上傳結果 { url, path }
 */
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return await http.post('/admin/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  uploadFile
}
