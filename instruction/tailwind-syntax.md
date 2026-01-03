# 71BK Portfolio - Tailwind CSS 語法整理

> 本文件整理專案中使用的 Tailwind CSS 語法，方便學習與講解。
> 最後更新：2025-12-28

---

## 目錄

1. [佈局 Layout](#1-佈局-layout)
2. [Flexbox](#2-flexbox)
3. [Grid](#3-grid)
4. [間距 Spacing](#4-間距-spacing)
5. [尺寸 Sizing](#5-尺寸-sizing)
6. [文字 Typography](#6-文字-typography)
7. [顏色與背景 Colors](#7-顏色與背景-colors)
8. [邊框 Borders](#8-邊框-borders)
9. [陰影 Shadows](#9-陰影-shadows)
10. [動畫效果 Transitions](#10-動畫效果-transitions)
11. [響應式設計 Responsive](#11-響應式設計-responsive)
12. [互動狀態 States](#12-互動狀態-states)
13. [定位 Positioning](#13-定位-positioning)
14. [其他特殊語法](#14-其他特殊語法)

---

## 1. 佈局 Layout

### Container / Max-width
| 語法 | 說明 | 出處 |
|------|------|------|
| `max-w-7xl` | 最大寬度 80rem (1280px) | `HeroSection.vue`, `SkillsSection.vue` |
| `max-w-4xl` | 最大寬度 56rem (896px) | `ProjectDetailHero.vue` |
| `max-w-3xl` | 最大寬度 48rem (768px) | `HeroSection.vue` |
| `max-w-2xl` | 最大寬度 42rem (672px) | `SkillsSection.vue` |
| `mx-auto` | 水平置中（margin-left/right: auto） | 多處使用 |
| `w-full` | 寬度 100% | 多處使用 |
| `min-w-[200px]` | 最小寬度 200px（任意值） | `ProjectsFilters.vue` |

### Overflow
| 語法 | 說明 | 出處 |
|------|------|------|
| `overflow-hidden` | 隱藏溢出內容 | `ProjectCard.vue`, `HeroSection.vue` |

---

## 2. Flexbox

### 基本 Flex
| 語法 | 說明 | 出處 |
|------|------|------|
| `flex` | 啟用 flex 佈局 | 多處使用 |
| `flex-col` | 垂直排列（flex-direction: column） | `ProjectsFilters.vue`, `FeaturedProjects.vue` |
| `flex-row` | 水平排列（預設） | `ProjectsFilters.vue` |
| `flex-wrap` | 允許換行 | `ProjectsFilters.vue` |
| `flex-1` | flex: 1（填滿剩餘空間） | `ProjectsFilters.vue` |
| `shrink-0` | 不允許收縮 | `ProjectsFilters.vue` |

### 對齊
| 語法 | 說明 | 出處 |
|------|------|------|
| `items-center` | 垂直置中 | `HeroSection.vue`, `SkillsSection.vue` |
| `justify-center` | 水平置中 | `HeroSection.vue` |
| `justify-between` | 兩端對齊 | `ProjectsNav.vue`, `ProjectsFilters.vue` |
| `justify-end` | 靠右對齊 | `ProjectDetailPager.vue` |

### 間隙
| 語法 | 說明 | 出處 |
|------|------|------|
| `gap-2` | 間隙 0.5rem (8px) | `ProjectsFilters.vue` |
| `gap-3` | 間隙 0.75rem (12px) | `SkillsSection.vue` |
| `gap-4` | 間隙 1rem (16px) | `ProjectDetailMeta.vue` |
| `gap-6` | 間隙 1.5rem (24px) | `ProjectsGrid.vue` |
| `gap-8` | 間隙 2rem (32px) | `FeaturedProjects.vue` |
| `gap-x-6` | 水平間隙 1.5rem | `HeroSection.vue` |

---

## 3. Grid

| 語法 | 說明 | 出處 |
|------|------|------|
| `grid` | 啟用 grid 佈局 | `ProjectsGrid.vue`, `SkillsSection.vue` |
| `grid-cols-1` | 1 欄 | `ProjectsGrid.vue` |
| `grid-cols-2` | 2 欄 | `ProjectDetailMeta.vue` |
| `md:grid-cols-2` | 中等螢幕 2 欄 | `ProjectsGrid.vue` |
| `md:grid-cols-3` | 中等螢幕 3 欄 | `SkillsSection.vue` |
| `md:grid-cols-4` | 中等螢幕 4 欄 | `ProjectDetailMeta.vue` |
| `lg:grid-cols-3` | 大螢幕 3 欄 | `ProjectsGrid.vue` |

---

## 4. 間距 Spacing

### Padding
| 語法 | 說明 | 出處 |
|------|------|------|
| `p-5` | 全方向 padding 1.25rem | `ProjectCard.vue` |
| `p-8` | 全方向 padding 2rem | `SkillsSection.vue` |
| `px-2.5` | 水平 padding 0.625rem | `FeaturedProjects.vue` |
| `px-3` | 水平 padding 0.75rem | `ProjectsFilters.vue` |
| `px-4` | 水平 padding 1rem | `ProjectsFilters.vue` |
| `px-6` | 水平 padding 1.5rem | `HeroSection.vue`, `ProjectsNav.vue` |
| `py-0.5` | 垂直 padding 0.125rem | `FeaturedProjects.vue` |
| `py-1.5` | 垂直 padding 0.375rem | `ProjectsFilters.vue` |
| `py-2.5` | 垂直 padding 0.625rem | `ProjectsFilters.vue` |
| `py-3` | 垂直 padding 0.75rem | `HeroSection.vue` |
| `py-4` | 垂直 padding 1rem | `ProjectsNav.vue` |
| `py-12` | 垂直 padding 3rem | `ProjectsView.vue` |
| `py-20` | 垂直 padding 5rem | `FeaturedProjects.vue` |
| `py-24` | 垂直 padding 6rem | `SkillsSection.vue` |
| `pt-8` | 上方 padding 2rem | `ProjectsFilters.vue` |
| `pt-16` | 上方 padding 4rem | `ProjectDetailHero.vue` |
| `pb-12` | 下方 padding 3rem | `ProjectDetailHero.vue` |

### Margin
| 語法 | 說明 | 出處 |
|------|------|------|
| `mb-2` | 下方 margin 0.5rem | `ProjectCard.vue` |
| `mb-4` | 下方 margin 1rem | `ProjectCard.vue`, `ProjectsGrid.vue` |
| `mb-6` | 下方 margin 1.5rem | `HeroSection.vue`, `SkillsSection.vue` |
| `mb-10` | 下方 margin 2.5rem | `HeroSection.vue`, `ProjectDetailHero.vue` |
| `mb-12` | 下方 margin 3rem | `FeaturedProjects.vue` |
| `mb-16` | 下方 margin 4rem | `SkillsSection.vue` |
| `mt-4` | 上方 margin 1rem | `SkillsSection.vue` |
| `mt-8` | 上方 margin 2rem | `ProjectDetailMeta.vue` |
| `mt-auto` | margin-top: auto（推到底部）| `ProjectCard.vue` |

---

## 5. 尺寸 Sizing

### 寬度
| 語法 | 說明 | 出處 |
|------|------|------|
| `w-full` | 寬度 100% | 多處使用 |
| `w-4` | 寬度 1rem (16px) | `ProjectDetailMeta.vue` |
| `size-8` | 寬高 2rem (32px) | `ProjectsNav.vue` |

### 高度
| 語法 | 說明 | 出處 |
|------|------|------|
| `h-2` | 高度 0.5rem | `ProjectDetailHero.vue` |
| `h-4` | 高度 1rem | `ProjectDetailMeta.vue` |
| `h-10` | 高度 2.5rem | `SkillsSection.vue` |
| `h-48` | 高度 12rem | `ProjectCard.vue` |
| `min-h-screen` | 最小高度 100vh | `ProjectDetailView.vue` |

### Aspect Ratio
| 語法 | 說明 | 出處 |
|------|------|------|
| `aspect-video` | 16:9 比例 | `ProjectDetailShowcase.vue` |

---

## 6. 文字 Typography

### 字體大小
| 語法 | 說明 | 出處 |
|------|------|------|
| `text-xs` | 0.75rem (12px) | `ProjectsFilters.vue`, `ProjectDetailMeta.vue` |
| `text-sm` | 0.875rem (14px) | `ProjectsNav.vue`, `ProjectCard.vue` |
| `text-lg` | 1.125rem (18px) | `ProjectCard.vue`, `SkillsSection.vue` |
| `text-xl` | 1.25rem (20px) | `SkillsSection.vue` |
| `text-2xl` | 1.5rem (24px) | `ProjectDetailContent.vue` |
| `text-3xl` | 1.875rem (30px) | `FeaturedProjects.vue`, `SkillsSection.vue` |
| `text-4xl` | 2.25rem (36px) | `HeroSection.vue`, `ProjectsHero.vue` |
| `text-5xl` | 3rem (48px) | `ProjectDetailHero.vue` |
| `text-6xl` | 3.75rem (60px) | `HeroSection.vue`, `ProjectDetailHero.vue` |
| `text-[10px]` | 任意值 10px | `ProjectCard.vue` |
| `text-[20px]` | 任意值 20px | `ProjectDetailHero.vue` |

### 字體粗細
| 語法 | 說明 | 出處 |
|------|------|------|
| `font-medium` | font-weight: 500 | `ProjectsFilters.vue`, `ProjectCard.vue` |
| `font-semibold` | font-weight: 600 | `HeroSection.vue`, `SkillsSection.vue` |
| `font-bold` | font-weight: 700 | `ProjectCard.vue`, `FeaturedProjects.vue` |
| `font-extrabold` | font-weight: 800 | `HeroSection.vue` |
| `font-black` | font-weight: 900 | `ProjectsHero.vue` |

### 文字樣式
| 語法 | 說明 | 出處 |
|------|------|------|
| `uppercase` | 大寫 | `ProjectsFilters.vue`, `ProjectDetailMeta.vue` |
| `tracking-tight` | 較緊的字距 | `HeroSection.vue`, `ProjectsNav.vue` |
| `tracking-wider` | 較寬的字距 | `ProjectCard.vue` |
| `tracking-widest` | 最寬的字距 | `ProjectsFilters.vue` |
| `leading-6` | line-height: 1.5rem | `HeroSection.vue` |
| `leading-8` | line-height: 2rem | `HeroSection.vue` |
| `leading-relaxed` | line-height: 1.625 | `ProjectCard.vue`, `ProjectDetailHero.vue` |
| `leading-[1.1]` | line-height: 1.1 | `ProjectDetailHero.vue` |
| `text-center` | 文字置中 | `HeroSection.vue`, `ProjectDetailHero.vue` |
| `text-left` | 文字靠左 | `ProjectsFilters.vue` |
| `text-right` | 文字靠右 | `ProjectDetailPager.vue` |
| `line-clamp-2` | 限制 2 行（截斷）| `ProjectCard.vue` |

---

## 7. 顏色與背景 Colors

### 文字顏色（自訂 CSS 變數）
| 語法 | 說明 | 出處 |
|------|------|------|
| `text-main` | 主要文字色 | `HeroSection.vue`, `SkillsSection.vue` |
| `text-muted` | 次要文字色 | `FeaturedProjects.vue`, `ProjectsFilters.vue` |
| `text-primary` | 主題色 | `HeroSection.vue`, `ProjectsFilters.vue` |
| `text-primary-dark` | 深色主題色 | `ProjectsFilters.vue` |
| `text-surface` | 表面色（淺色文字）| `HeroSection.vue` |
| `text-white` | 白色 | `ProjectsFilters.vue`, `ProjectsNav.vue` |
| `text-slate-400` | slate 色系 | `ProjectsNav.vue` |
| `text-slate-500` | slate 色系 | `ProjectsFooter.vue` |

### 背景顏色
| 語法 | 說明 | 出處 |
|------|------|------|
| `bg-background` | 背景色 | `SkillsSection.vue`, `ProjectsFilters.vue` |
| `bg-surface` | 表面色 | `SkillsSection.vue`, `ProjectsFilters.vue` |
| `bg-primary` | 主題色背景 | `HeroSection.vue`, `ProjectsFilters.vue` |
| `bg-primary/10` | 主題色 10% 透明度 | `SkillsSection.vue`, `ProjectDetailHero.vue` |
| `bg-primary/20` | 主題色 20% 透明度 | `ProjectsFilters.vue` |
| `bg-surface/90` | 表面色 90% 透明度 | `ProjectCard.vue` |
| `bg-slate-950` | 深色背景 | `ProjectsNav.vue`, `ProjectsFooter.vue` |
| `bg-slate-950/80` | 深色背景 80% 透明度 | `ProjectsNav.vue` |
| `bg-black/60` | 黑色 60% 透明度 | `ProjectCard.vue` |

### 漸層
| 語法 | 說明 | 出處 |
|------|------|------|
| `bg-gradient-to-t` | 由下往上漸層 | `ProjectCard.vue` |
| `bg-gradient-to-r` | 由左往右漸層 | `HeroSection.vue` |
| `bg-gradient-to-br` | 由左上往右下 | `ProjectDetailShowcase.vue` |
| `from-primary/10` | 漸層起始色 | `HeroSection.vue`, `ProjectDetailShowcase.vue` |
| `to-primary/5` | 漸層結束色 | `HeroSection.vue` |
| `from-black/60` | 黑色起始 | `ProjectCard.vue` |
| `to-transparent` | 透明結束 | `ProjectCard.vue` |

---

## 8. 邊框 Borders

| 語法 | 說明 | 出處 |
|------|------|------|
| `border` | 預設邊框 1px | `ProjectsFilters.vue`, `ProjectCard.vue` |
| `border-t` | 上方邊框 | `ProjectsFilters.vue`, `ProjectDetailPager.vue` |
| `border-b` | 下方邊框 | `ProjectsNav.vue` |
| `border-border` | 邊框色（自訂變數）| 多處使用 |
| `border-primary` | 主題色邊框 | `ProjectsFilters.vue` |
| `border-primary/50` | 主題色 50% 透明邊框 | `ProjectCard.vue` |
| `border-slate-800` | slate 色邊框 | `ProjectsNav.vue` |
| `rounded` | 小圓角 4px | `ProjectDetailMeta.vue` |
| `rounded-lg` | 中圓角 8px | `HeroSection.vue`, `ProjectsFilters.vue` |
| `rounded-xl` | 大圓角 12px | `ProjectCard.vue` |
| `rounded-2xl` | 更大圓角 16px | `SkillsSection.vue`, `ProjectsHero.vue` |
| `rounded-full` | 完全圓形 | `ProjectsFilters.vue`, `ProjectDetailHero.vue` |
| `ring-1` | 1px ring | `SkillsSection.vue` |
| `ring-border/60` | ring 顏色 | `SkillsSection.vue` |
| `ring-2` | 2px ring | `ProjectsHero.vue` |
| `ring-primary` | 主題色 ring | `ProjectsHero.vue` |

---

## 9. 陰影 Shadows

| 語法 | 說明 | 出處 |
|------|------|------|
| `shadow-sm` | 小陰影 | `SkillsSection.vue`, `ProjectsHero.vue` |
| `shadow-lg` | 大陰影 | `ProjectDetailHero.vue`, `ProjectsFilters.vue` |
| `shadow-xl` | 更大陰影 | `ProjectDetailShowcase.vue` |
| `shadow-primary/20` | 主題色陰影 20% | `ProjectsFilters.vue`, `ProjectDetailHero.vue` |

---

## 10. 動畫效果 Transitions

| 語法 | 說明 | 出處 |
|------|------|------|
| `transition-all` | 所有屬性過渡 | `ProjectsFilters.vue`, `ProjectCard.vue` |
| `transition-colors` | 顏色過渡 | `HeroSection.vue`, `SkillsSection.vue` |
| `transition-transform` | transform 過渡 | `HeroSection.vue` |
| `duration-500` | 過渡時間 500ms | `ProjectCard.vue` |

### Transform
| 語法 | 說明 | 出處 |
|------|------|------|
| `transform-gpu` | GPU 加速 | `HeroSection.vue` |
| `group-hover:translate-x-1` | hover 時右移 | `HeroSection.vue` |
| `group-hover:scale-105` | hover 時放大 105% | `ProjectCard.vue` |

---

## 11. 響應式設計 Responsive

### 斷點前綴
| 前綴 | 最小寬度 | 說明 |
|------|----------|------|
| `sm:` | 640px | 小螢幕 |
| `md:` | 768px | 中等螢幕 |
| `lg:` | 1024px | 大螢幕 |
| `xl:` | 1280px | 超大螢幕 |

### 使用範例
| 語法 | 說明 | 出處 |
|------|------|------|
| `sm:text-5xl` | 小螢幕以上 text-5xl | `ProjectDetailHero.vue` |
| `sm:text-6xl` | 小螢幕以上 text-6xl | `HeroSection.vue` |
| `sm:flex-row` | 小螢幕以上水平排列 | `ProjectDetailHero.vue` |
| `md:grid-cols-2` | 中螢幕 2 欄 | `ProjectsGrid.vue` |
| `md:text-5xl` | 中螢幕 text-5xl | `ProjectsHero.vue` |
| `md:hidden` | 中螢幕以上隱藏 | `ProjectsFilters.vue` |
| `md:flex` | 中螢幕以上顯示 flex | `ProjectsNav.vue` |
| `lg:text-6xl` | 大螢幕 text-6xl | `ProjectDetailHero.vue` |
| `lg:grid-cols-3` | 大螢幕 3 欄 | `ProjectsGrid.vue` |
| `lg:px-8` | 大螢幕 px-8 | `HeroSection.vue` |
| `lg:pt-24` | 大螢幕 pt-24 | `ProjectDetailHero.vue` |
| `xl:flex-row` | 超大螢幕水平排列 | `ProjectsFilters.vue` |
| `xl:flex-col` | 超大螢幕垂直排列 | `ProjectsFilters.vue` |
| `xl:gap-12` | 超大螢幕 gap-12 | `ProjectsFilters.vue` |

---

## 12. 互動狀態 States

### Hover
| 語法 | 說明 | 出處 |
|------|------|------|
| `hover:text-main` | hover 時文字變色 | `SkillsSection.vue`, `ProjectsFilters.vue` |
| `hover:text-white` | hover 時白色 | `ProjectsNav.vue`, `ProjectsFilters.vue` |
| `hover:text-primary` | hover 時主題色 | `HeroSection.vue`, `ProjectDetailPager.vue` |
| `hover:text-primary-dark` | hover 時深主題色 | `ProjectsFilters.vue` |
| `hover:bg-primary` | hover 時主題背景 | `ProjectsFilters.vue` |
| `hover:bg-primary/90` | hover 時 90% 主題背景 | `HeroSection.vue` |
| `hover:bg-background` | hover 時背景色 | `ProjectsFilters.vue`, `ProjectDetailHero.vue` |
| `hover:border-primary` | hover 時主題邊框 | `ProjectDetailPager.vue` |
| `hover:border-primary/50` | hover 時半透明邊框 | `ProjectCard.vue` |
| `hover:shadow-lg` | hover 時大陰影 | `ProjectCard.vue` |

### Group Hover
| 語法 | 說明 | 出處 |
|------|------|------|
| `group` | 定義 group 容器 | `HeroSection.vue`, `ProjectCard.vue` |
| `group-hover:text-primary` | group hover 時文字變色 | `ProjectCard.vue` |
| `group-hover:translate-x-1` | group hover 時右移 | `HeroSection.vue` |
| `group-hover:scale-105` | group hover 時放大 | `ProjectCard.vue` |

### Focus
| 語法 | 說明 | 出處 |
|------|------|------|
| `focus:outline-none` | 移除 focus outline | `ProjectsHero.vue` |
| `focus:ring-2` | focus 時 2px ring | `ProjectsHero.vue` |
| `focus:ring-primary` | focus 時主題色 ring | `ProjectsHero.vue` |
| `focus:border-transparent` | focus 時透明邊框 | `ProjectsHero.vue` |

---

## 13. 定位 Positioning

| 語法 | 說明 | 出處 |
|------|------|------|
| `relative` | 相對定位 | `ProjectCard.vue`, `HeroSection.vue` |
| `absolute` | 絕對定位 | `ProjectCard.vue`, `ProjectsHero.vue` |
| `sticky` | 黏性定位 | `ProjectsNav.vue` |
| `top-0` | top: 0 | `ProjectsNav.vue` |
| `inset-0` | top/right/bottom/left: 0 | `ProjectCard.vue` |
| `inset-y-0` | top/bottom: 0 | `ProjectsHero.vue` |
| `left-0` | left: 0 | `ProjectsHero.vue` |
| `bottom-3` | bottom: 0.75rem | `ProjectCard.vue` |
| `left-3` | left: 0.75rem | `ProjectCard.vue` |
| `z-50` | z-index: 50 | `ProjectsNav.vue` |
| `-z-10` | z-index: -10 | `HeroSection.vue` |

---

## 14. 其他特殊語法

### 模糊效果
| 語法 | 說明 | 出處 |
|------|------|------|
| `blur-3xl` | 大模糊 | `HeroSection.vue` |
| `backdrop-blur` | 背景模糊 | `ProjectCard.vue` |
| `backdrop-blur-md` | 中等背景模糊 | `ProjectsNav.vue` |

### 透明度
| 語法 | 說明 | 出處 |
|------|------|------|
| `opacity-30` | 30% 透明度 | `HeroSection.vue` |

### 空間
| 語法 | 說明 | 出處 |
|------|------|------|
| `space-y-4` | 子元素垂直間距 1rem | `SkillsSection.vue` |

### 其他
| 語法 | 說明 | 出處 |
|------|------|------|
| `object-cover` | 圖片填滿容器 | `ProjectCard.vue`, `ProjectDetailShowcase.vue` |
| `pointer-events-none` | 禁用滑鼠事件 | `ProjectsHero.vue` |
| `placeholder-muted` | placeholder 顏色 | `ProjectsHero.vue` |
| `antialiased` | 字體抗鋸齒 | `ProjectsView.vue` |
| `selection:bg-primary` | 選取背景色 | `ProjectsView.vue` |
| `selection:text-white` | 選取文字色 | `ProjectsView.vue` |

### 任意值語法 (Arbitrary Values)
| 語法 | 說明 | 出處 |
|------|------|------|
| `text-[10px]` | 任意字體大小 | `ProjectCard.vue` |
| `text-[20px]` | 任意字體大小 | `ProjectDetailHero.vue` |
| `min-w-[200px]` | 任意最小寬度 | `ProjectsFilters.vue` |
| `leading-[1.1]` | 任意 line-height | `ProjectDetailHero.vue` |
| `aspect-[1404/767]` | 任意比例 | `HeroSection.vue` |
| `w-[87.75rem]` | 任意寬度 | `HeroSection.vue` |

---

## 學習資源

- [Tailwind CSS 官方文件](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)
- [Tailwind Play](https://play.tailwindcss.com/) - 線上練習

---

> 📝 提示：本專案使用 Tailwind CSS v4，部分語法可能與舊版有差異。
