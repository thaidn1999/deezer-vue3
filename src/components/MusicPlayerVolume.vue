<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'
  const useSong = useSongStore()
  const { audio, currentVolume } = storeToRefs(useSong)

  let isHover = ref<Boolean>(false)
  let volume = ref<HTMLMediaElement>()

  onMounted((): void => {
    if (volume.value) {
      volume.value.addEventListener('input', (e: any) => {
        if (audio.value) audio.value.volume = +e.currentTarget.value / 100
      })
    }
  })

  watch(
    () => audio.value,
    () => {
      setTimeout(() => {
        if (audio.value) {
          audio.value.volume = +currentVolume.value / 100
        }
      }, 200)
    }
  )
</script>

<template>
  <div class="relative mb-[23px] ml-2 mt-2 flex w-[150px] items-center" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <input
      v-model="currentVolume"
      ref="volume"
      type="range"
      class="absolute z-40 my-2 mt-[24px] h-0 w-full cursor-pointer appearance-none rounded-full bg-opacity-100 accent-white focus:outline-none"
      :class="isHover ? 'rangeDot' : 'rangeDotHidden'"
    />
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 mt-[6px] h-[4px] w-0 bg-white" :style="`width: ${currentVolume}%;`"></div>
    <div class="absolute inset-y-0 left-0 z-[-0] mt-[6px] h-[4px] w-full rounded-full bg-gray-500"></div>
  </div>
</template>

<style scoped lang="scss">
  .rangeDotHidden[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
  }
</style>
