<template>
  <nav :class="containerClass">
    <ol :class="itemClass">
      <li v-for="(crumb, index) in crumbs" :key="index">
        <button type="button" class="font-extrabold" @click="selected(crumb, index)">
          {{ crumb }}
        </button>
        <span
          v-if="!isLast(index)"
          :class="isSecondLast(index) ? 'text-BLACK-2' : ''"
        >
          /
        </span>
      </li>
      <li></li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'y-breadcrumb',
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isLast(index) {
      return index === this.crumbs.length - 1;
    },
    isSecondLast(index) {
      return index === this.crumbs.length - 2;
    },
    selected(crumb, index) {
      this.$emit('selected', { crumb, index });
    },
  },
  computed: {
    containerClass() {
      return ['w-full min-h-[28px]', 'font-extrabold', 'text-xl'];
    },
    itemClass() {
      return ['flex', 'gap-1', 'text-GREY-1', 'bread-crumb-items'];
    },
  },
};
</script>

<style>
.bread-crumb-items > li:last-child,
.bread-crumb-items > li:nth-last-child(2) {
  color: #394c66ff;
}
</style>
