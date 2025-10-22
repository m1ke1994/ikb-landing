<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import DarkNavbar from "@/components/ui/DarkNavbar.vue"

const heroZoom = ref(0.85)

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
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateZoom)
})
</script>

<template>
  <div class="home-view relative flex flex-col overflow-hidden bg-gradient-to-br from-black via-[#050713] to-black text-neutral-100">
    <DarkNavbar />
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,204,255,0.1),transparent_60%)]" />

    <main
      id="home"
      class="relative flex flex-1 h-full min-h-0 flex-col overflow-y-auto pt-24 lg:flex-row lg:overflow-hidden"
    >
      <div
        class="relative z-20 flex min-h-0 w-full flex-col justify-center gap-10 px-6 py-12 text-left lg:max-w-xl lg:overflow-y-auto lg:px-12 lg:py-20"
      >
        <div class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div class="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <section
          id="about"
          class="relative space-y-6 text-left text-neutral-200"
        >
          <h1 class="fade-up text-4xl font-bold leading-tight text-white md:text-5xl">
            Инновационное Конструкторское Бюро
          </h1>
          <p class="fade-up fade-up-delay-1 text-sm leading-relaxed text-neutral-300 md:text-base">
            Мы создаём микроконтроллерные устройства нового поколения — надёжные, безопасные и интеллектуальные.
            Объединяя инженеров, программистов и конструкторов, мы превращаем идеи в работающие системы.
          </p>
          <p class="fade-up fade-up-delay-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/90">
            Инновационность — Конфиденциальность — Безопасность
          </p>
        </section>

        <div class="hidden h-px w-24 bg-white/10 lg:block" />

        <section id="projects" class="space-y-3 text-sm text-neutral-300 md:text-base">
          <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Проекты</h2>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300/70" />
              Индивидуальные контроллеры для специализированных производственных линий и роботизированных комплексов.
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300/70" />
              Защищённые устройства телеметрии для распределённых инфраструктур и критических систем.
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300/70" />
              AR/VR-стенды для демонстрации цифровых двойников и обучения технического персонала.
            </li>
          </ul>
        </section>

        <section id="tech" class="space-y-3 text-sm text-neutral-300 md:text-base">
          <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Технологии</h2>
          <p>
            Мы сочетаем физические симуляции, генеративные пайплайны и вычисления на GPU,
            чтобы передать характер материалов и движение света в интерактивных интерфейсах и промышленных панелях.
          </p>
        </section>

        <section id="clients" class="space-y-3 text-sm text-neutral-300 md:text-base">
          <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Клиенты</h2>
          <p>
            Партнёримся с промышленными компаниями, девелоперами и культурными институциями, помогая им презентовать
            сложные идеи через кинетические шоурумы и mixed reality инсталляции.
          </p>
        </section>

        <a
          id="contacts"
          href="#"
          class="inline-flex w-fit items-center gap-3 rounded-full border border-cyan-400/40 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-cyan-400/60 hover:bg-white/10"
        >
          Связаться с нами
        </a>
      </div>

      <div class="relative flex flex-1 overflow-hidden">
        <SplineScene
          class-name="h-full w-full"
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          :zoom="heroZoom"
        />
        <Spotlight class="pointer-events-none left-6 top-20 z-30 lg:-top-10 lg:left-1/3" fill="#ffffff" />
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

.home-view {
  min-height: 100vh;
  height: 100vh;
}

@supports (height: 100dvh) {
  .home-view {
    min-height: 100dvh;
    height: 100dvh;
  }
}
</style>
