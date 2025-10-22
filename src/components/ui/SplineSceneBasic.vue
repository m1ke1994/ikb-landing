<script setup lang="ts">
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
</script>

<template>
  <Card class="relative h-[500px] w-full overflow-hidden bg-black/95 text-white">
    <Spotlight class="-top-40 left-0 z-0 md:-top-20 md:left-60" fill="white" />

    <div class="relative z-10 flex h-full flex-col md:flex-row">
      <div class="flex flex-1 flex-col justify-center gap-4 p-8">
        <h1 class="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Interactive 3D
        </h1>
        <p class="max-w-lg text-neutral-300">
          Bring your UI to life with beautiful 3D scenes. Create immersive experiences that capture attention
          and enhance your design.
        </p>
      </div>

      <div class="flex-1">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          class-name="h-full w-full"
        />
      </div>
    </div>
  </Card>
</template>
