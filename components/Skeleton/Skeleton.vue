<template>
  <yartu-card-skeleton
    v-if="type.includes('yartu-card')"
    :skeletonCount="skeletonCount"
  ></yartu-card-skeleton>
  <repo-folder-skeleton
    v-if="type.includes('repo-folder')"
    :skeletonCount="skeletonCount"
  ></repo-folder-skeleton>
  <drive-client-skeleton
    v-if="type.includes('drive-client')"
    :skeletonCount="skeletonCount"
  ></drive-client-skeleton>
  <table-item-skeleton
    v-if="type.includes('table-item')"
    :skeletonCount="skeletonCount"
  ></table-item-skeleton>
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
  <email-widget-skeleton
    v-else-if="type.includes('email-widget')"
    :skeletonCount="skeletonCount"
  >
  </email-widget-skeleton>
  <note-widget-skeleton
    v-else-if="type.includes('note-widget')"
    :skeletonCount="skeletonCount"
  >
  </note-widget-skeleton>
  <sticky-note-skeleton
    v-else-if="type.includes('sticky-note')"
    :skeletonCount="skeletonCount"
  >
  </sticky-note-skeleton>
  <calendar-widget-skeleton
    v-else-if="type.includes('calendar-widget')"
    :skeletonCount="skeletonCount"
  >
  </calendar-widget-skeleton>
  <conference-widget-skeleton 
    v-else-if="type === 'conference-widget'">
  </conference-widget-skeleton>
  <contact-widget-skeleton 
    v-else-if="type === 'contact-widget'">
  </contact-widget-skeleton>
  <weather-widget-skeleton 
    v-else-if="type === 'weather-widget'">
  </weather-widget-skeleton>
  <navbar-search-skeleton 
    v-else-if="type.includes('navbar-search')"
    :skeletonCount="skeletonCount"
    >
  </navbar-search-skeleton>
  <conference-card-skeleton 
    v-else-if="type.includes('conference-card')"
    :skeletonCount="skeletonCount"
    >
  </conference-card-skeleton>
  <note-content-skeleton 
    v-else-if="type.includes('note-content')"
    :skeletonCount="skeletonCount"
    >
  </note-content-skeleton>
</template>

<script>
export default {
  name: "y-skeleton",
};
</script>

<script setup>
import { computed } from "vue";
import YartuCardSkeleton from "./YartuCardSkeleton.vue";
import RepoFolderSkeleton from "./RepoFolderSkeleton.vue";
import TableItemSkeleton from "./TableItemSkeleton.vue";
import TitleSkeleton from "./TitleSkeleton.vue";
import EmailContentSkeleton from "./EmailContentSkeleton.vue";
import EmailListSkeleton from "./EmailListSkeleton.vue";
import ListItemSkeleton from "./ListItemSkeleton.vue";
import ProfileContentSkeleton from "./ProfileContentSkeleton.vue";
import EmailWidgetSkeleton from "./EmailWidgetSkeleton.vue";
import NoteWidgetSkeleton from "./NoteWidgetSkeleton.vue";
import StickyNoteSkeleton from "./StickyNoteSkeleton.vue";
import CalendarWidgetSkeleton from "./CalendarWidgetSkeleton.vue";
import ConferenceWidgetSkeleton from "./ConferenceWidgetSkeleton.vue";
import ContactWidgetSkeleton from "./ContactWidgetSkeleton.vue";
import WeatherWidgetSkeleton from "./WeatherWidgetSkeleton.vue";
import NavbarSearchSkeleton from "./NavbarSearchSkeleton.vue";
import DriveClientSkeleton from "./DriveClientSkeleton.vue";
import ConferenceCardSkeleton from "./ConferenceCardSkeleton.vue";
import NoteContentSkeleton from "./NoteContentSkeleton.vue";

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
