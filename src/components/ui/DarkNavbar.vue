<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

const emit = defineEmits<{
  (event: "navigate", hash: string): void
}>()

const isScrolled = ref(false)

const links = [
  { href: "#about", label: "О компании" },
  { href: "#projects", label: "Проекты" },
  { href: "#tech", label: "Технологии" },
  { href: "#clients", label: "Клиенты" },
  { href: "#contacts", label: "Контакты" },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 12
}

const handleNavigate = (event: MouseEvent, hash: string) => {
  event.preventDefault()
  emit("navigate", hash)
}

onMounted(() => {
  handleScroll()
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'fixed inset-x-0 top-0 z-50 border-b bg-black/60 backdrop-blur-md transition-shadow duration-300',
      isScrolled ? 'shadow-lg shadow-black/30 border-white/5' : 'border-white/10',
    ]"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
      <a
        href="#home"
        class="text-base font-semibold uppercase tracking-[0.4em] text-white"
        @click="handleNavigate($event, '#home')"
      >
        IKB
      </a>

      <div class="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.35em] text-neutral-300 lg:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="transition hover:text-white"
          @click="handleNavigate($event, link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40 hover:bg-white/10 lg:hidden"
        aria-label="Меню"
      >
        <span class="h-0.5 w-5 bg-white"></span>
        <span class="h-0.5 w-5 bg-white"></span>
        <span class="h-0.5 w-5 bg-white"></span>
      </button>
    </div>
  </nav>
</template>