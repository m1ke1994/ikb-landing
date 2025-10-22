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
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-black text-neutral-100">
    <DarkNavbar />

    <main id="home" class="relative flex flex-1 flex-col pt-24 lg:flex-row">
      <div
        class="relative z-20 flex w-full flex-col justify-center gap-6 px-6 py-12 text-left lg:max-w-xl lg:px-12 lg:py-20"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
          РРЅРЅРѕРІР°С†РёРѕРЅРЅР°СЏ РљРѕРјРїР°РЅРёР№РЅР°СЏ Р‘Р°Р·Р°
        </p>
        <h1 class="text-4xl font-bold leading-tight text-white md:text-5xl">
          РЎРѕР·РґР°РµРј С†РёС„СЂРѕРІС‹Рµ СЂРµС€РµРЅРёСЏ РґР»СЏ РІС‹СЃРѕРєРѕС‚РµС…РЅРѕР»РѕРіРёС‡РЅС‹С… РїСЂРµРґРїСЂРёСЏС‚РёР№
        </h1>
        <p class="text-sm leading-relaxed text-neutral-300 md:text-base" id="about">
          РњС‹ РѕР±СЉРµРґРёРЅСЏРµРј СЌРєСЃРїРµСЂС‚РЅС‹Рµ Р·РЅР°РЅРёСЏ, РїСЂРѕРјС‹С€Р»РµРЅРЅС‹Р№ РґРёР·Р°Р№РЅ Рё РёРЅС‚РµСЂР°РєС‚РёРІРЅС‹Рµ 3D-С‚РµС…РЅРѕР»РѕРіРёРё, С‡С‚РѕР±С‹
          РїРѕРјРѕРіР°С‚СЊ РєРѕРјРїР°РЅРёСЏРј СѓСЃРєРѕСЂСЏС‚СЊ СЂР°Р·СЂР°Р±РѕС‚РєСѓ, РІРѕРІР»РµРєР°С‚СЊ РєР»РёРµРЅС‚РѕРІ Рё СЂР°СЃС€РёСЂСЏС‚СЊ СЃРѕР±СЃС‚РІРµРЅРЅСѓСЋ СЌРєРѕСЃРёСЃС‚РµРјСѓ
          РїСЂРѕРґСѓРєС‚РѕРІ. РќР°С€Рё СЂРµС€РµРЅРёСЏ Р°РґР°РїС‚РёСЂСѓСЋС‚СЃСЏ РїРѕРґ Р»СЋР±С‹Рµ РјР°СЃС€С‚Р°Р±С‹ Рё РѕС‚СЂР°СЃР»Рё.
        </p>
        <div class="hidden h-px w-24 bg-white/10 lg:block" />
        <ul class="space-y-3 text-sm text-neutral-400 md:text-base" id="projects">
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/60" />
            РџР»Р°С‚С„РѕСЂРјР° СѓРїСЂР°РІР»РµРЅРёСЏ С†РёС„СЂРѕРІС‹РјРё РґРІРѕР№РЅРёРєР°РјРё РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/60" />
            РРЅС‚РµСЂР°РєС‚РёРІРЅС‹Рµ РїСЂРµР·РµРЅС‚Р°С†РёРё РґР»СЏ РїСЂРѕРґР°Р¶ Рё РѕР±СѓС‡РµРЅРёСЏ
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/60" />
            AR/VR-СЂРµС€РµРЅРёСЏ РґР»СЏ РїСЂРѕРёР·РІРѕРґСЃС‚РІРµРЅРЅС‹С… РїСЂРѕС†РµСЃСЃРѕРІ
          </li>
        </ul>
        <section id="tech" class="space-y-3 text-sm text-neutral-300 md:text-base">
          <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Технологии</h2>
          <p>
            Мы сочетаем физические симуляции, генеративные пайплайны и вычисления на GPU,
            чтобы передать характер материалов и движение света в интерактивных сценах.
          </p>
        </section>

        <section id="clients" class="space-y-3 text-sm text-neutral-300 md:text-base">
          <h2 class="text-base font-semibold uppercase tracking-[0.3em] text-white/80">Клиенты</h2>
          <p>
            Партнёримся с промышленными компаниями, девелоперами и музеями, помогая им презентовать
            сложные идеи через кинетические шоурумы и mixed reality инсталляции.
          </p>
        </section>

        <a
          id="contacts"
          href="#"
          class="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40 hover:bg-white/10"
        >
          РЎРјРѕС‚СЂРµС‚СЊ СЃРµСЂС‚РёС„РёРєР°С‚С‹
        </a>
      </div>

      <div class="relative flex flex-1 overflow-hidden">
        <SplineScene
          class-name="h-full w-full"
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          :zoom="heroZoom"
        />
        <div class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />
        <div class="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
        <Spotlight class="pointer-events-none left-6 top-20 z-30 lg:-top-10 lg:left-1/3" fill="#ffffff" />
      </div>
    </main>
  </div>
</template>







