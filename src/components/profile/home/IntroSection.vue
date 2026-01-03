<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useMagnetic } from '@/composables/useMagnetic'

const { t } = useI18n()
const { fadeInUp } = useScrollAnimation()

// Element refs
const introSection = ref(null)
const introLeft = ref(null)
const introRight = ref(null)
const ctaBtn = ref(null)

// 磁吸按鈕
const ctaBtnMagnetic = useMagnetic(ctaBtn, { strength: 0.35 })

onMounted(() => {
  fadeInUp(introLeft, { y: 60, duration: 0.8 })
  fadeInUp(introRight, { y: 60, duration: 0.8, delay: 0.15 })
})
</script>

<template>
  <section ref="introSection" class="intro-section">
    <div class="intro-container">
      <!-- Left: Big Statement -->
      <div ref="introLeft" class="intro-left opacity-0">
        <h2 class="intro-statement">
          {{ t('intro.statement1') }} <span class="text-primary">{{ t('intro.digital') }}</span><br />
          {{ t('intro.statement2') }}<br />
          <span class="text-primary">{{ t('intro.matter') }}</span>
        </h2>
      </div>

      <!-- Right: Description + Button -->
      <div ref="introRight" class="intro-right opacity-0">
        <p class="intro-description">
          {{ t('intro.description1') }}
        </p>
        <p class="intro-description">
          {{ t('intro.description2') }}
        </p>
        
        <!-- CTA Button -->
        <a
          ref="ctaBtn"
          href="#work"
          class="intro-cta"
          @mousemove="ctaBtnMagnetic.handleMouseMove"
          @mouseleave="ctaBtnMagnetic.handleMouseLeave"
        >
          <span class="cta-text">{{ t('intro.viewWorks') }}</span>
          <span class="cta-arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro-section {
  padding: 6rem 0;
  background-color: rgb(var(--color-background));
}

.intro-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Left */
.intro-left {
  position: sticky;
  top: 6rem;
}

.intro-statement {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: rgb(var(--color-text-main));
}

/* Right */
.intro-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgb(var(--color-text-muted));
}

/* CTA Button */
.intro-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-surface));
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.intro-cta:hover {
  box-shadow: 0 20px 40px rgb(var(--color-primary) / 0.3);
}

.cta-text {
  position: relative;
  z-index: 1;
}

.cta-arrow {
  position: absolute;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.intro-cta:hover .cta-text {
  opacity: 0;
}

.intro-cta:hover .cta-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Responsive */
@media (max-width: 768px) {
  .intro-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .intro-left {
    position: static;
  }
  
  .intro-cta {
    width: 100px;
    height: 100px;
  }
}
</style>
