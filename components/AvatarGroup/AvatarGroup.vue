<template>
  <div :class="avatarGroup">
    <div class="y-avatar-group-item flex items-center justify-center" v-for="item in shownAvatarList" :key="item">
      <slot name="content" :item="item"> </slot>
    </div>
    <div v-if="plusAvatarCount > 0" class="y-avatar-group-item flex items-center justify-center">
      <y-avatar @click.stop="$emit('showMore')" :color="plusAvatarColor" size="xs" class="cursor-pointer" >
        <span>+{{ plusAvatarCount }}</span>
      </y-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-avatar-group',
};
</script>

<script setup>
import { ref, computed, onMounted } from 'vue';
import colors from '../../utils/colors';

const props = defineProps({
  avatarList: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: 'md',
  },
  max: {
    type: Number,
    default: 4,
  },
  color: {
    type: String,
    default: 'blue',
  },
});

const plusAvatarCount = ref(0);
const plusAvatarColor = ref();

const shownAvatarList = computed(() => props.avatarList.slice(0, props.max - 1))

const setPlusAvatarColor = () => {
  if (!props.color.includes('#') && !props.color.includes('r') && !props.color.includes('h')) {
    plusAvatarColor.value = colors[props.color].base;
  } else {
    plusAvatarColor.value = props.color;
  }
};

onMounted(() => {
  if (props.avatarList.length > props.max) {
    plusAvatarCount.value = Math.abs(props.avatarList.length - props.max + 1);
  }
  if (plusAvatarCount.value > 0) {
    setPlusAvatarColor();
  }
});

const avatarGroup = computed(() => {
  return [
    'y-avatar-group',
    'flex',
    'items-center',
    {
      'y-avatar-group-xs': props.size == 'xs',
      'y-avatar-group-sm': props.size == 'sm',
    },
  ];
});
</script>

<style>
/* TODO :: with bagde will add */
.y-avatar-group .y-avatar-group-item + .y-avatar-group-item {
  margin-left: -1rem;
}

.y-avatar-group-sm .y-avatar-group-item + .y-avatar-group-item {
  margin-left: -0.5rem;
}

.y-avatar-group-xs .y-avatar-group-item + .y-avatar-group-item {
  margin-left: -0.25rem;
}

.y-avatar-group .y-avatar-group-item .y-avatar {
  border: 2px solid #ffffff;
}
</style>
