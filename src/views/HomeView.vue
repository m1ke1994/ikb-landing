<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { SplineScene } from "@/components/ui/splite"
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
  <div class="home-view relative flex flex-col overflow-hidden bg-gradient-to-r from-white via-neutral-200 to-black text-neutral-900">
    <DarkNavbar />

    <main id="home" class="relative flex flex-1 h-full min-h-0 flex-col overflow-hidden pt-24">
      <div class="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div class="absolute inset-0 bg-gradient-to-r from-white via-neutral-200 to-black" />
        <div class="absolute inset-y-0 right-[-15%] w-[135%] md:right-[-10%] md:w-[115%] lg:right-[-6%] lg:w-[78%]">
          <SplineScene
            class-name="h-full w-full"
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            :zoom="heroZoom"
          />
        </div>
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
      </div>

      <section
        id="about"
        class="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 pb-20 pt-14 text-left lg:mx-0 lg:w-[42%] lg:px-12 lg:pb-24 lg:pt-16"
      >
        <header class="space-y-4">
          <span class="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
            Интеллектуальные решения
          </span>
          <h1 class="space-y-3">
            <span class="block bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-[3.25rem]">
              Инновационное
            </span>
            <span class="block text-4xl font-bold leading-tight text-neutral-900 md:text-5xl lg:text-[3.25rem]">
              Конструкторское бюро
            </span>
          </h1>
        </header>

        <p class="text-base leading-relaxed text-neutral-700 md:text-lg">
          Мы создаём интеллектуальные системы управления и микроконтроллерные устройства, объединяя надёжность промышленной электроники и гибкость современных алгоритмов. От идеи до готового изделия — полный цикл инженерии и программирования.
        </p>

        <p class="text-sm text-neutral-600 md:text-base">
          Наши решения работают там, где важны точность, защита и автономность: в промышленности, энергетике и научных проектах.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            class="inline-flex items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
          >
            Связаться с нами
          </a>
          <div class="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
            <span class="h-10 w-px bg-neutral-300" />
            <span>Надёжность. Гибкость. Контроль.</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
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
