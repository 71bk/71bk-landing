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
        <div class="metric-value">{{ metrics.pageViews.toLocaleString() }}</div>
        <div class="metric-label">頁面瀏覽</div>
      </div>
      <div class="admin-card metric-card">
        <div class="metric-icon">📁</div>
        <div class="metric-value">{{ metrics.projectViews.toLocaleString() }}</div>
        <div class="metric-label">專案瀏覽</div>
      </div>
      <div class="admin-card metric-card">
        <div class="metric-icon">🔗</div>
        <div class="metric-value">{{ metrics.linkClicks.toLocaleString() }}</div>
        <div class="metric-label">連結點擊</div>
      </div>
      <div class="admin-card metric-card">
        <div class="metric-icon">💬</div>
        <div class="metric-value">{{ metrics.chatQueries.toLocaleString() }}</div>
        <div class="metric-label">聊天查詢</div>
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
  pageViews: 0,
  projectViews: 0,
  linkClicks: 0,
  chatQueries: 0
})

const topProjects = ref([])
const topLinks = ref([])
const trendData = ref([])
const devicesData = ref([])

// 當沒有資料時顯示的預設值（空陣列，會顯示無資料狀態）
const defaultTopProjects = []
const defaultTopLinks = []

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
    pageViews: toNumber(data.pageViews ?? data.page_views, 0),
    projectViews: toNumber(data.projectViews ?? data.project_views, 0),
    linkClicks: toNumber(data.linkClicks ?? data.link_clicks, 0),
    chatQueries: toNumber(data.chatQueries ?? data.chat_queries, 0)
  }
}

const mapTopProjects = (items) => {
  return normalizeList(items).map((item, index) => ({
    title: item.titleZh ?? item.titleEn ?? item.title ?? item.slug ?? `Project ${index + 1}`,
    views: toNumber(item.views ?? item.viewCount, 0)
  }))
}

const mapTopLinks = (items) => {
  return normalizeList(items).map((item, index) => ({
    title: item.label ?? item.title ?? `Link ${index + 1}`,
    clicks: toNumber(item.clicks ?? item.count, 0)
  }))
}

const loadAnalytics = async () => {
  const days = toNumber(timeRange.value, 7)
  isLoading.value = true
  error.value = null

  try {
    const [overviewData, topProjectsData, topLinksData, trendDataRes, devicesDataRes] = await Promise.all([
      analyticsApi.getOverview(days),
      analyticsApi.getTopProjects(days, 5),
      analyticsApi.getTopLinks(days, 5),
      analyticsApi.getTrend(days),
      analyticsApi.getDevices(days)
    ])

    applyOverview(overviewData ?? {})
    topProjects.value = mapTopProjects(topProjectsData)
    topLinks.value = mapTopLinks(topLinksData)
    trendData.value = normalizeList(trendDataRes)
    devicesData.value = normalizeList(devicesDataRes)
  } catch (err) {
    error.value = err?.message ?? 'Failed to load analytics'
    topProjects.value = []
    topLinks.value = []
    trendData.value = []
    devicesData.value = []
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

// Generate date labels from trend data or fallback to generated dates
const dateLabels = computed(() => {
  if (trendData.value.length > 0) {
    return trendData.value.map(item => {
      const date = new Date(item.date)
      return `${date.getMonth() + 1}/${date.getDate()}`
    })
  }
  // Fallback: generate date labels
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
const trafficTrendOption = computed(() => {
  const pageViewsData = trendData.value.map(item => item.pageViews ?? 0)
  const projectViewsData = trendData.value.map(item => item.projectViews ?? 0)
  
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: themeColors.surface,
      borderColor: themeColors.muted,
      textStyle: { color: '#e2e8f0' }
    },
    legend: {
      data: ['頁面瀏覽', '專案瀏覽'],
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
        name: '專案',
        axisLabel: { color: '#94a3b8' },
        axisLine: { lineStyle: { color: '#475569' } },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '頁面瀏覽',
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
        data: pageViewsData
      },
      {
        name: '專案瀏覽',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        itemStyle: { color: themeColors.accent },
        data: projectViewsData
      }
    ]
  }
})

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
const deviceDistributionOption = computed(() => {
  const deviceColors = {
    'Desktop': themeColors.primary,
    'Mobile': themeColors.accent,
    'Tablet': themeColors.secondary
  }
  
  const chartData = devicesData.value.length > 0
    ? devicesData.value.map(item => ({
        value: item.count ?? 0,
        name: item.device ?? 'Unknown',
        itemStyle: { color: deviceColors[item.device] || themeColors.muted }
      }))
    : []
  
  return {
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
        data: chartData
      }
    ]
  }
})


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
