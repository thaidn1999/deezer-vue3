<template>
  <RouterLink to="/artist" class="cursor-pointer">
    <div class="relative" @mouseenter="isHover = true" @mouseleave="isHover = false">
      <div
        :class="isHover ? 'bg-opacity-30 transition duration-150 ease-in' : 'bg-opacity-5 transition duration-150 ease-out'"
        class="absolute z-10 h-full w-full rounded-md bg-black"
      ></div>
      <div class="absolute z-50 pl-4 pt-4">
        <div class="inline-block rounded-md bg-black bg-opacity-40 px-2 py-1 text-center text-sm text-white">Album</div>
        <div class="mt-2 text-xl font-[700] text-white">{{ by }}</div>
        <div class="mt-2 font-[400] text-white">{{ song }}</div>
      </div>
      <div class="absolute bottom-3 left-3 z-50 rounded-full bg-white p-1.5">
        <img src="/icons/icon-play.png" alt="" />
      </div>
      <img class="rounded-lg" :src="image" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  let isHover = ref<Boolean>(false)
  const props = defineProps({ by: String, song: String, image: String })
</script>
