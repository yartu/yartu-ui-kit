<template>
  <teleport to="body">
    <div
      ref="yartuNotifyContainer"
    >
      <YartuTransitions
        v-for="(position, index) in positions"
        :key="index"
        :top="position.top"
        :right="position.right"
        :bottom="position.bottom"
        :left="position.left"
        :center="position.center"
      >
        <component
          :is="item.component"
          :key="item.id"
          v-for="(item, cIndex) in queue[position.value]"
          v-bind="item"
          @close="removeItem(position.value, item.id)"
        >
          {{ item.title }}
        </component>
      </YartuTransitions>
    </div>
  </teleport>
</template>
<script setup>

import YartuTransitions from './YartuTransitions.vue';
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
import { useEventBus } from '@vueuse/core';
import { Snackbar } from '../Snackbar';
import { Toast } from '../Toast';

const bus = useEventBus('yartuNotify');
const snacbarComp = shallowRef(Snackbar);
const toastComp = shallowRef(Toast);
const defaultPosition = 'top-right';

const positions = ref([
  {
    top: true,
    center: true,
    value: 'top-center'
  },
  {
    top: true,
    right: true,
    value: 'top-right'
  },
  {
    bottom: true,
    right: true,
    value: 'bottom-right'
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
  }
]);

const queue = ref({
  'top-center': [],
  'top-right': [],
  'bottom-right': [],
  'center-bottom': [],
  'bottom-left': [],
  'top-left': [],
});

const removeItem = (from, itemId) => {
  queue.value[from] = queue.value[from].filter((f) => f.id !== itemId);
}

const listener = (notifyType, options = {}) => {
  
  if (notifyType === 'clear') {
    for (const queueNotify in queue.value) {
      queue.value[queueNotify] = [];
    }
    return true;
  }

  const position = options.position || defaultPosition;

  if (notifyType === 'snackbar') {
    options.component = snacbarComp;
  } else if (notifyType === 'toast') {
    options.component = toastComp;
  }
  const uniqueID = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  options.id = uniqueID;
  queue.value[position].push(options);
};

onMounted(() => {
  const unsubscribe = bus.on(listener);
});

</script>
