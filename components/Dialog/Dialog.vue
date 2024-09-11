<template>
  <div
    class="overflow-auto mt-6 mb-24 px-7 box-border transition-all duration-200"
    style="max-height: calc(100vh - 21.5rem)"
  >
    <div class="flex flex-col w-full">
      <slot>
        <h1 class="flex items-center gap-3 sticky z-1 top-0 bg-white font-bold text-2xl text-BLACK-2 pb-7">
          <y-icon v-if="dialogIcon" :name="`yi ${dialogIcon} ${dialogColor}`"></y-icon>
          {{ title }}
        </h1>
        <p v-html="subtitle"></p>
        <y-form v-if="form" ref="yartuDialogForm" name="dialog-form" class="flex flex-col gap-5 mt-2">
          <y-text-area
            v-if="form.type && form.type === 'text-area'"
            id="dialog-text-area"
            :title="form.title"
            :placeholder="form.placeholder"
            :rules="form.rules"
            :max-length="1200"
            v-model="form.model"
            resize="vertical"
          >
          </y-text-area>
          <y-input
            v-else
            ref="yartuDialogFormInput"
            helper
            v-model="form.model"
            :label="form.label"
            :placeholder="form.placeholder"
            :rules="form.rules"
          ></y-input>
        </y-form>
      </slot>
    </div>
    <div
      v-if="!hideFooter"
      class="absolute bottom-0 z-1 inset-x-0 bg-LIGHTBLUE-9 flex flex-wrap items-center justify-end gap-4 px-7 py-4 rounded-b-lg"
    >
      <Button :disabled="isLoading" v-if="showCancelButton" secondary size="lg" @click="$emit('close')">
        {{ cancelButton || t('Buttons.cancel') }}
      </Button>
      <Button
        v-for="(action, index) in actionButtons"
        :key="index"
        :class="[action.color, enterController ? 'scale-110' : '']"
        @click="clickAction(action.handler)"
        primary
        size="lg"
        :loading="isLoading"
        :disabled="isLoading"
      >
        {{ action.text }}
      </Button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'y-dialog',
};
</script>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Button from '../Button/Button.vue';
import { t } from '../../locales';

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
    default: '',
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
    default: null,
  },
  closableButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableEnter: {
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
  autoClose: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  hideFooter: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const yartuDialogForm = ref();
const yartuDialogFormInput = ref();
const emit = defineEmits(['close']);
const isLoading = ref(false);
const enterController = ref(false);

const dialogIcon = computed(() => {
  if (props.icon) {
    return props.icon;
  }
  const icons = {
    warning: 'yi-alert',
    danger: 'yi-spam',
    info: 'yi-info',
    success: 'yi-check',
  };
  if (props.type) {
    return icons[props.type] || false;
  }
  return false;
});
const dialogColor = computed(() => {
  if (props.color) {
    return props.color;
  }
  const defaultColor = 'text-BLUE';
  const colors = {
    warning: '!text-YELLOW',
    danger: '!text-RED',
    info: '!text-BLUE',
    success: '!text-GREEN',
  };

  if (props.type) {
    return colors[props.type] || defaultColor;
  }
  return defaultColor;
});

const closeDialog = () => {
  emit('close');
};
const loadingStatus = (status) => {
  isLoading.value = status;
};
const clickAction = (handler) => {
  if (props.form) {
    if (yartuDialogForm.value.validate()) {
      handler(props.form.model, closeDialog, loadingStatus);
      if (props.autoClose) {
        emit('close');
      }
    }
  } else {
    handler(closeDialog, loadingStatus);
    if (props.autoClose) {
      emit('close');
    }
  }
};

const keypress = (e) => {
  if (e.key === 'Enter' && !props.disableEnter) {
    let index = props.actionButtons.findIndex((a) => a.type === 'confirm');
    if (index === -1) {
      clickAction(props.actionButtons[props.actionButtons.length - 1].handler);
    } else {
      clickAction(props.actionButtons[index].handler);
    }
  }
  if (e.key === 'Enter' && props.disableEnter) {
    enterController.value = true;
    setTimeout(() => {
      enterController.value = false;
    }, 100);
  }
};

onMounted(() => {
  window.addEventListener('keyup', keypress);
  if (yartuDialogFormInput.value && yartuDialogFormInput.value !== null) {
    yartuDialogFormInput.value.focus();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', keypress);
});
</script>
