<template>
  <div class="p-3">
    <div class="flex justify-between items-center">
      <button class="hover:bg-BLACKOVERLAY rounded-full w-7 h-7">&lt;</button>
      <p class="font-extrabold text-BLACK-2 text-xs">November 2022</p>
      <button class="hover:bg-BLACKOVERLAY rounded-full w-7 h-7">&gt;</button>
    </div>
    <div class="w-full -ml-2 mt-4">
      <table class="yartu-date-picker-table-calc-width">
        <thead>
          <tr>
            <th :class="thClass">s</th>
            <th :class="thClass">m</th>
            <th :class="thClass">t</th>
            <th :class="thClass">w</th>
            <th :class="thClass">t</th>
            <th :class="thClass">f</th>
            <th :class="thClass">s</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in 5">
            <td v-for="y in 7" class="p-0">
              <button
                class=""
                :class="[
                  buttonClass,
                  x * y == 14
                    ? 'after:absolute after:w-1 after:h-1 after:rounded-full after:bottom-0.5 after:left-3.5 after:bg-BLUE'
                    : '',
                ]"
              >
                {{ x * y }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-calendar',
};
</script>

<script setup>
import { computed } from 'vue';

const thClass = computed(() => {
  return ['font-semibold capitalize text-BLACK-2 text-xs text-center'];
});

const buttonClass = computed(() => {
  return [
    'w-7 h-7 p-0 relative text-BLACK-2 text-xs text-center hover:bg-BLACKOVERLAY rounded-full',
  ];
});

const activeClass = computed(() => {
  return ['bg-BLUE !text-white'];
});
</script>

<style>
.yartu-date-picker-table-calc-width {
  width: calc(100% + 16px);
}
</style>
