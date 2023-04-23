<template>
  <div>
    <div class="ml-8 mr-6 flex justify-between pb-5">
      <RouterLink
        to="/artist"
        @mouseenter="isHoverCategory = true"
        @mouseleave="isHoverCategory = false"
        :class="isHoverCategory ? 'hover:text-[#EF5465]' : 'text-white'"
        class="flex cursor-pointer items-center text-xl font-semibold"
      >
        {{ category }}
        <img src="/icons/chevron-right.png" class="mt-1" />
      </RouterLink>

      <div class="flex items-center">
        <button @click="slideTo(false)" class="rounded-full p-2 hover:bg-[#2b2b2b]">
          <img src="/icons/chevron-left.png" alt="" />
        </button>
        <div class="px-2"></div>
        <button @click="slideTo(true)" class="rounded-full p-2 hover:bg-[#2b2b2b]">
          <img src="/icons/chevron-right.png" alt="" />
        </button>
      </div>
    </div>

    <Carousel class="mr-8" ref="carousel" v-model="currentSlide" :items-to-show="4" :items-to-scroll="4" :transition="800" snapAlign="start">
      <Slide v-for="(slide, index) in data" :key="index" class="flex items-baseline">
        <SliderItem :slide="slide" />
      </Slide>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import { RouterLink } from 'vue-router'
  // import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
  // import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide } from 'vue3-carousel'
  import SliderItem from '@/components/SliderItem.vue'

  let currentSlide = ref<any>(0)
  let isHoverCategory = ref<Boolean>(false)

  const props = defineProps({
    category: String,
    data: Array<Record<string, any>>
  })
  const { data, category } = toRefs(props)

  const slideTo = (val: any) => {
    if (currentSlide.value <= 7 && val) {
      let res = currentSlide.value + 4
      if (res <= 12) {
        currentSlide.value = currentSlide.value + 4
      } else if (res > 12) {
        currentSlide.value = 12
      }
    } else if (!val) {
      let res = currentSlide.value - 4
      if (res > 0) {
        currentSlide.value = currentSlide.value - 4
      } else if (res < 1) {
        currentSlide.value = 0
      }
    }
  }
</script>
