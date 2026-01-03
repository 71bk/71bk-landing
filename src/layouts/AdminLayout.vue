<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Mobile drawer state
const isDrawerOpen = ref(false)

// Navigation menu items
const menuItems = [
  { to: '/admin/dashboard', label: '儀表板', icon: 'grid' },
  { to: '/admin/projects', label: '作品集', icon: 'folder' },
  { to: '/admin/techs', label: '技術標籤', icon: 'tag' },
  { to: '/admin/line-users', label: 'LINE 用戶', icon: 'users' },
  { to: '/admin/line-logs', label: '訊息紀錄', icon: 'message' },
  { to: '/admin/analytics', label: '數據分析', icon: 'chart' },
  { to: '/admin/settings', label: '系統設定', icon: 'settings' }
]

// Toggle drawer
function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Close drawer
function closeDrawer() {
  isDrawerOpen.value = false
}
</script>

<template>
  <div class="admin-layout">
    <!-- Mobile Header -->
    <header class="admin-mobile-header">
      <button 
        class="admin-hamburger" 
        @click="toggleDrawer"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <span class="admin-logo-text">71BK Admin</span>
    </header>

    <!-- Mobile Overlay -->
    <div 
      v-if="isDrawerOpen" 
      class="admin-overlay"
      @click="closeDrawer"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="admin-sidebar"
      :class="{ 'is-open': isDrawerOpen }"
    >
      <!-- Logo -->
      <div class="sidebar-header">
        <RouterLink to="/admin/dashboard" class="sidebar-logo">
          <span class="logo-icon">71</span>
          <span class="logo-text">BK Admin</span>
        </RouterLink>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="nav-link-active"
          @click="closeDrawer"
        >
          <!-- Icons -->
          <svg 
            v-if="item.icon === 'grid'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <svg 
            v-else-if="item.icon === 'folder'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <svg 
            v-else-if="item.icon === 'tag'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <svg 
            v-else-if="item.icon === 'users'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg 
            v-else-if="item.icon === 'message'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <svg 
            v-else-if="item.icon === 'chart'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <svg 
            v-else-if="item.icon === 'settings'" 
            class="nav-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="nav-label">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <RouterLink to="/" class="nav-link nav-link-back">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span class="nav-label">返回網站</span>
        </RouterLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* ========================================
   Admin Layout Container
   ======================================== */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: rgb(var(--color-background));
}

/* ========================================
   Mobile Header (visible on mobile only)
   ======================================== */
.admin-mobile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  padding: 0 1rem;
  background-color: rgb(var(--color-surface));
  border-bottom: 1px solid rgb(var(--color-border));
  z-index: 40;
}

@media (min-width: 768px) {
  .admin-mobile-header {
    display: none;
  }
}

.admin-logo-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
}

/* Hamburger Button */
.admin-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(var(--color-text-main));
  border-radius: 1px;
  transition: all 0.2s ease;
}

/* ========================================
   Mobile Overlay
   ======================================== */
.admin-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 45;
}

@media (min-width: 768px) {
  .admin-overlay {
    display: none;
  }
}

/* ========================================
   Sidebar
   ======================================== */
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 16rem; /* 256px */
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--color-surface));
  border-right: 1px solid rgb(var(--color-border));
  z-index: 50;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.admin-sidebar.is-open {
  transform: translateX(0);
}

@media (min-width: 768px) {
  .admin-sidebar {
    transform: translateX(0);
  }
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 1.5rem;
  border-bottom: 1px solid rgb(var(--color-border));
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: rgb(var(--color-primary));
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 0.5rem;
}

.logo-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--color-text-main));
}

/* Sidebar Navigation */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
  overflow-y: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--color-text-muted));
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-text-main));
}

.nav-link-active {
  background-color: rgb(var(--color-primary) / 0.1);
  color: rgb(var(--color-primary));
}

.nav-link-active:hover {
  background-color: rgb(var(--color-primary) / 0.15);
  color: rgb(var(--color-primary));
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid rgb(var(--color-border));
}

.nav-link-back {
  color: rgb(var(--color-text-muted));
}

.nav-link-back:hover {
  color: rgb(var(--color-text-main));
}

/* ========================================
   Main Content Area
   ======================================== */
.admin-main {
  flex: 1;
  margin-top: 4rem; /* Mobile header height */
  min-height: calc(100vh - 4rem);
}

@media (min-width: 768px) {
  .admin-main {
    margin-top: 0;
    margin-left: 16rem; /* Sidebar width */
    min-height: 100vh;
  }
}
</style>
