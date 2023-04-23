<template>
  <div class="fixed mx-auto flex h-[calc(100%-80px)] w-full min-w-[1000px] items-center bg-purple-600 bg-gradient-to-r from-blue-400 to-transparent">
    <button @click="isLyrics = false" type="button" class="absolute top-0 m-8 rounded-full bg-black bg-opacity-20 p-2 hover:bg-opacity-40">
      <Close :size="30" fillColor="#FFFFFF" />
    </button>
    <div class="relative mx-auto flex w-1/2 max-w-[400px] items-center">
      <div class="absolute z-20 m-1 rounded-xl px-3 py-1.5 text-[20px] font-bold text-white">{{ currentArtist.name }}</div>
      <div class="absolute right-0 z-20 m-1 rounded-xl px-3 py-1.5 text-[20px] font-bold text-white">{{ currentTrack.name }}</div>
      <div class="relative">
        <img class="rounded-3xl shadow-2xl" :src="currentArtist.albumCover" />
        <div class="absolute top-0 z-10 h-full w-full rounded-3xl bg-black bg-opacity-10 blur-2xl" />
      </div>
    </div>
    <div id="LyricsDiv" class="scrollbar-hide relative mx-auto h-[calc(100%-1px)] w-1/2 max-w-[600px] overflow-auto">
      <div class="my-[90%]"></div>
      <div
        class="text-center text-[40px] font-semibold opacity-100"
        v-for="(res,index) in lyrics[currentTrack.id as keyof typeof lyrics]"
        :key="index"
        :class="snapToPosition(res)"
        v-show="res"
      >
        <LyricRow :time="res.time" :words="res.words" />
      </div>

      <div class="my-[90%]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch, onMounted } from 'vue'
  // import Close from 'vue-material-design-icons/Close.vue'
  import LyricRow from '@/components/LyricRow.vue'
  import lyrics from '@/lyrics.json'
  import artist from '@/artist.json'
  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'
  const useSong = useSongStore()

  const { currentTrack, currentArtist, trackTime, isLyrics } = storeToRefs(useSong)

  onMounted(() => {
    if (trackTime.value < lyrics[currentTrack.value.id as keyof typeof lyrics][0].time) {
      let divLyrics = document.getElementById('LyricsDiv') as HTMLElement
      divLyrics.scrollTop = 0
    }
  })

  const snapToPosition = (res: any) => {
    if (res && res.time < trackTime.value) {
      let position = document.getElementById(res.time)
      if (position) {
        position.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }
    }
  }

  watch(
    () => trackTime.value,
    () => {
      setTimeout(() => {
        if (trackTime.value < lyrics[currentTrack.value.id as keyof typeof lyrics][0].time) {
          let divLyrics = document.getElementById('LyricsDiv') as HTMLElement
          divLyrics.scrollTop = 0
        }
      }, 500)
    }
  )

  watch(
    () => currentTrack.value.id,
    id => {
      if (artist[id].lyrics) isLyrics.value = false
    }
  )
</script>
