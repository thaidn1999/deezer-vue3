<template>
  <li @mouseenter="isHover = true" @mouseleave="isHover = false" class="flex items-center justify-between p-2 hover:bg-[#979797] hover:bg-opacity-5">
    <div class="flex items-center">
      <div class="relative">
        <div v-if="isHover" class="absolute ml-[3px] mt-[2px] cursor-pointer rounded-full bg-white p-1">
          <img src="/icons/play-black.svg" width="24" v-if="!isPlaying" @click="useSong.playOrPauseThisSong(artist, track)" />
          <img src="/icons/play-black.svg" width="24" v-else-if="isPlaying && currentTrack.name !== track?.name" @click="useSong.loadSong(artist, track)" />
        </div>
        <div v-if="track && currentTrack && currentTrack.name === track.name" class="absolute ml-[3px] mt-[2px] cursor-pointer rounded-full bg-white p-1">
          <img src="/icons/pause-black.svg" width="24" v-if="!isHover && isPlaying" :size="25" @click="useSong.playOrPauseSong()" />
        </div>
        <div
          @mouseenter="isHoverGif = true"
          @mouseleave="isHoverGif = false"
          v-if="isPlaying && track && currentTrack && currentTrack.name === track.name"
          class="absolute ml-[3px] mt-[2px] cursor-pointer rounded-full bg-white p-1"
        >
          <img v-if="!isHoverGif" src="/icons/audio-wave.gif" />
          <img src="/icons/pause-black.svg" width="24" v-if="isHoverGif" :size="25" @click="useSong.playOrPauseSong()" />
        </div>
        <img width="37" class="border border-[#494949]" :src="artist.albumCover" />
      </div>
      <div
        v-if="track"
        :class="track && currentTrack && currentTrack.name === track.name ? 'text-[#EF5464]' : 'text-[#d4d4d4]'"
        class="cursor-pointer pl-4 text-base hover:underline"
      >
        {{ track.id }}. {{ track.name }}
      </div>
    </div>
    <div class="flex items-center">
      <div v-if="track?.lyrics" @click="openLyrics(track, artist)" class="mr-3 rotate-45 cursor-pointer rounded-full p-1.5 hover:bg-[#979797] hover:bg-opacity-20">
        <img src="/icons/microphone.svg" />
      </div>
      <div class="mr-3 cursor-pointer rounded-full p-1.5 hover:bg-[#979797] hover:bg-opacity-20">
        <img src="/icons/heart.svg" width="24" />
      </div>
      <div class="cursor-pointer rounded-full p-1.5 hover:bg-[#979797] hover:bg-opacity-20">
        <img src="/icons/dots-grey.svg" />
      </div>
      <div
        v-if="isTrackTime"
        :class="track && currentTrack && currentTrack.name === track.name ? 'text-[#EF5464]' : 'text-[#d4d4d4]'"
        class="pl-10 text-[13px] font-[200] text-[#d4d4d4]"
      >
        {{ isTrackTime }}
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
  import { ref, toRefs, onMounted } from 'vue'
  import artist from '@/artist.json'

  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'
  const useSong = useSongStore()
  const { audio, isPlaying, currentTrack, isLyrics } = storeToRefs(useSong)

  let isHover = ref(false)
  let isHoverGif = ref(false)
  let isTrackTime = ref('00:00')

  const props = defineProps({ track: Object })
  const { track } = toRefs(props)

  onMounted(() => {
    const audioMeta = new Audio(track?.value?.path)
    audioMeta.addEventListener('loadedmetadata', () => {
      const duration = audioMeta.duration
      const minutes = Math.floor(duration / 60)
      const seconds = Math.floor(duration % 60)
      isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0')
    })
  })

  const openLyrics = (track: Record<string, any>, artist: Record<string, any>) => {
    if (audio.value && !audio.value.paused && track.id === currentTrack.value.id) {
      isLyrics.value = true
    } else if (audio.value && audio.value.paused && track.id === currentTrack.value.id) {
      useSong.playOrPauseSong()
      isLyrics.value = true
    } else {
      useSong.playOrPauseThisSong(artist, track)
      setTimeout(() => (isLyrics.value = true), 500)
    }
  }
</script>
