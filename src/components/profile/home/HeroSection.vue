<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { parallax } = useScrollAnimation()

// Element refs
const heroSection = ref(null)
const personalImage = ref(null)
const hanger = ref(null)
const roleContent = ref(null)
const bigName = ref(null)

// Marquee animation
let marqueeAnimation = null

onMounted(() => {
  // 背景視差效果 - 向上移動
  if (personalImage.value) {
    parallax(personalImage, { yPercent: -15 })
  }
  
  // 進場動畫序列
  const tl = gsap.timeline({ delay: 0.5 })
  
  // Location hanger
  if (hanger.value) {
    tl.fromTo(
      hanger.value,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
  }
  
  // Role content
  if (roleContent.value) {
    tl.fromTo(
      roleContent.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
  }
  
  // Big name
  if (bigName.value) {
    tl.fromTo(
      bigName.value,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    
    // 開始水平滾動動畫
    tl.add(() => startMarquee(), '-=0.3')
  }
})

function startMarquee() {
  const nameWrap = bigName.value?.querySelector('.name-wrap')
  if (!nameWrap) return
  
  // 無限水平滾動
  marqueeAnimation = gsap.to(nameWrap, {
    xPercent: -50,
    duration: 25,
    ease: 'none',
    repeat: -1
  })
}

onUnmounted(() => {
  if (marqueeAnimation) {
    marqueeAnimation.kill()
  }
})
</script>

<template>
  <header ref="heroSection" class="hero-header">
    <!-- Personal Image with Parallax -->
    <div ref="personalImage" class="personal-image">
      <img 
        src="/hero-bg.jpg" 
        alt="Profile"
        loading="eager"
      />
    </div>
    
    <!-- Overlay for readability -->
    <div class="hero-overlay"></div>
    
    <!-- Location Hanger - Left Side -->
    <div ref="hanger" class="hanger">
      <div class="hanger-content">
        <p class="hanger-text">
          <span>Located</span>
          <span>in</span>
          <span>Taiwan</span>
        </p>
        <div class="hanger-shape">
          <div class="digital-ball">
            <div class="globe">
              <div class="globe-wrap">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle-hor"></div>
                <div class="circle-hor-middle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Role Content - Right Side -->
    <div ref="roleContent" class="role-content">
      <div class="arrow-down">↘</div>
      <h4 class="role-text">
        <span>{{ t('hero.nameMain') }}</span>
        <span>{{ t('hero.nameSub') }}</span>
      </h4>
    </div>
    
    <!-- Big Name - Bottom, Horizontal Scroll -->
    <div ref="bigName" class="big-name">
      <div class="name-wrap">
        <h1 class="name-text">
          IanHsu<span class="spacer">—</span>IanHsu<span class="spacer">—</span>IanHsu<span class="spacer">—</span>IanHsu<span class="spacer">—</span>
        </h1>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero-header {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #020617; /* Matches tailwind bg-slate-950 */
}

/* Personal Image - Centered Portrait */
.personal-image {
  position: absolute;
  inset: 0;
  z-index: 1;
  will-change: transform;
}

.personal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

/* Overlay - stronger for Option B */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgb(var(--color-background) / 0.3) 0%,
    rgb(var(--color-background) / 0.4) 40%,
    rgb(var(--color-background) / 0.7) 70%,
    rgb(var(--color-background)) 100%
  );
  pointer-events: none;
}

/* Hanger - Location Badge */
.hanger {
  position: absolute;
  bottom: 20rem;
  left: 2rem;
  z-index: 10;
}

.hanger-content {
  display: flex;
  align-items: center;
  background-color: #1C1D20;
  border-radius: 0 60px 60px 0;
  padding-right: 0.5rem;
  overflow: hidden;
}

.hanger-text {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 0.75rem;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.hanger-text span {
  display: block;
}

.hanger-shape {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Digital Globe */
.digital-ball {
  width: 42px;
  height: 42px;
  position: relative;
}

.globe {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  position: relative;
}

.globe-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  animation: globeRotate 15s linear infinite;
}

.circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.circle:nth-child(1) {
  transform: rotateY(0deg);
}

.circle:nth-child(2) {
  transform: rotateY(60deg);
}

.circle:nth-child(3) {
  transform: rotateY(-60deg);
}

.circle-hor,
.circle-hor-middle {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.circle-hor {
  top: 25%;
}

.circle-hor-middle {
  top: 50%;
}

@keyframes globeRotate {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
}

/* Role Content - Right Side */
.role-content {
  position: absolute;
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: rgb(var(--color-text-main));
  text-align: left;
}

.arrow-down {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1;
}

.role-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.role-text span {
  display: block;
}

/* Big Name - Bottom Horizontal Scroll */
.big-name {
  position: absolute;
  bottom: 4rem;
  left: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  padding: 0;
}

.name-wrap {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}

.name-text {
  display: inline-flex;
  align-items: center;
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 300;
  letter-spacing: -0.04em;
  color: rgb(var(--color-text-main));
  line-height: 1;
  text-transform: uppercase;
  margin: 0;
}

.spacer {
  margin: 0 1rem;
  opacity: 0.5;
  font-weight: 200;
}

/* Responsive */
@media (max-width: 768px) {
  .hanger {
    bottom: 15rem;
    left: 1rem;
  }
  
  .hanger-text {
    font-size: 0.65rem;
    padding: 0.5rem 0.75rem;
  }
  
  .hanger-shape {
    width: 40px;
    height: 40px;
  }
  
  .digital-ball {
    width: 34px;
    height: 34px;
  }
  
  .role-content {
    right: 1.5rem;
    top: 40%;
  }
  
  .role-text {
    font-size: 1rem;
  }
  
  .arrow-down {
    font-size: 1.25rem;
  }
  
  .big-name {
    bottom: 4rem;
  }
}
</style>
