<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row w-full items-center">
      <div v-if="$slots['prev-btn']" class="shrink-0 mr-3">
        <slot name="prev-btn">
          <y-button
            size="xs"
            circle
            secondary
            @click.stop="scroll('left')"
            icon="yi yi-chevron-left text-GREY-1 text-lg"
          ></y-button>
        </slot>
      </div>
      <div
        ref="carouselContainerRef"
        class="flex flex-row w-full overflow-scroll scrollbar-hide snap-both scroll-smooth gap-3"
      >
        <div
          class="snap-start"
          v-for="(item, index) in items"
          :key="index"
          ref="carousel"
        >
          <slot name="carousel-item" :item="item"> {{ item }}</slot>
        </div>
      </div>
      <div v-if="$slots['next-btn']" class="shrink-0 ml-3">
        <slot name="next-btn">
          <y-button
            size="xs"
            circle
            secondary
            @click.stop="scroll('right')"
            icon="yi yi-chevron-right text-GREY-1 text-lg"
          ></y-button>
        </slot>
      </div>
    </div>
    <div class="flex w-full gap-2">
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-carousel',
};
</script>
<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  items: Object,
  default: () => {},
});

const carouselContainerRef = ref();
const childSize = ref();

onMounted(() => {
  childSize.value =
    carouselContainerRef.value.children[0].getBoundingClientRect();
});

const scroll = (direction) => {
  if (
    direction === 'left' &&
    carouselContainerRef.value.scrollLeft >= childSize.value.width
  ) {
    carouselContainerRef.value.scrollLeft -= childSize.value.width / 2 + 10;
  } else if (direction === 'right') {
    carouselContainerRef.value.scrollLeft += childSize.value.width / 2 + 10;
  }
  return;
};

defineExpose({
  scroll,
});
</script>
