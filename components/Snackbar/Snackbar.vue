<template>
  <div :class="snackbarContainer">
    <div>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4.5" y="4.5" width="27" height="27" rx="13.5" fill="#1F2938" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.7957 13.1746C26.3897 13.7522 26.4029 14.7018 25.8254 15.2957L17.8026 23.5457C17.5171 23.8394 17.1239 24.0035 16.7144 23.9999C16.3048 23.9964 15.9145 23.8256 15.6341 23.5271L11.6568 19.2938C11.0896 18.69 11.1192 17.7407 11.7229 17.1735C12.3267 16.6062 13.276 16.6358 13.8432 17.2396L16.746 20.3292L23.6746 13.2043C24.2522 12.6103 25.2018 12.5971 25.7957 13.1746Z"
          fill="white"
        />
        <rect
          x="4.5"
          y="4.5"
          width="27"
          height="27"
          rx="13.5"
          stroke="#1F2938"
          stroke-width="3"
        />
      </svg>
    </div>
    <slot></slot>
    <div class="flex flex-wrap gap-2 ml-auto min-w-fit">
      <button
        class="subtitle-4 !text-white hover:underline"
        v-if="this.action"
        @click="this.action.handler(close)"
      >
        {{ action.text }}
      </button>
      <button
        v-if="closable"
        @click="this.close"
        class="w-9 h-9 rounded-full hover:bg-BLACKOVERLAY flex items-center justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z"
            :fill="iconColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967Z"
            :fill="iconColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-snackbar',
  props: {
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 4000,
    },
    iconColor: {
      type: String,
      required: false,
      default: '#FFF',
    },
    finish: {
      type: Function,
      required: false,
    },
    action: {
      type: Object,
      required: false,
    },
  },
  created() {
    setTimeout(() => {
      if (this.finish) {
        this.finish();
      }
      this.$emit('close', this);
    }, this.duration);
  },
  methods: {
    close() {
      this.$emit('close', this);
    },
  },
  computed: {
    snackbarContainer() {
      return [
        'flex',
        'gap-3',
        'items-center',
        'w-full',
        'px-4 py-3',
        'text-white',
        'rounded-xl',
        'bg-BLACK-1',
        'overflow-hidden',
        'transition-all duration-300',
        {
          '!bg-RED': this.type === 'danger',
          '!bg-GREEN': this.type === 'success',
          '!bg-ORANGE': this.type === 'warning',
        },
      ];
    },
  },
};
</script>
