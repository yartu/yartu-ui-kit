<template>
  <div class="overflow-auto mt-6 mb-24 px-7 box-border" style="max-height: calc(100vh - 21.5rem)">
    <div class="flex flex-col w-full">
      <h1 class="flex items-center gap-3 sticky z-1 top-0 bg-white font-bold text-2xl text-BLACK-2 pb-7">
        <y-icon v-if="dialogIcon" :name="`yi ${ dialogIcon } ${ dialogColor }`"></y-icon>
        {{ title }}
      </h1>
      <p>
        {{ subtitle }}
      </p>
      <y-form v-if="form" ref="yartuDialogForm" name="dialog-form" class="flex flex-col gap-5 mt-2">
        <y-input helper v-model="form.model" :label="form.label" :placeholder="form.placeholder" :rules="form.rules"></y-input>
      </y-form>
    </div>
    <div
      class="absolute bottom-0 z-1 inset-x-0 bg-LIGHTBLUE-9 flex flex-wrap items-center justify-end gap-4 px-7 py-4 rounded-b-lg"
    >
      <y-button v-if="showCancelButton" secondary size="lg" @click="$emit('close')">
        {{ cancelButton }}
      </y-button>
      <y-button
        v-for="(action, index) in actionButtons"
        :key="index"
        :class="action.color"
        @click="clickAction(action.handler)"
        primary
        size="lg"
      >
        {{ action.text }}
      </y-button>
    </div>
  </div>
</template>
<script>

import Button from '../Button/Button.vue';

export default {
  name: 'y-dialog',
  props: {
    title: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    maxWidth: {
      type: String,
      default: '404px',
    },
    icon: {
      type: String,
      required: false,
    },
    minWidth: {
      type: String,
      default: '404px',
    },
    form: {
      type: Object,
      required: false,
    },
    cancelButton: {
      type: String,
      required: false,
      default: 'Cancel',
    },
    closableButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
    actionButtons: {
      type: Array,
      required: false,
      default: () => [],
    },
    showCancelButton: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    dialogIcon() {
      if (this.icon) {
        return this.icon;
      }
      const icons = {
        warning: 'yi-alert',
        danger: 'yi-spam',
        info: 'yi-info',
        success: 'yi-check',
      };
      if (this.type) {
        return icons[this.type] || false;
      }
      return false;
    },
    dialogColor() {
      if (this.color) {
        return this.color;
      }
      const defaultColor = 'text-BLUE';
      const colors = {
        warning: '!text-YELLOW',
        danger: '!text-RED',
        info: '!text-BLUE',
        success: '!text-GREEN',
      };
      
      if (this.type) {
        return colors[this.type] || defaultColor;
      }
      return defaultColor;
    },
  },
  methods: {
    clickAction(handler) {
      if (this.form) {
        if (this.$refs.yartuDialogForm.validate()) {
          handler(this.form.model);
          this.$emit('close');
        }
      } else {
        handler();
        this.$emit('close');
      }
    }
  },
  components: {
    'y-button': Button,
  },
  emits: ['close'],
};
</script>
