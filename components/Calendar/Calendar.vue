<template>
  <div class="w-[13.5rem] p-3">
    <div class="flex justify-between">
      <button>&lt;</button>
      <p class="font-extrabold text-BLACK-2 text-xs">November 2022</p>
      <button>&gt;</button>
    </div>
    <div class="w-full -ml-2 mt-4">
      <table class="yartu-date-picker-table-calc-width yartu-date-picker-table">
        <thead>
          <tr>
            <th>su</th>
            <th>mo</th>
            <th>tu</th>
            <th>we</th>
            <th>th</th>
            <th>fr</th>
            <th>sa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in 5">
            <td v-for="y in 7">
              <button
                class="w-7 h-7 p-0 relative"
                :class="
                  x * y == 14 ? 'yartu-date-picker-table-current-date' : ''
                "
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
  props: {},
  computed: {},
};
</script>

<style>
.yartu-date-picker-table-calc-width {
  width: calc(100% + 16px);
}
.yartu-date-picker-table > table > thead > tr > th {
  @apply font-semibold capitalize text-BLACK-2 text-xs;
}
.yartu-date-picker-table > table > tbody > tr > td {
  @apply relative
    text-BLACK-2 text-xs text-center
    w-7 h-7;
}

.yartu-date-picker-table-current-date:after {
  @apply absolute
    w-1 h-1
    rounded-full
    bottom-[2px] left-[14px] bg-BLUE;
  content: '';
}
</style>
