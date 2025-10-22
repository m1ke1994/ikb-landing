<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import { Application } from "@splinetool/runtime"
import { cn } from "@/lib/utils"

const props = defineProps<{
  scene: string
  className?: string
  zoom?: number
  pointerRotation?: { x: number; y: number } | null
  targetName?: string
  rotationMultiplier?: number
  rotationMultiplierX?: number
  rotationMultiplierY?: number
  bodyTargetName?: string
  bodyRotationMultiplier?: number
  bodyRotationMultiplierX?: number
  bodyRotationMultiplierY?: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(true)
const headNode = ref<any | null>(null)
const baseRotation = ref({ x: 0, y: 0, z: 0 })
const bodyNode = ref<any | null>(null)
const bodyBaseRotation = ref({ x: 0, y: 0, z: 0 })
let app: Application | null = null

type SceneGraph = {
  children?: any[]
  rotation?: {
    x?: number
    y?: number
    z?: number
  }
}

type SceneAwareApplication = Application & {
  scene?: SceneGraph
}

const getSceneGraph = (): SceneGraph | null => {
  const runtimeApp = app as SceneAwareApplication | null
  return runtimeApp?.scene ?? null
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

function captureBaseRotation(node: any) {
  if (!node?.rotation) return
  baseRotation.value = {
    x: node.rotation.x ?? 0,
    y: node.rotation.y ?? 0,
    z: node.rotation.z ?? 0,
  }
}

function captureBodyBaseRotation(node: any) {
  if (!node?.rotation) return
  bodyBaseRotation.value = {
    x: node.rotation.x ?? 0,
    y: node.rotation.y ?? 0,
    z: node.rotation.z ?? 0,
  }
}

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
    headNode.value = null
    resolveHeadNode(true)
    bodyNode.value = null
    resolveBodyNode(true)
    applyZoom(props.zoom)
    applyPointerRotation(props.pointerRotation)
  } catch (error) {
    console.error("[SplineScene] Failed to load scene:", error)
  } finally {
    isLoading.value = false
  }
}

function collectSceneNodes(): any[] {
  const scene = getSceneGraph()
  if (!scene) return []
  const result: any[] = []
  const queue: any[] = Array.isArray(scene.children) ? [...scene.children] : []

  while (queue.length > 0) {
    const node = queue.shift()
    if (!node) continue
    result.push(node)
    if (Array.isArray(node.children) && node.children.length > 0) {
      queue.push(...node.children)
    }
  }

  return result
}

function resolveHeadNode(force = false) {
  if (!app) return null
  if (!force && headNode.value) return headNode.value

  let target: any | null = null

  if (props.targetName) {
    target = app.findObjectByName(props.targetName)
  }

  if (!target) {
    const fallback = collectSceneNodes().find((node) => {
      return typeof node?.name === "string" && /head/i.test(node.name)
    })
    target = fallback ?? null
  }

  if (target?.rotation) {
    headNode.value = target
    captureBaseRotation(target)
    return headNode.value
  }

  return null
}

function resolveBodyNode(force = false) {
  if (!app) return null
  if (!force && bodyNode.value) return bodyNode.value

  let target: any | null = null

  if (props.bodyTargetName) {
    target = app.findObjectByName(props.bodyTargetName)
  }

  if (!target) {
    const nodes = collectSceneNodes()
    target =
      nodes.find((node) => {
        return typeof node?.name === "string" && /robot|body|torso|root|spine/i.test(node.name)
      }) ?? null

    if (!target && nodes.length > 0) {
      target = nodes[0]
    }
  }

  if (!target) {
    target = getSceneGraph()
  }

  if (target?.rotation) {
    bodyNode.value = target
    captureBodyBaseRotation(target)
    return bodyNode.value
  }

  return null
}

function getMultiplier(defaultValue: number, override?: number | null) {
  if (typeof override === "number" && Number.isFinite(override)) {
    return override
  }
  return defaultValue
}

function applyPointerRotation(pointer: { x: number; y: number } | null | undefined) {
  const headTarget = resolveHeadNode()
  const bodyTarget = resolveBodyNode()

  const applyRotation = (
    targetNode: any | null,
    base: { x: number; y: number; z: number },
    multipliers: { default: number; x?: number | null; y?: number | null },
  ) => {
    if (!targetNode?.rotation) return

    if (!pointer) {
      targetNode.rotation.x = base.x
      targetNode.rotation.y = base.y
      targetNode.rotation.z = base.z
      return
    }

    const pitchMultiplier = getMultiplier(multipliers.default, multipliers.x ?? null)
    const yawMultiplier = getMultiplier(multipliers.default, multipliers.y ?? null)

    const nextX = base.x + toRadians(pointer.x * pitchMultiplier)
    const nextY = base.y + toRadians(pointer.y * yawMultiplier)

    targetNode.rotation.x = nextX
    targetNode.rotation.y = nextY
  }

  const headMultipliers = {
    default: getMultiplier(0.45, props.rotationMultiplier),
    x: props.rotationMultiplierX ?? null,
    y: props.rotationMultiplierY ?? null,
  }

  const bodyMultipliers = {
    default: getMultiplier(0.25, props.bodyRotationMultiplier),
    x: props.bodyRotationMultiplierX ?? null,
    y: props.bodyRotationMultiplierY ?? null,
  }

  applyRotation(headTarget, baseRotation.value, headMultipliers)
  applyRotation(bodyTarget, bodyBaseRotation.value, bodyMultipliers)
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

watch(
  () => props.pointerRotation,
  (next) => {
    applyPointerRotation(next)
  },
  { deep: true },
)

watch(
  () => props.targetName,
  () => {
    headNode.value = null
    resolveHeadNode(true)
    applyPointerRotation(props.pointerRotation)
  },
)

watch(
  () => props.bodyTargetName,
  () => {
    bodyNode.value = null
    resolveBodyNode(true)
    applyPointerRotation(props.pointerRotation)
  },
)

onBeforeUnmount(() => {
  app?.dispose()
  app = null
  headNode.value = null
  bodyNode.value = null
})
</script>

<template>
  <div :class="cn('relative h-full w-full', props.className)">
    <canvas
      ref="canvasRef"
      class="h-full w-full bg-transparent"
      role="img"
      style="background: transparent"
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
