<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from "@/composables/useSeo"

const { t, locale } = useI18n()

// SEO
useSeo({
  title: '聯繫我',
  description: '與 71BK 聯繫。掃描 LINE Bot QR Code 體驗自動化互動，或透過 Email 與我討論專案合作。'
})

const email = "kiwihsu828@gmail.com"
const isCopied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email', err)
  }
}

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/71bk',
    icon: 'code',
    label: '@71bk-dev'
  },
  {
    name: 'LinkedIn',
    url: 'www.linkedin.com/in/ian-hsu-2879b12a1',
    icon: 'work',
    label: 'Professional Profile'
  }
]
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">
    
    <!-- Header -->
    <div class="flex flex-col gap-4 max-w-2xl">
      <span class="text-primary font-mono text-xs font-bold tracking-widest uppercase">
          {{ t('nav.contact') }}
      </span>
      <h1 class="text-main text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
        {{ locale === 'en' ? "Let's build something" : "讓我們打造" }}
        <span class="text-primary">{{ locale === 'en' ? "great." : "精彩的作品。" }}</span>
      </h1>
      <p class="text-muted text-lg leading-relaxed mt-4">
        {{ t('cta.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <!-- Left: Contact Methods -->
      <div class="flex flex-col gap-8">
        
        <!-- Email Card (Click to Copy) -->
        <div class="flex flex-col gap-2 group">
          <span class="text-[10px] text-muted font-mono font-bold uppercase tracking-widest pl-1">
            Email_Address
          </span>
          <button 
            @click="copyEmail"
            class="relative flex items-center justify-between p-6 rounded-xl bg-surface border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all text-left group/card"
          >
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                <span class="material-symbols-outlined text-2xl">mail</span>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-bold text-main font-mono">{{ email }}</span>
                <span class="text-xs text-muted group-hover/card:text-primary transition-colors">
                  {{ isCopied ? (locale === 'en' ? 'Copied to clipboard!' : '已複製到剪貼簿！') : (locale === 'en' ? 'Click to copy' : '點擊複製') }}
                </span>
              </div>
            </div>
            <span class="material-symbols-outlined text-muted group-hover/card:text-primary transition-colors">content_copy</span>
            
            <!-- Success Indicator -->
            <div 
              v-if="isCopied"
              class="absolute inset-0 rounded-xl border-2 border-primary bg-primary/5 z-10 pointer-events-none animate-pulse"
            ></div>
          </button>
        </div>

        <!-- Social Links -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] text-muted font-mono font-bold uppercase tracking-widest pl-1">
            Social_Profiles
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-primary/50 hover:bg-background transition-all group"
            >
              <span class="material-symbols-outlined text-muted group-hover:text-main">{{ social.icon }}</span>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-main">{{ social.name }}</span>
                <span class="text-xs text-muted font-mono">{{ social.label }}</span>
              </div>
              <span class="material-symbols-outlined text-muted ml-auto text-sm group-hover:translate-x-1 transition-transform">arrow_outward</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Right: LINE Bot Integration -->
      <div class="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <!-- Terminal Header -->
        <div class="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
          </div>
          <span class="text-[10px] font-mono text-slate-500">line-bot-integration.js</span>
          <div class="w-10"></div>
        </div>

        <!-- Content -->
        <div class="p-8 flex flex-col items-center text-center gap-6">
          <div class="relative">
            <!-- QR Code Placeholder (Replace with real image) -->
            <div class="w-48 h-48 bg-white rounded-lg p-2 flex items-center justify-center">
               <!-- Placeholder Pattern -->
               <div class="w-full h-full bg-slate-900/5 border-2 border-dashed border-slate-300 rounded flex items-col justify-center text-center p-4">
                 <img src="/QRcode.png" class="w-full h-full" />
               </div>
               <!-- Replace above div with: <img src="/line-qr.jpg" class="w-full h-full" /> -->
            </div>
            
            <!-- Scan Overlay Animation -->
            <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
               <div class="w-full h-1 bg-emerald-500/50 absolute top-0 animate-[scan_3s_ease-in-out_infinite]"></div>
            </div>
          </div>

          <div class="space-y-2">
            <h3 class="text-white font-bold text-lg">LINE Official Account</h3>
            <p class="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
              {{ t('contact.title') }}
            </p>
          </div>

          <!-- Bot Features -->
          <div class="flex gap-2 justify-center">
             <span class="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] text-emerald-400 font-mono">
               ● Webhook_Active
             </span>
             <span class="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
               v1.0.0
             </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
</style>
