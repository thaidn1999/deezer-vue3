<template>
  <div>
    <RouterLink :to="to" class="relative">
      <div
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="flex aspect-square items-center justify-center overflow-hidden rounded-md brightness-[0.87] contrast-[2]"
      >
        <div
          :class="isHover ? 'bg-opacity-20 transition duration-150 ease-in' : 'bg-opacity-5 transition duration-150 ease-out'"
          class="absolute z-10 h-full w-full rounded-md bg-black"
        ></div>
        <img class="absolute right-0 top-0 w-1/2 contrast-[0.55]" :src="images?.one" />
        <img class="absolute left-0 top-0 w-1/2 contrast-[0.55]" :src="images?.two" />
        <img class="absolute bottom-0 right-0 w-1/2 contrast-[0.55]" :src="images?.three" />
        <img class="absolute bottom-0 left-0 w-1/2 contrast-[0.55]" :src="images?.four" />
        <div class="absolute z-10 inline-block rounded-full bg-white p-2">
          <img src="/icons/icon-play.png" alt="" />
        </div>
        <div class="absolute bottom-1 left-0 z-30 ml-1 flex h-7 items-center rounded-full bg-black bg-opacity-10 px-2">
          <img width="30" class="pr-2 opacity-[0.75] brightness-[1.2]" src="/images/deezer-sound-icon.png" />
          <div class="text-[21px] font-bold text-white">{{ category }}</div>
        </div>
      </div>
    </RouterLink>
    <div class="h-2"></div>
    <RouterLink :to="to">
      <div class="text-sm font-light text-gray-200 hover:underline">
        {{ text }}
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import { RouterLink } from 'vue-router'
  let isHover = ref<Boolean>(false)

  const props = defineProps({ category: String, images: Object, text: String, to: String })
  const { category, images, text, to } = toRefs(props)
</script>
