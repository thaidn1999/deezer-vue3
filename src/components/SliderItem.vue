<template>
  <div class="pl-8">
    <RouterLink to="/artist" class="cursor-pointer">
      <div class="relative" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <div
          :class="isHover ? 'bg-opacity-30 transition duration-150 ease-in' : 'bg-opacity-5 transition duration-150 ease-out'"
          class="absolute z-10 h-full w-full rounded-md bg-black"
        ></div>
        <div class="absolute bottom-3 left-3 z-50 rounded-full bg-white p-1.5">
          <img src="/icons/icon-play.png" alt="" />
        </div>
        <div
          :class="isHover ? 'bg-opacity-100 transition duration-150 ease-in' : 'bg-opacity-0 transition duration-150 ease-out'"
          class="absolute bottom-3 left-[60px] z-50 rounded-full bg-white p-2"
        >
          <img src="/icons/heart.png" :class="isHover ? 'opacity-100 transition duration-150 ease-in' : 'opacity-0 transition duration-150 ease-out'" />
        </div>
        <div
          :class="isHover ? 'bg-opacity-100 transition duration-150 ease-in' : 'bg-opacity-0 transition duration-150 ease-out'"
          class="absolute bottom-3 left-[107px] z-50 rounded-full bg-white p-1.5"
        >
          <img src="/icons/dot-horizontal.png" :class="isHover ? 'opacity-100 transition duration-150 ease-in' : 'opacity-0 transition duration-150 ease-out'" />
        </div>
        <img width="25" class="absolute bottom-0 right-0 z-40 mr-3 pb-3 brightness-[1.1] contrast-[1.4]" src="/images/deezer-sound-icon.png" />
        <img class="aspect-square rounded-md" :src="slide?.url" />
      </div>

      <div class="mt-2 text-left text-white">
        <div class="cursor-pointer text-sm hover:underline">{{ slide?.song }}</div>
        <div class="flex pt-0.5 text-[13px] text-[#858590] hover:underline">by {{ slide?.by }}</div>
        <div class="pt-0.5 text-[11px] text-[#858590]">Released on {{ slide?.releasedOn }}</div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  let isHover = ref<Boolean>(false)
  const props = defineProps({ slide: Object })
</script>
