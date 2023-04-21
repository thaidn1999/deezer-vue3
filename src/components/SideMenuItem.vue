<script setup lang="ts">
  import { toRefs, ref, watchEffect } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'

  const route = useRoute()

  const props = defineProps({
    iconString: String,
    iconSize: Number,
    pageUrl: String,
    name: String
  })
  const { iconString, pageUrl, name } = toRefs(props)

  let icon = ref<any>(null)

  watchEffect(() => {
    if (route.path == pageUrl?.value && icon.value === iconString?.value + '-red') return

    if (route.path == pageUrl?.value) {
      icon.value = iconString?.value + '-red'
    } else {
      icon.value = iconString?.value + '-white'
    }
  })

  const isHover = () => {
    if (icon.value === iconString?.value + '-red') {
      icon.value = iconString?.value + '-white'
    } else if (icon.value === iconString?.value + '-white') {
      icon.value = iconString?.value + '-red'
    }
  }
</script>

<template>
  <div class="my-[20px] flex w-full items-center">
    <RouterLink
      :to="pageUrl"
      :class="pageUrl === route.path ? 'border-l-[#EF5465] text-[#EF5465]' : 'border-l-[#191922] text-[#FFFFFF]'"
      class="w-full border-l-4 hover:text-[#EF5465]"
      @mouseenter="isHover()"
      @mouseleave="isHover()"
    >
      <div class="mx-3 flex cursor-pointer items-center pl-3">
        <img :width="iconSize" :src="`/images/icons/${icon}.png`" />
        <div class="pl-3.5 text-[17px] font-[600]">{{ name }}</div>
      </div>
    </RouterLink>
  </div>
</template>
