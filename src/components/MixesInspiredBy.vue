<template>
  <div>
    <RouterLink :to="to" class="relative">
      <div class="relative flex h-[54px] items-center rounded-sm bg-[#23232D]">
        <div class="flex w-[54px] items-center" @mouseenter="isHover = true" @mouseleave="isHover = false">
          <div
            :class="isHover ? 'bg-opacity-40 transition duration-100 ease-in' : 'bg-opacity-5 transition duration-100 ease-out'"
            class="absolute z-10 h-full w-[54px] rounded-sm bg-black"
          ></div>
          <div
            :class="isHover ? 'bg-opacity-1000 transition duration-100 ease-in' : 'opacity-0 transition duration-100 ease-out'"
            class="absolute left-[6px] z-20 rounded-full bg-white p-1.5"
          >
            <img src="/icons/icon-play.png" alt="" />
          </div>
          <img class="z-0 min-h-[54px] min-w-[54px] rounded-sm" :src="image" />
        </div>
        <div class="ml-4 w-full truncate">
          <p class="max-w-[95%] cursor-pointer truncate text-[15px] font-light text-gray-200 hover:underline">
            {{ text }}
          </p>
          <p class="max-w-[95%] truncate text-[12px] font-light text-[#787882]">
            by <span class="cursor-pointer hover:underline">{{ by }}</span>
          </p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import { RouterLink } from 'vue-router'

  let isHover = ref<Boolean>(false)

  const props = defineProps({ by: String, image: String, text: String, to: String })
  const { by, image, text, to } = toRefs(props)
</script>
