<script setup lang="ts">
  import SongRow from '@/components/SongRow.vue'
  import artist from '@/artist.json'
  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'
  const useSong = useSongStore()
  const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

  const playFunc = () => {
    if (currentTrack.value) {
      useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
      return
    }
    useSong.playFromFirst()
  }
</script>

<template>
  <div id="HeaderSection" class="mx-auto max-w-[1500px]">
    <div class="relative mt-6 flex h-full w-full min-w-[650px] items-center px-8">
      <img width="175" class="rounded-full" :src="artist.albumCover" />
      <div class="ml-8">
        <div class="w-full cursor-pointer text-3xl font-semibold text-white hover:underline">
          {{ artist.name }}
        </div>
        <div class="py-1.5 text-[12px] font-light text-[#bfbfbf]">167,026 fans</div>
        <div class="bottom-0 mb-1.5 flex items-center justify-start gap-4">
          <button class="rounded-full bg-[#EF5465] p-2.5 px-6" @click="playFunc()">
            <div v-if="!isPlaying" class="flex items-center">
              <img width="24" src="/icons/play.svg" alt="" />
              <div class="pr-1 text-xs font-bold text-white">PLAY</div>
            </div>
            <div v-else class="flex items-center">
              <img width="24" src="/icons/pause.svg" alt="" />
              <div class="pr-1 text-xs font-bold text-white">PAUSE</div>
            </div>
          </button>
          <button type="button" class="rounded-full border border-[#52525D] p-2 hover:bg-[#2b2b30]">
            <img width="24" src="/icons/heart.svg" alt="" />
          </button>
          <button type="button" class="rounded-full border border-[#52525D] p-2 hover:bg-[#2b2b30]">
            <img width="24" src="/icons/dots-horizontal.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

    <div class="mt-11"></div>
    <div class="flex min-w-[650px] justify-between pt-2">
      <ul class="flex h-9 w-full items-center justify-start text-gray-400">
        <li class="pl-8">
          <button class="cursor-pointer border-b-2 border-b-[#121216] pb-[8px] font-light text-[#bebebe] hover:border-b-[#FFFFFF] hover:text-[#FFFFFF]">Discography</button>
        </li>
        <li class="pl-10 text-[#FFFFFF]">
          <button class="cursor-pointer border-b-2 border-b-[#EF5465] pb-[8px] font-semibold">Top tracks</button>
        </li>
        <li class="pl-10">
          <button class="cursor-pointer border-b-2 border-b-[#121216] pb-[8px] font-light text-[#bebebe] hover:border-b-[#FFFFFF] hover:text-[#FFFFFF]">Similar artists</button>
        </li>
        <li class="pl-10">
          <button class="cursor-pointer border-b-2 border-b-[#121216] pb-[8px] font-light text-[#bebebe] hover:border-b-[#FFFFFF] hover:text-[#FFFFFF]">Playlists</button>
        </li>
        <li class="pl-10">
          <button class="cursor-pointer border-b-2 border-b-[#121216] pb-[8px] font-light text-[#bebebe] hover:border-b-[#FFFFFF] hover:text-[#FFFFFF]">Bio</button>
        </li>
      </ul>
    </div>
  </div>

  <div class="border-b border-b-[#302d2d]"></div>
  <div class="mb-10"></div>

  <div id="SongsSection" class="mx-auto max-w-[1500px]">
    <div class="pl-8">
      <div class="mb-7 text-3xl font-semibold text-white">Top tracks</div>

      <div class="flex w-[300px] items-center rounded-lg border border-[#525254] bg-[#23232D] text-[#c9c9c9]">
        <img width="24" src="/icons/search.svg" class="px-1" />
        <input class="w-full rounded-lg bg-[#23232D] py-2 text-sm placeholder-[#7e7e7e] outline-none ring-0 hover:ring-0" type="text" placeholder="Search within tracks" />
      </div>
    </div>

    <div class="mb-4"></div>

    <div class="mx-8 flex min-w-[590px] items-center justify-between border-b border-b-[#302d2d] px-1.5 py-2.5">
      <div class="text-xs font-light text-[#aeaeae]">TRACK</div>
      <img width="24" src="/icons/clock-time.svg" />
    </div>

    <ul class="mx-8 w-full min-w-[650px] pr-16" v-for="(track, index) in artist.tracks" :key="index">
      <SongRow v-if="track" :track="track" />
    </ul>
  </div>
  <div class="mb-40"></div>
</template>

<style scoped>
  .circle {
    width: 4px;
    height: 4px;
    background-color: rgb(189, 189, 189);
    border-radius: 100%;
  }
</style>
