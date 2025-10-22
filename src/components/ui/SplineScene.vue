<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import { Application } from "@splinetool/runtime"
import { cn } from "@/lib/utils"

const props = defineProps<{
  scene: string
  className?: string
  zoom?: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(true)
let app: Application | null = null

function applyZoom(zoomValue?: number) {
  if (!app || typeof zoomValue !== "number") return
  if (!Number.isFinite(zoomValue) || zoomValue <= 0) return

  app.setZoom(zoomValue)
}

async function loadScene(url: string) {
  if (!canvasRef.value) return

  isLoading.value = true

  try {
    if (!app) {
      app = new Application(canvasRef.value)
    }

    await app.load(url)
    applyZoom(props.zoom)
  } catch (error) {
    console.error("[SplineScene] Failed to load scene:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (props.scene) {
    loadScene(props.scene)
  }
})

watch(
  () => props.scene,
  (next, prev) => {
    if (next && next !== prev) {
      loadScene(next)
    }
  },
)

watch(
  () => props.zoom,
  (next) => {
    applyZoom(next)
  },
  { flush: "post" },
)

onBeforeUnmount(() => {
  app?.dispose()
  app = null
})
</script>

<template>
  <div :class="cn('relative h-full w-full', props.className)">
    <canvas
      ref="canvasRef"
      class="h-full w-full"
      role="img"
      :aria-busy="isLoading"
    />

    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
    >
      <span class="loader" aria-hidden="true"></span>
      <span class="sr-only">Loading 3D scene…</span>
    </div>
  </div>
</template>
