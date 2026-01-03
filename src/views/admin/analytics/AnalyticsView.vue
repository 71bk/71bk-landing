<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="admin-flex-between admin-mb-3">
      <h1>數據分析</h1>
      <select v-model="timeRange" class="admin-input time-filter">
        <option value="7">過去 7 天</option>
        <option value="30">過去 30 天</option>
      </select>
    </div>

    <!-- Key Metrics Cards -->
    <div class="admin-grid admin-grid-4 admin-mb-3">
      <div class="admin-card metric-card">
        <div class="metric-icon">📊</div>
        <div class="metric-value">{{ metrics.totalPV.toLocaleString() }}</div>
        <div class="metric-label">總頁面瀏覽</div>
        <div class="metric-change positive">+12.5%</div>
      </div>
      <div class="admin-card metric-card">
        <div class="metric-icon">👥</div>
        <div class="metric-value">{{ metrics.uniqueVisitors.toLocaleString() }}</div>
        <div class="metric-label">獨立訪客</div>
        <div class="metric-change positive">+8.3%</div>
      </div>
      <div class="admin-card metric-card">
        <div class="metric-icon">📉</div>
        <div class="metric-value">{{ metrics.bounceRate }}%</div>
        <div class="metric-label">跳出率</div>
        <div class="metric-change negative">+2.1%</div>
      </div>
      <div class="admin-card metric-card">
        <div class="metric-icon">⏱️</div>
        <div class="metric-value">{{ metrics.avgDuration }}</div>
        <div class="metric-label">平均停留時間</div>
        <div class="metric-change positive">+15s</div>
      </div>
    </div>

    <!-- Main Chart: Traffic Trend -->
    <div class="admin-card admin-mb-3">
      <h3 class="admin-card-title admin-mb-2">流量趨勢</h3>
      <div class="chart-container">
        <v-chart :option="trafficTrendOption" autoresize />
      </div>
    </div>

    <!-- Secondary Charts -->
    <div class="admin-grid admin-grid-3">
      <!-- Top Projects (Bar Chart) -->
      <div class="admin-card">
        <h3 class="admin-card-title admin-mb-2">熱門專案</h3>
        <div class="chart-container">
          <v-chart :option="topProjectsOption" autoresize />
        </div>
      </div>

      <!-- Top Links (Bar Chart) -->
      <div class="admin-card">
        <h3 class="admin-card-title admin-mb-2">Top Links</h3>
        <div class="chart-container">
          <v-chart :option="topLinksOption" autoresize />
        </div>
      </div>

      <!-- Device Distribution (Pie Chart) -->
      <div class="admin-card">
        <h3 class="admin-card-title admin-mb-2">裝置分佈</h3>
        <div class="chart-container">
          <v-chart :option="deviceDistributionOption" autoresize />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { LegacyGridContainLabel } from 'echarts/features'
import analyticsApi from '@/api/analytics'

// Register ECharts components
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LegacyGridContainLabel
])

// Theme colors (Indigo/Slate)
const themeColors = {
  primary: '#6366f1',      // Indigo-500
  secondary: '#8b5cf6',    // Violet-500
  accent: '#06b6d4',       // Cyan-500
  muted: '#64748b',        // Slate-500
  background: '#1e293b',   // Slate-800
  surface: '#334155'       // Slate-700
}

// Time range filter
const timeRange = ref('7')
const isLoading = ref(false)
const error = ref(null)

const metrics = ref({
  totalPV: 0,
  uniqueVisitors: 0,
  bounceRate: 0,
  avgDuration: '0m 0s'
})

const topProjects = ref([])
const topLinks = ref([])

const defaultTopProjects = [
  { title: 'Portfolio', views: 12580 },
  { title: 'Admin Console', views: 8920 },
  { title: 'LINE Bot', views: 6340 },
  { title: 'API Service', views: 4250 },
  { title: 'CLI Tools', views: 2180 }
]

const defaultTopLinks = [
  { title: 'Live Demo', clicks: 640 },
  { title: 'GitHub Repo', clicks: 520 },
  { title: 'Docs', clicks: 410 },
  { title: 'Figma', clicks: 280 },
  { title: 'Notion', clicks: 190 }
]

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload
  return payload?.content ?? payload?.items ?? payload?.data ?? []
}

const applyOverview = (data = {}) => {
  metrics.value = {
    totalPV: toNumber(data.totalPV ?? data.totalPageViews ?? data.totalViews ?? data.total_page_views, 0),
    uniqueVisitors: toNumber(data.uniqueVisitors ?? data.totalVisitors ?? data.unique_visitors, 0),
    bounceRate: toNumber(data.bounceRate ?? data.bounce_rate, 0),
    avgDuration: String(data.avgDuration ?? data.avg_duration ?? '0m 0s')
  }
}

const mapTopProjects = (items) => {
  return normalizeList(items).map((item, index) => ({
    title: item.title ?? item.projectTitle ?? item.name ?? item.slug ?? `Project ${index + 1}`,
    views: toNumber(item.views ?? item.viewCount ?? item.count ?? item.total, 0)
  }))
}

const mapTopLinks = (items) => {
  return normalizeList(items).map((item, index) => ({
    title: item.label ?? item.title ?? item.name ?? item.url ?? `Link ${index + 1}`,
    clicks: toNumber(item.clicks ?? item.count ?? item.total ?? item.value, 0)
  }))
}

const loadAnalytics = async () => {
  const days = toNumber(timeRange.value, 7)
  isLoading.value = true
  error.value = null

  try {
    const [overviewData, topProjectsData, topLinksData] = await Promise.all([
      analyticsApi.getOverview(days),
      analyticsApi.getTopProjects(days, 5),
      analyticsApi.getTopLinks(days, 5)
    ])

    applyOverview(overviewData ?? {})
    topProjects.value = mapTopProjects(topProjectsData)
    topLinks.value = mapTopLinks(topLinksData)
  } catch (err) {
    error.value = err?.message ?? 'Failed to load analytics'
    topProjects.value = []
    topLinks.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadAnalytics()
})

watch(timeRange, () => {
  loadAnalytics()
})

// Generate date labels based on time range
const dateLabels = computed(() => {
  const days = parseInt(timeRange.value)
  const labels = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    labels.push(`${date.getMonth() + 1}/${date.getDate()}`)
  }
  return labels
})

// Traffic Trend Chart Option (Line Chart - Dual Axis)
const trafficTrendOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: themeColors.surface,
    borderColor: themeColors.muted,
    textStyle: { color: '#e2e8f0' }
  },
  legend: {
    data: ['Page Views', 'Visitors'],
    textStyle: { color: '#94a3b8' },
    top: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: dateLabels.value,
    axisLabel: { color: '#94a3b8' },
    axisLine: { lineStyle: { color: '#475569' } }
  },
  yAxis: [
    {
      type: 'value',
      name: 'PV',
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#475569' } },
      splitLine: { lineStyle: { color: '#334155' } }
    },
    {
      type: 'value',
      name: 'UV',
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#475569' } },
      splitLine: { show: false }
    }
  ],
  series: [
    {
      name: 'Page Views',
      type: 'line',
      smooth: true,
      yAxisIndex: 0,
      itemStyle: { color: themeColors.primary },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
            { offset: 1, color: 'rgba(99, 102, 241, 0.05)' }
          ]
        }
      },
      data: generateMockData(parseInt(timeRange.value), 800, 2000)
    },
    {
      name: 'Visitors',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      itemStyle: { color: themeColors.accent },
      data: generateMockData(parseInt(timeRange.value), 200, 600)
    }
  ]
}))

// Top Projects Chart Option (Horizontal Bar Chart)
const topProjectsOption = computed(() => {
  const list = topProjects.value.length ? topProjects.value : defaultTopProjects
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: themeColors.surface,
      borderColor: themeColors.muted,
      textStyle: { color: '#e2e8f0' }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#475569' } },
      splitLine: { lineStyle: { color: '#334155' } }
    },
    yAxis: {
      type: 'category',
      data: list.map((item) => item.title),
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#475569' } }
    },
    series: [
      {
        name: 'Views',
        type: 'bar',
        data: list.map((item) => item.views),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: themeColors.primary },
              { offset: 1, color: themeColors.secondary }
            ]
          },
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  }
})

// Top Links Chart Option (Horizontal Bar Chart)
const topLinksOption = computed(() => {
  const list = topLinks.value.length ? topLinks.value : defaultTopLinks
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: themeColors.surface,
      borderColor: themeColors.muted,
      textStyle: { color: '#e2e8f0' }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#475569' } },
      splitLine: { lineStyle: { color: '#334155' } }
    },
    yAxis: {
      type: 'category',
      data: list.map((item) => item.title),
      axisLabel: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: '#475569' } }
    },
    series: [
      {
        name: 'Clicks',
        type: 'bar',
        data: list.map((item) => item.clicks),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: themeColors.accent },
              { offset: 1, color: themeColors.primary }
            ]
          },
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  }
})

// Device Distribution Chart Option (Pie Chart)
const deviceDistributionOption = ref({
  tooltip: {
    trigger: 'item',
    backgroundColor: themeColors.surface,
    borderColor: themeColors.muted,
    textStyle: { color: '#e2e8f0' },
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    textStyle: { color: '#94a3b8' }
  },
  series: [
    {
      name: 'Device',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: themeColors.background,
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#e2e8f0'
        }
      },
      labelLine: { show: false },
      data: [
        { value: 18540, name: 'Desktop', itemStyle: { color: themeColors.primary } },
        { value: 12350, name: 'Mobile', itemStyle: { color: themeColors.accent } },
        { value: 2001, name: 'Tablet', itemStyle: { color: themeColors.secondary } }
      ]
    }
  ]
})

// Helper: Generate mock data
function generateMockData(days, min, max) {
  const data = []
  for (let i = 0; i < days; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return data
}
</script>

<style scoped>
/* Time filter */
.time-filter {
  width: 160px;
}

/* Metric Card Styles */
.metric-card {
  text-align: center;
  position: relative;
}

.metric-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: rgb(var(--color-primary));
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
  font-weight: 500;
}

.metric-change {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.metric-change.positive {
  background-color: #dcfce7;
  color: #166534;
}

.metric-change.negative {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Chart Container - Fixed height for ECharts */
.chart-container {
  height: 300px;
  width: 100%;
}

/* Card alignment */
.admin-card {
  text-align: left;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
  
  .metric-value {
    font-size: 1.5rem;
  }
}
</style>
