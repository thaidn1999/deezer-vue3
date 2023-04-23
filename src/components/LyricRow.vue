<template>
  <div :id="time" class="my-10 text-white opacity-100" :class="{ 'opacity-30': lyricsPosition !== time }">
    <div v-if="words === 'INSTRAMENTAL SECTION'" class="flex w-full">
      <img src="/icons/guitar.png" alt="" />
    </div>
    <div v-if="words !== 'INSTRAMENTAL SECTION'">{{ words }}</div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, watch } from 'vue'
  import lyrics from '@/lyrics.json'
  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'

  const useSong = useSongStore()
  const { trackTime, currentTrack, lyricsPosition } = storeToRefs(useSong)
  const props = defineProps({ time: String, words: String })
  const { time, words } = toRefs(props)

  watch(
    (): void => trackTime.value,
    trackTime => {
      setTimeout(() => {
        lyrics[currentTrack.value?.id as keyof typeof lyrics].forEach((res: any) => {
          if (res.time == trackTime) lyricsPosition.value = res.time
        })
      }, 1000)
    }
  )
</script>
