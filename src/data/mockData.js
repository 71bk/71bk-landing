// Mock Data for 71BK Portfolio Platform
// 用於前端開發測試，在 API 完成前使用

// ==========================================
// 技術標籤
// ==========================================
export const mockTechs = [
  { id: 1, name: 'Vue' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Spring Boot' },
  { id: 4, name: 'Java' },
  { id: 5, name: 'MySQL' },
  { id: 6, name: 'Docker' },
  { id: 7, name: 'Tailwind CSS' },
  { id: 8, name: 'TypeScript' },
  { id: 9, name: 'LINE SDK' },
  { id: 10, name: 'OAuth2.0' },
  { id: 11, name: 'JWT' },
  { id: 12, name: 'Nginx' },
  { id: 13, name: 'AWS' },
  { id: 14, name: 'Cloudflare' }
]

// ==========================================
// 作品集
// ==========================================
export const mockProjects = [
  {
    id: 1,
    slug: 'portfolio-cms',
    coverImageUrl: 'https://picsum.photos/seed/project1/800/600',
    titleZh: 'Portfolio CMS 整合平台',
    titleEn: 'Portfolio CMS Platform',
    summaryZh: '整合 LINE Login、OAuth2.0、JWT 認證的個人作品集管理系統，支援 Admin 後台與 Public 展示站。',
    summaryEn: 'Personal portfolio CMS with LINE Login, OAuth2.0, JWT authentication, supporting Admin console and Public showcase.',
    contentMdZh: `
## 專案背景

這是一個整合多項技術的個人作品集 CMS 系統...

## 技術架構

- 前端：Vue 3 + Vite + Tailwind CSS
- 後端：Spring Boot 4 + Spring Security
- 資料庫：MySQL 8
- 部署：Cloudflare Pages + AWS EC2

## 核心功能

1. LINE Login 整合
2. JWT 認證機制
3. 作品 CRUD 管理
4. 數據統計 Dashboard
    `,
    contentMdEn: `
## Background

This is a personal portfolio CMS integrating multiple technologies...

## Tech Stack

- Frontend: Vue 3 + Vite + Tailwind CSS
- Backend: Spring Boot 4 + Spring Security
- Database: MySQL 8
- Deployment: Cloudflare Pages + AWS EC2
    `,
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 1,
    category: 'SYSTEM',
    difficultyScore: 4,
    impactScore: 5,
    publishedAt: '2025-01-15T10:00:00Z',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    techs: [
      { id: 1, name: 'Vue' },
      { id: 3, name: 'Spring Boot' },
      { id: 5, name: 'MySQL' },
      { id: 9, name: 'LINE SDK' },
      { id: 10, name: 'OAuth2.0' },
      { id: 11, name: 'JWT' }
    ],
    links: [
      { id: 1, type: 'DEMO', url: 'https://71bk.dev', label: '查看網站' },
      { id: 2, type: 'GITHUB', url: 'https://github.com/71bk/portfolio', label: 'GitHub' }
    ]
  },
  {
    id: 2,
    slug: 'ecommerce-dashboard',
    coverImageUrl: 'https://picsum.photos/seed/project2/800/600',
    titleZh: '電商數據儀表板',
    titleEn: 'E-commerce Analytics Dashboard',
    summaryZh: '為線上零售商打造的即時分析儀表板，具備即時銷售追蹤與庫存管理功能。',
    summaryEn: 'Real-time analytics dashboard for online retailers with live sales tracking and inventory management.',
    contentMdZh: `
## 專案背景

協助電商客戶建立即時數據監控系統...

## 核心功能

1. 即時銷售追蹤
2. 庫存管理
3. 客戶分析
4. 報表匯出
    `,
    contentMdEn: `
## Background

Built a real-time data monitoring system for e-commerce clients...
    `,
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 2,
    category: 'FRONTEND',
    difficultyScore: 3,
    impactScore: 4,
    publishedAt: '2024-11-20T10:00:00Z',
    createdAt: '2024-10-01T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
    techs: [
      { id: 1, name: 'Vue' },
      { id: 7, name: 'Tailwind CSS' },
      { id: 8, name: 'TypeScript' }
    ],
    links: [
      { id: 3, type: 'DEMO', url: 'https://demo.example.com/dashboard', label: 'Live Demo' },
      { id: 4, type: 'GITHUB', url: 'https://github.com/71bk/ecommerce-dashboard', label: 'GitHub' }
    ]
  },
  {
    id: 3,
    slug: 'api-gateway',
    coverImageUrl: 'https://picsum.photos/seed/project3/800/600',
    titleZh: 'API 閘道服務',
    titleEn: 'API Gateway Service',
    summaryZh: '高效能微服務閘道，處理身份驗證、流量限制與請求路由。',
    summaryEn: 'High-performance microservice gateway handling authentication, rate limiting, and request routing.',
    contentMdZh: `
## 專案背景

為微服務架構設計的統一入口閘道...

## 技術特點

1. 身份驗證整合
2. Rate Limiting
3. 請求路由
4. 日誌追蹤
    `,
    contentMdEn: `
## Background

Unified gateway for microservices architecture...
    `,
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 3,
    category: 'BACKEND',
    difficultyScore: 5,
    impactScore: 5,
    publishedAt: '2024-09-10T10:00:00Z',
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-09-10T10:00:00Z',
    techs: [
      { id: 3, name: 'Spring Boot' },
      { id: 4, name: 'Java' },
      { id: 6, name: 'Docker' },
      { id: 12, name: 'Nginx' }
    ],
    links: [
      { id: 5, type: 'GITHUB', url: 'https://github.com/71bk/api-gateway', label: 'GitHub' },
      { id: 6, type: 'DOC', url: 'https://docs.example.com/gateway', label: '文件' }
    ]
  },
  {
    id: 4,
    slug: 'line-bot-platform',
    coverImageUrl: 'https://picsum.photos/seed/project4/800/600',
    titleZh: 'LINE Bot 訊息管理平台',
    titleEn: 'LINE Bot Messaging Platform',
    summaryZh: 'LINE Bot 訊息管理後台，支援 Webhook 接收、訊息紀錄、推播功能。',
    summaryEn: 'LINE Bot messaging backend with webhook handling, message logging, and push notifications.',
    contentMdZh: `
## 專案背景

整合 LINE Messaging API 的後台管理系統...

## 核心功能

1. Webhook 事件接收
2. 冪等性處理
3. 訊息紀錄查詢
4. 主動推播功能
    `,
    contentMdEn: `
## Background

Backend management system integrating LINE Messaging API...
    `,
    status: 'PUBLISHED',
    featured: false,
    sortOrder: 4,
    category: 'SYSTEM',
    difficultyScore: 4,
    impactScore: 4,
    publishedAt: '2024-08-05T10:00:00Z',
    createdAt: '2024-07-01T10:00:00Z',
    updatedAt: '2024-08-05T10:00:00Z',
    techs: [
      { id: 3, name: 'Spring Boot' },
      { id: 5, name: 'MySQL' },
      { id: 9, name: 'LINE SDK' }
    ],
    links: [
      { id: 7, type: 'GITHUB', url: 'https://github.com/71bk/line-bot', label: 'GitHub' }
    ]
  },
  {
    id: 5,
    slug: 'devops-pipeline',
    coverImageUrl: 'https://picsum.photos/seed/project5/800/600',
    titleZh: 'CI/CD 自動化部署流程',
    titleEn: 'CI/CD Automation Pipeline',
    summaryZh: '整合 GitHub Actions、Docker、AWS 的自動化部署流程。',
    summaryEn: 'Automated deployment pipeline integrating GitHub Actions, Docker, and AWS.',
    contentMdZh: `
## 專案背景

為團隊建立標準化的 CI/CD 流程...
    `,
    contentMdEn: `
## Background

Established standardized CI/CD workflow for the team...
    `,
    status: 'PUBLISHED',
    featured: false,
    sortOrder: 5,
    category: 'TOOL',
    difficultyScore: 3,
    impactScore: 4,
    publishedAt: '2024-06-20T10:00:00Z',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-20T10:00:00Z',
    techs: [
      { id: 6, name: 'Docker' },
      { id: 13, name: 'AWS' }
    ],
    links: [
      { id: 8, type: 'GITHUB', url: 'https://github.com/71bk/devops-pipeline', label: 'GitHub' },
      { id: 9, type: 'DOC', url: 'https://docs.example.com/devops', label: '文件' }
    ]
  }
]

// ==========================================
// 篩選用的分類選項
// ==========================================
export const mockCategories = [
  { value: 'SYSTEM', labelZh: '全端', labelEn: 'System Integration' },
  { value: 'FRONTEND', labelZh: '前端', labelEn: 'Frontend' },
  { value: 'BACKEND', labelZh: '後端', labelEn: 'Backend' },
  { value: 'TOOL', labelZh: '工具', labelEn: 'Tool' }
]

// ==========================================
// LINE 用戶（Admin 測試用）
// ==========================================
export const mockLineUsers = [
  {
    id: 1,
    lineUserId: 'U1234567890abcdef',
    displayName: '測試用戶 A',
    pictureUrl: 'https://picsum.photos/seed/user1/100/100',
    lastSeenAt: '2025-01-25T14:30:00Z',
    createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: 2,
    lineUserId: 'U0987654321fedcba',
    displayName: '測試用戶 B',
    pictureUrl: 'https://picsum.photos/seed/user2/100/100',
    lastSeenAt: '2025-01-24T09:15:00Z',
    createdAt: '2025-01-05T10:00:00Z'
  }
]

// ==========================================
// LINE 訊息紀錄（Admin 測試用）
// ==========================================
export const mockLineMessages = [
  {
    id: 1,
    eventId: 'evt_001',
    direction: 'INBOUND',
    lineUserId: 'U1234567890abcdef',
    messageType: 'text',
    messageText: '你好，請問有什麼作品？',
    status: 'RECEIVED',
    createdAt: '2025-01-25T14:30:00Z'
  },
  {
    id: 2,
    eventId: 'evt_002',
    direction: 'OUTBOUND',
    lineUserId: 'U1234567890abcdef',
    messageType: 'text',
    messageText: '歡迎！請到 71bk.dev 查看我的作品集。',
    status: 'SENT',
    createdAt: '2025-01-25T14:31:00Z'
  }
]

// ==========================================
// Analytics 事件（Admin 測試用）
// ==========================================
export const mockAnalyticsEvents = [
  { id: 1, eventType: 'PAGE_VIEW', path: '/', createdAt: '2025-01-25T10:00:00Z' },
  { id: 2, eventType: 'PROJECT_VIEW', projectId: 1, path: '/projects/portfolio-cms', createdAt: '2025-01-25T10:05:00Z' },
  { id: 3, eventType: 'LINK_CLICK', projectId: 1, linkId: 1, path: '/projects/portfolio-cms', createdAt: '2025-01-25T10:06:00Z' },
  { id: 4, eventType: 'PROJECT_VIEW', projectId: 2, path: '/projects/ecommerce-dashboard', createdAt: '2025-01-25T10:10:00Z' },
  { id: 5, eventType: 'SEARCH', path: '/projects', createdAt: '2025-01-25T10:15:00Z' }
]

// ==========================================
// Analytics 統計摘要（Admin Dashboard 用）
// ==========================================
export const mockAnalyticsSummary = {
  totalPageViews: 1250,
  totalProjectViews: 890,
  totalLinkClicks: 245,
  totalSearches: 78,
  topProjects: [
    { projectId: 1, title: 'Portfolio CMS 整合平台', views: 320 },
    { projectId: 2, title: '電商數據儀表板', views: 215 },
    { projectId: 3, title: 'API 閘道服務', views: 180 }
  ],
  topLinks: [
    { linkId: 1, label: '查看網站', type: 'DEMO', clicks: 95 },
    { linkId: 2, label: 'GitHub', type: 'GITHUB', clicks: 72 }
  ]
}

// ==========================================
// 輔助函式
// ==========================================

/**
 * 依 locale 取得作品標題
 */
export function getProjectTitle(project, locale = 'zh-TW') {
  return locale === 'en' ? project.titleEn : project.titleZh
}

/**
 * 依 locale 取得作品摘要
 */
export function getProjectSummary(project, locale = 'zh-TW') {
  return locale === 'en' ? project.summaryEn : project.summaryZh
}

/**
 * 取得精選作品
 */
export function getFeaturedProjects() {
  return mockProjects.filter(p => p.featured && p.status === 'PUBLISHED')
}

/**
 * 依 slug 取得作品
 */
export function getProjectBySlug(slug) {
  return mockProjects.find(p => p.slug === slug)
}

/**
 * 依分類篩選作品
 */
export function getProjectsByCategory(category) {
  return mockProjects.filter(p => p.category === category && p.status === 'PUBLISHED')
}

/**
 * 依技術篩選作品
 */
export function getProjectsByTech(techName) {
  return mockProjects.filter(p => 
    p.status === 'PUBLISHED' && 
    p.techs.some(t => t.name.toLowerCase() === techName.toLowerCase())
  )
}
