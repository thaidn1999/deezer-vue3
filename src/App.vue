<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { RouterView, RouterLink } from 'vue-router'
  import SideMenuItem from './components/SideMenuItem.vue'
  // import MusicPlayer from './components/MusicPlayer.vue'
  // import SongLyrics from './components/SongLyrics.vue'

  import { useSongStore } from '@/stores/song'
  import { storeToRefs } from 'pinia'
  const useSong = useSongStore()
  const { isPlaying, currentTrack, isLyrics, trackTime } = storeToRefs(useSong)

  onBeforeMount(() => {
    isPlaying.value = false
    isLyrics.value = false
    trackTime.value = '0:00'
  })
</script>

<template>
  <div id="TopNav" class="fixed right-0 flex h-[56px] w-[calc(100%-240px)] items-center justify-between border-b border-b-[#32323D]">
    <div class="flex w-full items-center">
      <img src="/icons/icon-search.svg" class="pl-6 pr-2" />
      <input class="w-full max-w-xl bg-transparent p-1 font-[300] text-[#FFFFFF] placeholder-[#BEBEC7] outline-none" placeholder="Search" type="text" />
    </div>
    <div class="flex items-center pr-10">
      <div class="mr-4 cursor-pointer rounded-full p-1 hover:bg-gray-600">
        <img src="/icons/icon-bell.svg" />
      </div>
      <img class="w-[33px] cursor-pointer rounded-full" src="/images/avatar/bear.jpg" />
    </div>
  </div>

  <div id="SideNav" class="fixed h-[100vh] w-[240px] border-r border-r-[#32323D] bg-[#191922]">
    <div class="w-full cursor-pointer pl-6 pt-3">
      <RouterLink to="/">
        <img width="130" src="/images/deezer-logo.png" />
      </RouterLink>
    </div>

    <div class="mt-[53px]"></div>

    <SideMenuItem iconString="music" :iconSize="20" pageUrl="/" name="Music" />
    <SideMenuItem iconString="podcast" :iconSize="20" pageUrl="/podcasts" name="Podcasts" />
    <SideMenuItem iconString="explore" :iconSize="20" pageUrl="/artist" name="Explore" />
    <SideMenuItem iconString="favourite" :iconSize="20" pageUrl="/favourite" name="Favourites" />

    <div class="mt-[25px] pl-[62px] text-[12px] font-light text-[#A2A2AD]">
      <div class="cursor-pointer py-[9px] hover:text-[#EF5465]">Favourite tracks</div>
      <div class="cursor-pointer py-[9px] hover:text-[#EF5465]">Playlist</div>
      <div class="cursor-pointer py-[9px] hover:text-[#EF5465]">Albums</div>
      <div class="cursor-pointer py-[9px] hover:text-[#EF5465]">Artists</div>
      <div class="cursor-pointer py-[9px] hover:text-[#EF5465]">Podcasts</div>
    </div>
  </div>

  <div class="fixed ml-[240px] mt-[56px] h-[calc(100%-56px)] w-[calc(100%-240px)] overflow-x-auto">
    <RouterView />
  </div>

  <!-- <MusicPlayer v-if="currentTrack" />

  <SongLyrics v-if="isLyrics" :class="{ 'animate__animated animate__slideInUp animate__faster': isLyrics }" /> -->
</template>
