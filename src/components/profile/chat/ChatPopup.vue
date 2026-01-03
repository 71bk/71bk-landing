<script setup>
import { nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import chatApi from "@/api/chat";
import publicAnalytics from "@/api/publicAnalytics";

const { locale, t } = useI18n();

const isOpen = ref(false);
const isLoading = ref(false);
const messageInput = ref("");
const messages = ref([
  {
    id: 1,
    role: "assistant",
    text: t("chat.intro"),
  },
]);

const messagesRef = ref(null);

const userAvatarUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB_JdBM8lISLC5QhCk3szCM9BVDTpPA-btEZ1tKXYBtVTdVKQCEXTjkBcC1BGRsZGzOiOzEBPC9DNMjqStzBXAv30kxL3Q6S1igY0u6HyASLa7nz0DgU4BTvAkLa2aDzv_jbdwlxhkhs2v0jQcnqXkQOOPExuyB4u5Yd8CUweKqHYdAcW0c-tJJhKU2cmD7_Ur_YzBFsYg5CRzSX8Q-LDJJ7NSadWQz2N6ItbyP35Vuk696mklypDq_E1XNbsQMjSP8BjabiOFGQvnD";

let messageId = 1;
const nextMessageId = () => {
  messageId += 1;
  return messageId;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (!messagesRef.value) return;
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  });
};

watch(
  () => messages.value.length,
  () => {
    if (isOpen.value) scrollToBottom();
  }
);

watch(isOpen, (open) => {
  if (open) scrollToBottom();
});

const getProjectCover = (project) =>
  project?.coverImage || project?.coverImageUrl || project?.cover_image_url || "";

const getTechLabel = (tech) => {
  if (!tech) return "";
  if (typeof tech === "string") return tech;
  return tech.name || tech.label || "";
};

const getLinkLabel = (link) => {
  if (!link) return t("chat.linkLabel");
  return link.label || link.type || t("chat.linkLabel");
};

const pushMessage = (message) => {
  messages.value.push({ id: nextMessageId(), ...message });
};

const buildAssistantMessage = (data) => {
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const suggestedFilters = data?.suggestedFilters ?? null;
  const answer = data?.answer ?? null;

  // 決定顯示的文字
  let text;
  if (projects.length) {
    text = t("chat.resultsIntro");
  } else if (answer) {
    // 根據 answer 類型產生回應文字
    if (answer.type === "skills" && answer.payload?.skills?.length) {
      const skills = answer.payload.skills;
      text = t("chat.skillsAnswer", { skills: skills.join(", ") });
    } else {
      text = t("chat.noResults");
    }
  } else {
    text = t("chat.noResults");
  }

  return {
    role: "assistant",
    text,
    projects,
    suggestedFilters,
    answer,
  };
};

const handleSubmit = async () => {
  const query = messageInput.value.trim();
  if (!query || isLoading.value) return;

  pushMessage({ role: "user", text: query });
  messageInput.value = "";
  isLoading.value = true;
  void publicAnalytics
    .trackEvent({
      eventType: "CHAT_QUERY",
      query,
      path: window.location.pathname + window.location.search,
    })
    .catch(() => {});

  try {
    const resolvedLocale =
      typeof locale.value === "string" && locale.value.trim()
        ? locale.value
        : "zh-TW";
    const data = await chatApi.sendChatMessage({
      query,
      locale: resolvedLocale,
    });
    pushMessage(buildAssistantMessage(data));
  } catch (error) {
    pushMessage({
      role: "assistant",
      text: t("chat.error"),
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="chat-popup fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans isolate"
    style="--color-primary: 72 80 229; --color-primary-dark: 67 56 202;"
  >
    <div
      v-if="isOpen"
      id="chat-popup-panel"
      class="w-[360px] max-h-[550px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden chat-slide-up origin-bottom-right"
    >
      <div class="bg-primary p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div class="flex items-center gap-3 relative z-10">
          <div
            class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm border border-white/10 shadow-inner"
          >
            <span class="material-symbols-outlined text-[20px]">smart_toy</span>
          </div>
          <div>
            <h3 class="text-white font-bold text-base leading-tight tracking-tight">{{ t("chat.title") }}</h3>
            <p class="text-indigo-100 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              {{ t("chat.status") }}
            </p>
          </div>
        </div>
        <button
          aria-label="Close chat"
          class="relative z-10 text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
          type="button"
          @click="isOpen = false"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
      <div
        ref="messagesRef"
        class="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50/80 scrollbar-custom h-[380px]"
      >
        <div class="flex justify-center my-2">
          <span
            class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest bg-gray-100/80 px-3 py-1 rounded-full"
          >
            {{ t("chat.today") }}
          </span>
        </div>

        <div v-for="message in messages" :key="message.id" class="space-y-3">
          <div
            class="flex gap-3 items-end group"
            :class="message.role === 'user' ? 'justify-end' : ''"
          >
            <template v-if="message.role === 'assistant'">
              <div
                class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm"
              >
                <span class="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
              </div>
              <div class="flex flex-col gap-1 max-w-[85%]">
                <span class="text-[10px] text-gray-400 font-medium ml-1">{{ t("chat.assistantName") }}</span>
                <div
                  v-if="message.text"
                  class="bg-white text-gray-700 p-3.5 rounded-[20px] rounded-bl-none border border-gray-100 shadow-sm text-sm leading-relaxed"
                >
                  <p>{{ message.text }}</p>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="flex flex-col gap-1 items-end max-w-[85%]">
                <span class="text-[10px] text-gray-400 font-medium mr-1">{{ t("chat.userLabel") }}</span>
                <div
                  class="bg-primary text-white p-3.5 rounded-[20px] rounded-br-none shadow-md shadow-indigo-500/10 text-sm leading-relaxed"
                >
                  <p>{{ message.text }}</p>
                </div>
              </div>
              <div
                class="w-8 h-8 rounded-full bg-gray-200 shrink-0 border-2 border-white shadow-sm bg-cover bg-center"
                data-alt="User avatar placeholder"
                :style="{ backgroundImage: `url('${userAvatarUrl}')` }"
              ></div>
            </template>
          </div>

          <div v-if="message.role === 'assistant' && message.projects?.length" class="pl-11 pr-4 space-y-3">
            <div
              v-for="project in message.projects"
              :key="project.id || project.slug || project.title"
              class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                class="h-28 w-full bg-gray-100 rounded-xl mb-3 bg-cover bg-center relative overflow-hidden"
              >
                <img
                  v-if="getProjectCover(project)"
                  :src="getProjectCover(project)"
                  :alt="project.title"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div class="absolute bottom-2 left-2 flex gap-1">
                  <span class="material-symbols-outlined text-white text-[16px]">code</span>
                </div>
              </div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="font-bold text-gray-900 text-sm leading-tight">
                    {{ project.title }}
                  </h4>
                  <p v-if="project.matchReason" class="text-[10px] text-gray-400 font-medium mt-0.5">
                    {{ project.matchReason }}
                  </p>
                </div>
                <div
                  class="h-6 w-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"
                >
                  <span class="material-symbols-outlined text-[14px]">arrow_outward</span>
                </div>
              </div>
              <p class="text-xs text-gray-500 mb-3 leading-snug line-clamp-2">
                {{ project.summary }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in project.techs || []"
                  :key="getTechLabel(tech)"
                  class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md border border-slate-200"
                >
                  {{ getTechLabel(tech) }}
                </span>
              </div>
              <div v-if="project.links?.length" class="flex flex-wrap gap-2 mt-3">
                <a
                  v-for="link in project.links"
                  :key="link.id || link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  class="text-[10px] font-semibold text-primary hover:text-primary-dark"
                >
                  {{ getLinkLabel(link) }}
                </a>
              </div>
            </div>
          </div>

          <div
            v-if="
              message.role === 'assistant' &&
              (message.suggestedFilters?.tech?.length ||
                message.suggestedFilters?.category?.length)
            "
            class="pl-11 pr-4"
          >
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in message.suggestedFilters.tech || []"
                :key="`tech-${tech}`"
                class="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-semibold rounded-full border border-indigo-100"
              >
                {{ t("chat.techLabel") }}: {{ tech }}
              </span>
              <span
                v-for="category in message.suggestedFilters.category || []"
                :key="`cat-${category}`"
                class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold rounded-full border border-emerald-100"
              >
                {{ t("chat.categoryLabel") }}: {{ category }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="flex gap-3 items-end">
          <div
            class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm"
          >
            <span class="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
          </div>
          <div
            class="bg-white p-3.5 rounded-[20px] rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-1 h-[46px] w-fit"
          >
            <span class="sr-only">{{ t("chat.typing") }}</span>
            <div class="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
            <div class="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.15s]"></div>
            <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]"></div>
          </div>
        </div>
      </div>
      <div class="p-3 bg-white border-t border-gray-100 shrink-0 relative z-20">
        <form class="flex items-center gap-2 relative group" @submit.prevent="handleSubmit">
          <input
            v-model="messageInput"
            class="w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 text-sm font-normal rounded-full py-3.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white border border-gray-200 focus:border-primary/20 transition-all shadow-sm"
            :placeholder="t('chat.placeholder')"
            type="text"
            :disabled="isLoading"
          />
          <button
            class="absolute right-2 top-2 h-9 w-9 bg-primary hover:bg-primary-dark text-white rounded-full shadow-md shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            :disabled="isLoading || !messageInput.trim()"
          >
            <span class="material-symbols-outlined text-[18px] translate-x-px translate-y-px">send</span>
          </button>
        </form>
        <div class="text-center mt-2">
          <p class="text-[10px] text-gray-400">{{ t("chat.disclaimer") }}</p>
        </div>
      </div>
    </div>
    <button
      class="h-14 w-14 bg-primary text-white rounded-full shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:bg-primary-dark transition-all duration-300 active:scale-90 flex items-center justify-center group relative z-10 ring-4 ring-white dark:ring-slate-900"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="chat-popup-panel"
      @click="isOpen = !isOpen"
    >
      <span class="material-symbols-outlined text-[26px]">chat_bubble</span>
    </button>
  </div>
</template>

<style scoped>
.chat-slide-up {
  animation: chatSlideUp 0.3s ease-out forwards;
}

@keyframes chatSlideUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.scrollbar-custom::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.scrollbar-custom:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

.chat-popup .material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>
