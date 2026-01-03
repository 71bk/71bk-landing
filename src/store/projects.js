import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import publicPortfolioApi from '@/api/publicPortfolio'
import { mockCategories } from '@/data/mockData'
import { getImageUrl } from '@/utils/imageUrl'

const normalizeLocale = (locale) => {
  if (!locale) return 'zh-TW'
  const normalized = String(locale).toLowerCase()
  if (normalized.startsWith('en')) return 'en'
  if (normalized === 'zh-tw' || normalized === 'zh_tw') return 'zh-TW'
  return locale
}

const pickLocalized = (project, baseKey, locale) => {
  if (!project) return ''
  const direct = project[baseKey]
  if (direct !== undefined && direct !== null && direct !== '') return direct

  const isEnglish = normalizeLocale(locale) === 'en'
  const camelKey = `${baseKey}${isEnglish ? 'En' : 'Zh'}`
  const camelValue = project[camelKey]
  if (camelValue !== undefined && camelValue !== null && camelValue !== '') return camelValue

  const snakeKey = `${baseKey}_${isEnglish ? 'en' : 'zh'}`
  const snakeValue = project[snakeKey]
  if (snakeValue !== undefined && snakeValue !== null && snakeValue !== '') return snakeValue

  const fallbackCamelKey = `${baseKey}${isEnglish ? 'Zh' : 'En'}`
  return project[fallbackCamelKey] ?? project[`${baseKey}_${isEnglish ? 'zh' : 'en'}`] ?? ''
}

const pickContent = (project, locale) => {
  const content = pickLocalized(project, 'content', locale)
  if (content) return content
  return pickLocalized(project, 'contentMd', locale)
}

const normalizeTechs = (techs) => {
  if (!Array.isArray(techs)) return []
  return techs
    .map((tech) => {
      if (!tech) return null
      if (typeof tech === 'string') return { id: tech, name: tech }

      const name = tech.name ?? tech.label ?? tech.tech ?? tech.title
      if (!name) return null
      return { id: tech.id ?? tech.techId ?? name, name }
    })
    .filter(Boolean)
}

const normalizeLinks = (links) => {
  if (!Array.isArray(links)) return []
  return links
    .map((link, index) => {
      if (!link) return null
      if (typeof link === 'string') {
        return { id: `${index}-${link}`, type: 'OTHER', url: link, label: null }
      }

      const url = link.url ?? link.href
      if (!url) return null
      return {
        id: link.id ?? link.linkId ?? `${link.type ?? 'OTHER'}-${url}`,
        type: link.type ?? link.linkType ?? link.kind ?? 'OTHER',
        url,
        label: link.label ?? link.name ?? null
      }
    })
    .filter(Boolean)
}

const normalizeProject = (project, locale) => {
  const resolvedLocale = normalizeLocale(locale)
  return {
    id: project.id ?? project.projectId ?? project.project_id ?? null,
    slug: project.slug ?? project.projectSlug ?? project.project_slug ?? '',
    title: pickLocalized(project, 'title', resolvedLocale),
    summary: pickLocalized(project, 'summary', resolvedLocale),
    content: pickContent(project, resolvedLocale),
    coverImage: getImageUrl(
      project.coverImage ??
      project.coverImageUrl ??
      project.cover_image_url ??
      null
    ),
    category: project.category ?? project.categoryCode ?? project.category_code ?? null,
    featured: Boolean(project.featured),
    status: project.status ?? null,
    sortOrder: project.sortOrder ?? project.sort_order ?? null,
    techs: normalizeTechs(
      project.techs ?? project.projectTechs ?? project.techNames ?? []
    ),
    links: normalizeLinks(project.links ?? project.projectLinks ?? project.project_links ?? []),
    difficultyScore: project.difficultyScore ?? project.difficulty_score ?? null,
    impactScore: project.impactScore ?? project.impact_score ?? null,
    publishedAt: project.publishedAt ?? project.published_at ?? null
  }
}

const isPublished = (project) => {
  return project.status ? project.status === 'PUBLISHED' : true
}

const upsertProject = (projects, project) => {
  const index = projects.findIndex((item) => item.slug === project.slug)
  if (index >= 0) {
    projects.splice(index, 1, project)
  } else {
    projects.push(project)
  }
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const categories = ref([...mockCategories])
  const currentLocale = ref('zh-TW')
  const loading = ref(false)
  const error = ref(null)

  const publishedProjects = computed(() =>
    projects.value.filter((project) => isPublished(project))
  )

  const featuredProjects = computed(() =>
    projects.value.filter((project) => isPublished(project) && project.featured)
  )

  const availableTechs = computed(() => {
    const map = new Map()
    projects.value.forEach((project) => {
      project.techs?.forEach((tech) => {
        if (!tech?.name) return
        const key = tech.name.toLowerCase()
        if (!map.has(key)) {
          map.set(key, { id: tech.id ?? tech.name, name: tech.name })
        }
      })
    })
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    )
  })

  const fetchProjects = async ({ locale, params, force } = {}) => {
    const resolvedLocale = normalizeLocale(locale ?? currentLocale.value)
    if (!force && projects.value.length > 0 && currentLocale.value === resolvedLocale) {
      return
    }

    loading.value = true
    error.value = null
    try {
      const response = await publicPortfolioApi.getPublicProjects({
        ...(params ?? {}),
        locale: resolvedLocale
      })
      const list = Array.isArray(response) ? response : response?.content ?? []
      projects.value = list.map((project) => normalizeProject(project, resolvedLocale))
      currentLocale.value = resolvedLocale
    } catch (err) {
      error.value = err?.message ?? 'Failed to load projects'
    } finally {
      loading.value = false
    }
  }

  const fetchProjectBySlug = async (slug, locale) => {
    const resolvedLocale = normalizeLocale(locale ?? currentLocale.value)
    const existing = projects.value.find((project) => project.slug === slug)
    if (existing && existing.content) {
      return existing
    }

    loading.value = true
    error.value = null
    try {
      const response = await publicPortfolioApi.getPublicProject(slug, {
        locale: resolvedLocale
      })
      if (!response) return null
      const normalized = normalizeProject(response, resolvedLocale)
      upsertProject(projects.value, normalized)
      return normalized
    } catch (err) {
      error.value = err?.message ?? 'Failed to load project'
      return null
    } finally {
      loading.value = false
    }
  }

  const getProjectBySlug = (slug) => {
    return projects.value.find((project) => project.slug === slug) || null
  }

  const getProjectsByCategory = (category) => {
    if (!category) return publishedProjects.value
    return publishedProjects.value.filter((project) => project.category === category)
  }

  const getProjectsByTech = (techName) => {
    if (!techName) return publishedProjects.value
    return publishedProjects.value.filter((project) =>
      project.techs?.some(
        (tech) => tech.name?.toLowerCase() === techName.toLowerCase()
      )
    )
  }

  return {
    projects,
    categories,
    availableTechs,
    loading,
    error,
    publishedProjects,
    featuredProjects,
    getProjectBySlug,
    getProjectsByCategory,
    getProjectsByTech,
    fetchProjects,
    fetchProjectBySlug
  }
})
