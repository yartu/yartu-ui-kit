<template>
  <span :class="chipContainerClass">
    <div class="chip-avatar">
      <!-- <img src="../assets/shakira.jpg" alt /> -->
      <p class="chip-avatar-text">öŞ</p>
    </div>
    <p class="chip-text">Ömer Aziz ŞAHİN</p>
    <div class="chip-close-btn">
      <button>x</button>
    </div>
  </span>
</template>

<script>
export default {
  name: 'y-chip',
  props: {},
  computed: {
    chipContainerClass() {
      return [
        'border border-BORDER',
        'rounded-lg',
        'relative',
        'cursor-pointer',
        'p-1',
        'h-8',
        'inline-flex items-center',
        'text-BLACK-2',
        'bg-LIGHTBLUE-6',
      ];
    },
  },
};
</script>
<style>
.chip {
  @apply;
}

.chip-avatar {
  @apply rounded-full
    w-6 h-6
    flex items-center justify-center
    overflow-hidden
    bg-TEAL;
}
.chip-text {
  @apply text-xs
    py-1 pr-2 pl-1
    font-semibold;
}
.chip-avatar-text {
  @apply text-[10px]
    font-semibold
    text-center
    text-WHITE
    uppercase;
}
.chip-close-btn {
  @apply w-5 h-5
    flex justify-center items-center
    rounded-full
    border-BORDER
    hover:border
    active:bg-BORDER;
}
</style>
