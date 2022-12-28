<template>
  <title-skeleton
    v-if="type.includes('title')"
    :skeletonCount="skeletonCount"
  ></title-skeleton>
  <email-list-skeleton
    v-else-if="type.includes('email-list')"
    :skeletonCount="skeletonCount"
  ></email-list-skeleton>
  <email-content-skeleton
    v-else-if="type === 'email-content'"
  ></email-content-skeleton>
  <profile-content-skeleton
    v-else-if="type === 'profile-content'"
  ></profile-content-skeleton>
  <list-item-skeleton
    v-else-if="type.includes('list-item')"
    :skeletonCount="skeletonCount"
  >
  </list-item-skeleton>
</template>

<script>
export default {
  name: "y-skeleton",
};
</script>

<script setup>
import { computed } from "vue";
import TitleSkeleton from "./TitleSkeleton.vue";
import EmailContentSkeleton from "./EmailContentSkeleton.vue";
import EmailListSkeleton from "./EmailListSkeleton.vue";
import ListItemSkeleton from "./ListItemSkeleton.vue";
import ProfileContentSkeleton from "./ProfileContentSkeleton.vue";

// TODO : Add more template @aziz
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const skeletonCount = computed(() => {
  if (props.type.includes(":")) {
    const count = props.type.split(":")[1];
    return parseInt(count, 10);
  }
  return 1;
});
</script>
