/**
 * Motion Config - 統一的動畫參數配置
 * 
 * 確保整站動畫風格一致
 */

// ==================
// Timing
// ==================
export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0
}

// ==================
// Easing
// ==================
export const ease = {
  // 進場動畫
  out: 'power3.out',
  outQuart: 'power4.out',
  outExpo: 'expo.out',
  
  // 退場動畫
  in: 'power2.in',
  inQuart: 'power4.in',
  
  // 雙向動畫
  inOut: 'power3.inOut',
  inOutQuart: 'power4.inOut',
  
  // 彈性
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'bounce.out',
  
  // 線性
  none: 'none'
}

// ==================
// Scroll Animation Presets
// ==================
export const scrollPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    duration: duration.slow,
    ease: ease.out
  },
  fadeInDown: {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
    duration: duration.slow,
    ease: ease.out
  },
  fadeInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
    duration: duration.slow,
    ease: ease.out
  },
  fadeInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
    duration: duration.slow,
    ease: ease.out
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: duration.normal,
    ease: ease.out
  },
  reveal: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: duration.normal,
    ease: ease.out
  }
}

// ==================
// Stagger Timing
// ==================
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  slower: 0.2
}

// ==================
// Parallax Presets
// ==================
export const parallaxPresets = {
  slow: { yPercent: -10 },
  medium: { yPercent: -20 },
  fast: { yPercent: -30 }
}

export default {
  duration,
  ease,
  scrollPresets,
  stagger,
  parallaxPresets
}
