<template>
  <div class="flex flex-col w-full">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full overflow-hidden align-middle">
        <table :aria-describedby="ariaDesc" :class="tableClass">
          <thead class="text-GREY-1 text-sm font-semibold">
            <slot name="thead"></slot>
          </thead>
          <tbody>
            <slot name="tbody"></slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-simple-table',
  data() {
    return {};
  },
  props: {
    ariaDesc: {
      type: String,
      default: '',
    },
  },
  computed: {
    tableClass() {
      return [
        'border-collapse',
        'table',
        'min-w-full',
        'items-center',
        'text-sm',
        'ltr:text-left rtl:text-right',
      ];
    },
  },
};
</script>

<style></style>
