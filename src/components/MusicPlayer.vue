<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import MusicPlayerVolume from '@/components/MusicPlayerVolume.vue'
  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'
  const useSong = useSongStore()
  const { isPlaying, currentArtist, currentTrack, trackTime, currentVolume, isLyrics, audio } = storeToRefs(useSong)

  let isHover = ref<Boolean>(false)
  let isVolumeHover = ref<Boolean>(false)
  let isTrackTimeCurrent = ref<String>('0:00')
  let isTrackTimeTotal = ref<String>('0:00')
  let seeker = ref<any>(null)
  let seekerContainer = ref<any>(null)
  let range = ref<Number>(0)

  onMounted(() => {
    setTimeout(() => {
      timeupdate()
      loadmetadata()
    }, 300)
    if (currentTrack.value && audio.value) {
      let eventSeeker = seeker.value as HTMLInputElement
      let containerSeeker = seekerContainer.value as HTMLDivElement
      eventSeeker.addEventListener('change', () => {
        if (audio.value) {
          const time = audio.value.duration * (+eventSeeker.value / 100)
          audio.value.currentTime = time
        }
      })
      eventSeeker.addEventListener('mousedown', () => {
        if (audio.value) {
          audio.value.pause()
          isPlaying.value = false
        }
      })
      eventSeeker.addEventListener('mouseup', () => {
        if (audio.value) {
          audio.value.play()
          isPlaying.value = true
        }
      })
      containerSeeker.addEventListener('click', (e: any) => {
        if (audio.value) {
          const clickPosition = (e.pageX - containerSeeker.offsetLeft) / containerSeeker.offsetWidth
          const time = audio.value.duration * clickPosition
          audio.value.currentTime = time
          eventSeeker.value = ((100 / audio.value.duration) * audio.value.currentTime).toString()
        }
      })
    }
  })

  const timeupdate = (): void => {
    if (audio.value) {
      audio.value.addEventListener('timeupdate', () => {
        console.log('12313')
      })
    }
  }
  const loadmetadata = () => {
    if (audio.value) {
      audio.value.addEventListener('loadedmetadata', () => {
        if (audio.value) {
          const duration = audio.value.duration
          const minutes = Math.floor(duration / 60)
          const seconds = Math.floor(duration % 60)
          isTrackTimeTotal.value = minutes + ':' + seconds.toString().padStart(2, '0')
        }
      })
    }
  }
  watch(
    () => audio.value,
    () => {
      timeupdate()
      loadmetadata()
    }
  )
  watch(
    () => isTrackTimeCurrent.value,
    time => {
      if (time && time == isTrackTimeTotal.value) {
        useSong.nextSong(currentTrack.value)
      }
    }
  )
  watch(
    () => currentTrack.value.id,
    val => {
      if (currentTrack.value.lyrics) {
        isLyrics.value = true
        return
      }
      isLyrics.value = false
    }
  )
</script>

<template>
  <div id="MusicPlayer" v-if="audio" class="fixed bottom-0 z-50 flex h-[80px] w-full min-w-[1000px] items-center justify-between border-t border-t-[#383838] bg-[#23232D]">
    <div class="flex w-2/12 items-center">
      <div class="flex h-[30px] items-center justify-center pl-4">
        <button
          type="button"
          :disabled="currentTrack.id === 1"
          :class="{ 'rounded-full hover:bg-[#363636]': currentTrack.id !== 1 }"
          class="mx-2 p-2"
          @click="useSong.prevSong(currentTrack)"
        >
          <img v-if="currentTrack.id === 1" src="/icons/skip-previous-1.svg" />
          <img v-else src="/icons/skip-previous.svg" />
        </button>
        <button type="button" class="rounded-full p-2 hover:bg-[#363636]" @click="useSong.playOrPauseThisSong(currentArtist, currentTrack)">
          <img src="/icons/play.svg" v-if="!isPlaying" />
          <img src="/icons/pause.svg" v-else />
        </button>
        <button type="button" class="mx-2 rounded-full p-2 hover:bg-[#363636]" @click="useSong.nextSong(currentTrack)">
          <img src="/icons/skip-next.svg" />
        </button>
      </div>
    </div>

    <div class="mx-10 mb-2.5 w-full max-w-[50%]">
      <div class="relative top-1 mx-7 flex items-center justify-between pl-1">
        <div class="flex items-center">
          <div class="bg-[#2E2E39] px-1 py-0.5 text-[10px] text-[#72727D]">ALBUM</div>
          <div class="ml-3 text-[14px] font-[300] text-white">{{ currentTrack.name }}</div>
          <div class="relative -top-1 left-[6px] text-white">.</div>
          <div class="ml-3 text-[14px] font-[300] text-white">{{ currentArtist.name }}</div>
        </div>
        <div class="flex items-center">
          <div class="ml-2 cursor-pointer rounded-full p-1.5 hover:bg-[#5a5a5a] hover:bg-opacity-50">
            <img src="/icons/plus.svg" />
          </div>
          <div class="ml-2 cursor-pointer rounded-full p-1.5 hover:bg-[#5a5a5a] hover:bg-opacity-50">
            <img src="/icons/heart.svg" />
          </div>
          <div class="ml-2 cursor-pointer rounded-full p-1.5 hover:bg-[#5a5a5a] hover:bg-opacity-50">
            <img src="/icons/tune.svg" />
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div v-if="isTrackTimeCurrent" class="relative -bottom-[5px] pr-2 text-[10px] text-[#8a8a8a]">
          {{ isTrackTimeCurrent }}
        </div>
        <div ref="seekerContainer" class="relative mb-3 mt-2 w-full" @mouseenter="isHover = true" @mouseleave="isHover = false">
          <input
            v-model="range"
            ref="seeker"
            type="range"
            class="absolute z-40 my-[7px] h-0 w-full cursor-pointer appearance-none rounded-full bg-opacity-100 focus:outline-none"
            :class="isHover ? 'rangeDot' : 'rangeDotHidden'"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 z-10 w-0 rounded-full"
            :style="`width: ${range}%; background-color: grey`"
            :class="isHover ? 'mt-[5px] h-[4px]' : 'mt-[6px] h-[2px]'"
          ></div>
          <div :class="isHover ? 'mt-[5px] h-[4px]' : 'mt-[6px] h-[2px]'" class="absolute inset-y-0 left-0 z-[-0] w-full rounded-full bg-[#c4c4c4]"></div>
        </div>
        <div v-if="isTrackTimeTotal" class="relative -bottom-[5px] pl-2 text-[10px] text-[#8a8a8a]">
          {{ isTrackTimeTotal }}
        </div>
      </div>
    </div>

    <div class="flex w-1/4 items-center justify-end pr-6">
      <div class="flex items-center">
        <div class="ml-2 cursor-pointer rounded-full p-2 hover:bg-[#5a5a5a] hover:bg-opacity-50">
          <img src="/icons/picture-in-picture.svg" class="block" />
        </div>
        <div class="ml-2 cursor-pointer rounded-full p-2 hover:bg-[#5a5a5a] hover:bg-opacity-50">
          <img src="/icons/shuffle-bold.svg" class="block" />
        </div>
        <div @mouseenter="isVolumeHover = true" @mouseleave="isVolumeHover = false" class="relative">
          <div class="ml-2 cursor-pointer rounded-full p-2 hover:bg-[#5a5a5a] hover:bg-opacity-50">
            <img src="/icons/volume-up.svg" v-if="+currentVolume > 0" class="block" />
            <img src="/icons/volume-off.svg" v-else class="block" />
          </div>
          <div v-show="isVolumeHover" class="absolute -left-20 -top-12 rounded-xl bg-[#2a2a37] p-2 px-4 shadow-xl">
            <MusicPlayerVolume />
          </div>
        </div>
        <div class="ml-2 cursor-pointer rounded-full p-2 hover:bg-[#5a5a5a] hover:bg-opacity-50">
          <img src="/icons/tune.svg" class="block" />
        </div>
      </div>
      <div class="ml-6 flex items-center border-l border-l-[#363636]">
        <img class="ml-6 rounded-sm" width="28" :src="currentArtist.albumCover" />
        <div class="ml-1.5 text-base font-light text-white">Queue</div>
      </div>
    </div>
  </div>
</template>

<style>
  .rangeDotHidden[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
  }

  .rangeDot[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    border-radius: 100%;
    width: 12px;
    height: 12px;
  }
</style>

<style scoped lang="scss">
  img {
    width: 24px;
  }
</style>
