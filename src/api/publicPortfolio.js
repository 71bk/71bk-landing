import http from '@/utils/http'

/**
 * Public Portfolio API Module
 */

export const getPublicProjects = async (params = {}) => {
  return await http.get('/public/portfolio/projects', { params })
}

export const getPublicProject = async (slug, params = {}) => {
  return await http.get(`/public/portfolio/projects/${slug}`, { params })
}

export default {
  getPublicProjects,
  getPublicProject
}
