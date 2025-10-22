<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue"
import { cn } from "@/lib/utils"

type SpringOptions = {
  stiffness?: number
  damping?: number
}

const props = withDefaults(
  defineProps<{
    className?: string
    size?: number
    springOptions?: SpringOptions
  }>(),
  {
    size: 200,
    springOptions: () => ({
      stiffness: 180,
      damping: 22,
    }),
  },
)

const containerRef = ref<HTMLDivElement | null>(null)
const parentElement = ref<HTMLElement | null>(null)
const isHovered = ref(false)

const pointer = reactive({
  x: 0,
  y: 0,
})

const display = reactive({
  x: 0,
  y: 0,
})

let frameId: number | null = null

function animate() {
  const { stiffness = 180, damping = 22 } = props.springOptions
  const smoothing = Math.max(Math.min(stiffness / (damping * 100), 0.35), 0.08)

  display.x += (pointer.x - display.x) * smoothing
  display.y += (pointer.y - display.y) * smoothing

  frameId = window.requestAnimationFrame(animate)
}

function stopAnimation() {
  if (frameId != null) {
    cancelAnimationFrame(frameId)
    frameId = null
  }
}

function handleMouseMove(event: MouseEvent) {
  if (!parentElement.value) return
  const { left, top } = parentElement.value.getBoundingClientRect()
  pointer.x = event.clientX - left
  pointer.y = event.clientY - top
}

onMounted(() => {
  if (!containerRef.value) return
  const parent = containerRef.value.parentElement
  if (!parent) return

  parent.style.position = parent.style.position || "relative"
  parent.style.overflow = "hidden"
  parentElement.value = parent

  parent.addEventListener("mousemove", handleMouseMove)
  parent.addEventListener("mouseenter", () => (isHovered.value = true))
  parent.addEventListener("mouseleave", () => {
    isHovered.value = false
    pointer.x = parent.clientWidth / 2
    pointer.y = parent.clientHeight / 2
  })

  animate()
})

onBeforeUnmount(() => {
  const parent = parentElement.value
  if (parent) {
    parent.removeEventListener("mousemove", handleMouseMove)
  }
  stopAnimation()
})

const spotlightStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  left: `${display.x - props.size / 2}px`,
  top: `${display.y - props.size / 2}px`,
}))

const classes = computed(() =>
  cn(
    "pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200",
    "from-zinc-50 via-zinc-100 to-zinc-200",
    isHovered.value ? "opacity-100" : "opacity-0",
    props.className,
  ),
)

watch(
  () => props.size,
  () => {
    pointer.x = display.x
    pointer.y = display.y
  },
)
</script>

<template>
  <div ref="containerRef" :class="classes" :style="spotlightStyle" aria-hidden="true" />
</template>
