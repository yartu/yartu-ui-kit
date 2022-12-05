<template>
  <!-- :class="queue.middle.length > 0 ? 'fixed inset-0 z-20 bg-BLACKOVERLAY':''" -->
  <teleport to="body">
    <div ref="yartuNotifyContainer">
      <YartuTransitions
        v-for="(position, index) in positions"
        :key="index"
        :top="position.top"
        :right="position.right"
        :bottom="position.bottom"
        :left="position.left"
        :center="position.center"
        :middle="position.middle"
      >
        <component
          :is="item.component"
          :key="item.id"
          v-for="item in queue[position.value]"
          v-bind="item"
          v-html="item.title"
          @close="removeItem(position.value, item.id)"
        >
        </component>
      </YartuTransitions>
      <div>
        <Modal
          :closable="dialog.closable"
          v-on="dialog.emits"
          v-for="(dialog, index) in dialogs"
          :key="index"
          v-model="dialog.open"
          max-width="32rem"
          min-width="32rem"
        >
          <Dialog v-bind="dialog" @close="removeDialog(dialog.id)"> </Dialog>
        </Modal>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import YartuTransitions from './YartuTransitions.vue';
import { ref, shallowRef, onMounted } from 'vue';
import { useEventBus } from '@vueuse/core';
import { Snackbar } from '../Snackbar';
import { Toast } from '../Toast';
import { Dialog } from '../Dialog';
import { Modal } from '../Modal';

const bus = useEventBus('yartuNotify');
const snacbarComp = shallowRef(Snackbar);
const toastComp = shallowRef(Toast);
const dialogComp = shallowRef(Dialog);
const defaultPosition = 'top-right';

const positions = ref([
  {
    top: true,
    center: true,
    value: 'top-center',
  },
  {
    top: true,
    right: true,
    value: 'top-right',
  },
  {
    bottom: true,
    right: true,
    value: 'bottom-right',
  },
  {
    center: true,
    bottom: true,
    value: 'center-bottom',
  },
  {
    bottom: true,
    left: true,
    value: 'bottom-left',
  },
  {
    top: true,
    left: true,
    value: 'top-left',
  },
  {
    middle: true,
    value: 'middle',
  },
]);

const queue = ref({
  'top-center': [],
  'top-right': [],
  'bottom-right': [],
  'center-bottom': [],
  'bottom-left': [],
  'top-left': [],
  center: [],
});

const dialogs = ref([]);

const removeItem = (from, itemId) => {
  queue.value[from] = queue.value[from].filter((f) => f.id !== itemId);
};

const removeDialog = (itemId) => {
  dialogs.value = dialogs.value.filter((f) => f.id !== itemId);
};

const listener = (notifyType, options = {}) => {
  if (notifyType === 'clear') {
    for (const queueNotify in queue.value) {
      queue.value[queueNotify] = [];
      dialogs.value = [];
    }
    return true;
  }

  let position = options.position || defaultPosition;
  const uniqueID = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  options.id = uniqueID;

  if (notifyType === 'dialog') {
    options.component = dialogComp;
    options.open = true;
    dialogs.value.push(options);
    return true;
  } else if (notifyType === 'snackbar') {
    options.component = snacbarComp;
  } else if (notifyType === 'toast') {
    options.component = toastComp;
  }
  queue.value[position].push(options);
};

onMounted(() => {
  const unsubscribe = bus.on(listener);
});
</script>
