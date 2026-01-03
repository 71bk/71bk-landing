<template>
  <Teleport to="body">
    <Transition name="menu">
      <div 
        v-show="isOpen" 
        class="menu-overlay"
        @keydown.esc="close"
      >
        <!-- Background -->
        <div ref="overlayBg" class="overlay-bg"></div>
        
        <!-- Content -->
        <div class="overlay-content">
          <!-- Close Button -->
          <button
            ref="closeBtn"
            class="close-btn"
            @click="close"
            @mousemove="closeBtnMagnetic.handleMouseMove"
            @mouseleave="closeBtnMagnetic.handleMouseLeave"
          >
            <span class="close-icon">✕</span>
          </button>

          <!-- Navigation Links -->
          <nav ref="navLinks" class="nav-links">
            <RouterLink
              v-for="(link, index) in navItems"
              :key="link.to"
              :to="link.to"
              class="nav-link"
              :style="{ '--index': index }"
              @click="close"
            >
              <span class="link-text">{{ link.label }}</span>
              <span class="link-arrow">→</span>
            </RouterLink>
          </nav>

          <!-- Footer -->
          <div ref="menuFooter" class="menu-footer">
            <div class="social-links">
              <a href="https://github.com/71bk" target="_blank" rel="noopener" class="social-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link">LinkedIn</a>
            </div>
            <p class="copyright">© 2026 71BK</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useUiStore } from '@/stores/ui'
import { useMagnetic } from '@/composables/useMagnetic'

const { t } = useI18n()
const uiStore = useUiStore()

// ==================
// State
// ==================
const isOpen = computed(() => uiStore.isMenuOpen)

// Refs
const overlayBg = ref(null)
const closeBtn = ref(null)
const navLinks = ref(null)
const menuFooter = ref(null)

// Close button magnetic effect
const closeBtnMagnetic = useMagnetic(closeBtn, { strength: 0.4 })

// ==================
// Nav Items
// ==================
const navItems = computed(() => [
  { to: '/', label: t('nav.work') },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: t('nav.about') },
  { to: '/contact', label: t('nav.getInTouch') }
])

// ==================
// Methods
// ==================
function close() {
  uiStore.closeMenu()
}

// ==================
// Animations
// ==================
watch(isOpen, async (open) => {
  if (open) {
    await animateOpen()
  }
})

async function animateOpen() {
  const tl = gsap.timeline()

  // 背景淡入
  tl.fromTo(
    overlayBg.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power2.out' }
  )

  // 導航連結依序進場
  const links = navLinks.value?.querySelectorAll('.nav-link')
  if (links) {
    tl.fromTo(
      links,
      { opacity: 0, x: -40 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.5, 
        stagger: 0.08,
        ease: 'power3.out'
      },
      '-=0.2'
    )
  }

  // 關閉按鈕進場
  tl.fromTo(
    closeBtn.value,
    { opacity: 0, rotate: -90 },
    { opacity: 1, rotate: 0, duration: 0.4, ease: 'power2.out' },
    '-=0.3'
  )

  // Footer 進場
  tl.fromTo(
    menuFooter.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    '-=0.2'
  )
}

// ==================
// Keyboard
// ==================
function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 8000;
}

.overlay-bg {
  position: absolute;
  inset: 0;
  background-color: rgb(var(--color-background));
}

.overlay-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--color-surface));
  border: 1px solid rgb(var(--color-border));
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  will-change: transform;
}

.close-btn:hover {
  background-color: rgb(var(--color-primary));
  border-color: rgb(var(--color-primary));
}

.close-btn:hover .close-icon {
  color: rgb(var(--color-surface));
}

.close-icon {
  font-size: 1.25rem;
  font-weight: 300;
  color: rgb(var(--color-text-main));
  transition: color 0.2s;
}

/* Navigation Links */
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgb(var(--color-border));
  text-decoration: none;
  transition: padding-left 0.3s ease;
}

.nav-link:hover {
  padding-left: 1rem;
}

.nav-link:hover .link-text {
  color: rgb(var(--color-primary));
}

.nav-link:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

.link-text {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  color: rgb(var(--color-text-main));
  transition: color 0.2s;
}

.link-arrow {
  font-size: 1.5rem;
  color: rgb(var(--color-primary));
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

/* Footer */
.menu-footer {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  font-size: 0.875rem;
  color: rgb(var(--color-text-muted));
  text-decoration: none;
  transition: color 0.2s;
}

.social-link:hover {
  color: rgb(var(--color-primary));
}

.copyright {
  font-size: 0.75rem;
  color: rgb(var(--color-text-muted));
}

/* Transition */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
