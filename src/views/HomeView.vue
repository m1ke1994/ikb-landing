<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { SplineScene } from "@/components/ui/splite"
import DarkNavbar from "@/components/ui/DarkNavbar.vue"

const heroZoom = ref(0.85)
const scrollContainer = ref<HTMLDivElement | null>(null)
const heroSection = ref<HTMLElement | null>(null)
const pointerRotation = ref({ x: 0, y: 0 })
const animationFrame = ref<number | null>(null)

const sectionAliases = {
  "#home": "home",
  "#about": "home",
  "#projects": "projects",
  "#tech": "tech",
  "#clients": "clients",
  "#contacts": "contacts",
} as const

type SectionHash = keyof typeof sectionAliases

const normalizeHash = (hash: string): SectionHash => {
  const candidate = hash.toLowerCase() as SectionHash
  if (Object.prototype.hasOwnProperty.call(sectionAliases, candidate)) {
    return candidate
  }
  return "#home"
}

const scrollToHash = (hash: string) => {
  if (typeof window === "undefined") return

  const normalized = normalizeHash(hash)
  const sectionId = sectionAliases[normalized]
  const target = document.getElementById(sectionId)

  if (target) {
    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  const { pathname, search } = window.location
  const newUrl = normalized === "#home" ? `${pathname}${search}` : `${pathname}${search}${normalized}`

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", newUrl)
  }
}

const handleNavigate = (hash: string) => {
  scrollToHash(hash)
}

const updateRotation = (next: { x: number; y: number }) => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }

  animationFrame.value = requestAnimationFrame(() => {
    pointerRotation.value = next
  })
}

const handlePointerMove = (event: PointerEvent) => {
  const section = heroSection.value
  if (!section) return

  const rect = section.getBoundingClientRect()
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
    return
  }

  const offsetX = (event.clientX - rect.left) / rect.width - 0.5
  const offsetY = (event.clientY - rect.top) / rect.height - 0.5

  updateRotation({
    x: Math.max(Math.min(offsetY * 18, 18), -18),
    y: Math.max(Math.min(offsetX * 18, 18), -18),
  })
}

const handlePointerOut = (event: PointerEvent) => {
  if (event.relatedTarget === null) {
    updateRotation({ x: 0, y: 0 })
  }
}

const handleWheel = (event: WheelEvent) => {
  const container = scrollContainer.value
  if (!container) return

  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    event.preventDefault()
    container.scrollBy({ left: event.deltaY, behavior: "smooth" })
  }
}

const handleHashChange = () => {
  if (typeof window === "undefined") return
  scrollToHash(window.location.hash || "#home")
}

const updateZoom = () => {
  const width = window.innerWidth

  if (width >= 1536) {
    heroZoom.value = 0.65
    return
  }

  if (width >= 1280) {
    heroZoom.value = 0.7
    return
  }

  if (width >= 1024) {
    heroZoom.value = 0.8
    return
  }

  heroZoom.value = 0.95
}

onMounted(() => {
  updateZoom()
  window.addEventListener("resize", updateZoom)
  window.addEventListener("hashchange", handleHashChange)
  window.addEventListener("pointermove", handlePointerMove, { passive: true })
  window.addEventListener("pointerout", handlePointerOut, { passive: true })

  const container = scrollContainer.value
  if (container) {
    container.addEventListener("wheel", handleWheel, { passive: false })
  }

  requestAnimationFrame(() => {
    handleHashChange()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateZoom)
  window.removeEventListener("hashchange", handleHashChange)
  window.removeEventListener("pointermove", handlePointerMove)
  window.removeEventListener("pointerout", handlePointerOut)

  const container = scrollContainer.value
  if (container) {
    container.removeEventListener("wheel", handleWheel)
  }

  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<template>
  <div class="relative flex h-screen flex-col overflow-hidden bg-gradient-to-br from-black via-[#050713] to-black text-neutral-100">
    <DarkNavbar @navigate="handleNavigate" />

    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_55%)]" />
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_60%)]" />

    <main class="relative flex flex-1 overflow-hidden pt-24">
      <div
        ref="scrollContainer"
        class="flex h-[calc(100vh-6rem)] w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
      >
        <section
          id="home"
          ref="heroSection"
          class="relative box-border h-full min-w-full flex-shrink-0 snap-start overflow-hidden"
          @pointermove="handlePointerMove"
        >
          <div
            class="absolute inset-0 transition-transform duration-200 ease-out"
            :style="{
              transform: `perspective(1200px) rotateX(${pointerRotation.x}deg) rotateY(${pointerRotation.y}deg)`,
            }"
          >
            <SplineScene
              class-name="h-full w-full"
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              :zoom="heroZoom"
              :pointer-rotation="pointerRotation"
              target-name="Head"
              :rotation-multiplier-x="3.2"
              :rotation-multiplier-y="2.6"
              :body-rotation-multiplier-x="1.4"
              :body-rotation-multiplier-y="2.1"
            />
          </div>
          <span id="about" class="absolute top-24 left-0 h-0 w-0" aria-hidden="true"></span>
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/70" />
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.12),transparent_65%)]" />
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_65%)]" />
          <div class="relative z-10 flex h-full w-full items-end px-6 pb-20 pt-32 lg:px-12 lg:pb-24">
            <div
              class="group fade-up relative w-full max-w-xl overflow-hidden rounded-[34px] bg-gradient-to-br from-[#0a0f2b]/90 via-[#152241]/70 to-[#02030f]/75 p-10 shadow-[0_45px_160px_-70px_rgba(34,211,238,0.75)] backdrop-blur-2xl lg:w-1/2 lg:max-w-none"
            >
              <div class="pointer-events-none absolute inset-0">
                <div
                  class="absolute -top-28 right-8 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.55),transparent)] opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-95"
                />
                <div
                  class="absolute -bottom-28 left-4 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.45),transparent)] opacity-70 transition duration-500 group-hover:scale-110 group-hover:opacity-95"
                />
                <div
                  class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_70%)] opacity-80 transition duration-500 group-hover:opacity-100"
                />
              </div>
              <div class="relative space-y-6">
                <div class="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.55em] text-cyan-100/80">
                  <span
                    class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[0.55rem] tracking-[0.45em] text-cyan-50/90 shadow-[0_0_24px_rgba(14,165,233,0.5)] backdrop-blur-sm transition duration-300 group-hover:bg-white/16"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                    IKB
                  </span>
                  <span class="h-px flex-1 bg-gradient-to-r from-cyan-200/70 via-fuchsia-400/50 to-transparent transition-all duration-500 group-hover:from-cyan-100/80 group-hover:via-fuchsia-300/60" />
                  Инновационное конструкторское бюро
                </div>
                <h1 class="fade-up fade-up-delay-1 text-3xl font-semibold leading-tight text-white sm:text-[2.7rem] sm:leading-[1.05]">
                  Интеллектуальные микроконтроллерные системы, которые объединяют инженерию и дизайн
                </h1>
                <p class="fade-up fade-up-delay-2 text-sm text-neutral-200 md:text-base md:text-neutral-100/80">
                  Полный цикл — от R&D и прототипирования до промышленного внедрения. Создаём оборудование, которое чувствует среду, общается с данными и работает безупречно.
                </p>
                <div class="fade-up fade-up-delay-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400/90 via-sky-500/80 to-indigo-500/75 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_10px_30px_-12px_rgba(56,189,248,0.9)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_18px_40px_-16px_rgba(79,70,229,0.55)]"
                    @click="handleNavigate('#projects')"
                  >
                    Наши проекты
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-100 transition duration-300 hover:bg-white/16 hover:text-white"
                    @click="handleNavigate('#contacts')"
                  >
                    Связаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          class="box-border flex h-full min-w-full flex-shrink-0 snap-start items-center justify-center px-6 pb-12 pt-24 scroll-mt-24 lg:px-12 lg:pb-16 lg:pt-24"
        >
          <div class="w-full max-w-5xl space-y-8">
            <header class="space-y-3">
              <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Проекты</h2>
              <p class="max-w-3xl text-sm text-neutral-400 md:text-base">
                Мы создаём прикладные решения для отраслей, где надёжность и защищённость важнее всего.
              </p>
            </header>
            <ul class="grid gap-6 text-sm text-neutral-300 md:grid-cols-3 md:text-base">
              <li class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                Контроллеры для высокоточных роботизированных линий и распределённых систем управления.
              </li>
              <li class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                Защищённые телеметрические узлы для инфраструктур и критически важных объектов.
              </li>
              <li class="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                Демонстрационные AR/VR-комплексы для обучения и презентации цифровых двойников.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="tech"
          class="box-border flex h-full min-w-full flex-shrink-0 snap-start items-center justify-center px-6 pb-12 pt-24 scroll-mt-24 lg:px-12 lg:pb-16 lg:pt-24"
        >
          <div class="w-full max-w-5xl space-y-6">
            <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Технологии</h2>
            <p class="max-w-3xl text-sm text-neutral-300 md:text-base">
              Комбинируем аппаратные платформы собственного дизайна, интеллектуальные прошивки и вычисления на GPU,
              чтобы добиться управляемой точности, быстрого развёртывания и прозрачного мониторинга.
            </p>
          </div>
        </section>

        <section
          id="clients"
          class="box-border flex h-full min-w-full flex-shrink-0 snap-start items-center justify-center px-6 pb-12 pt-24 scroll-mt-24 lg:px-12 lg:pb-16 lg:pt-24"
        >
          <div class="w-full max-w-5xl space-y-6">
            <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Клиенты</h2>
            <p class="max-w-3xl text-sm text-neutral-300 md:text-base">
              Партнёримся с промышленными предприятиями, девелоперами и культурными институциями,
              помогая им презентовать сложные инженерные идеи в интерактивном формате.
            </p>
          </div>
        </section>

        <section
          id="contacts"
          class="box-border flex h-full min-w-full flex-shrink-0 snap-start items-center justify-center px-6 pb-12 pt-24 scroll-mt-24 lg:px-12 lg:pb-16 lg:pt-24"
        >
          <div class="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
            <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Контакты</h2>
            <p class="mt-4 max-w-2xl text-sm text-neutral-300 md:text-base">
              Расскажите нам о своей задаче — команда IKB предложит архитектуру устройства, сроки и формат сотрудничества.
            </p>
            <a
              href="mailto:info@ikb.team"
              class="mt-6 inline-flex items-center rounded-full border border-cyan-400/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-cyan-400/70 hover:bg-white/10"
            >
              Написать нам
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  opacity: 0;
  animation: fade-up 0.8s ease-out forwards;
}

.fade-up-delay-1 {
  animation-delay: 0.1s;
}

.fade-up-delay-2 {
  animation-delay: 0.2s;
}

.fade-up-delay-3 {
  animation-delay: 0.3s;
}
</style>
