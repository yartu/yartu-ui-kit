<template>
  <div v-if="type === 'list-all'" class="flex flex-col gap-16">
    yartu-card-skeleton
    <yartu-card-skeleton :skeletonCount="5"></yartu-card-skeleton>
    repo-folder-skeleton
    <repo-folder-skeleton :skeletonCount="5"></repo-folder-skeleton>
    drive-client-skeleton
    <drive-client-skeleton :skeletonCount="5"></drive-client-skeleton>
    table-item-skeleton
    <table-item-skeleton :skeletonCount="5"></table-item-skeleton>
    title-skeleton
    <title-skeleton :skeletonCount="5"></title-skeleton>
    email-list-skeleton
    <email-list-skeleton :skeletonCount="5"></email-list-skeleton>
    email-content-skeleton
    <email-content-skeleton :skeletonCount="5"></email-content-skeleton>
    profile-content-skeleton
    <profile-content-skeleton :skeletonCount="5"></profile-content-skeleton>
    list-item-skeleton
    <list-item-skeleton :skeletonCount="5"></list-item-skeleton>
    email-widget-skeleton
    <email-widget-skeleton :skeletonCount="5"></email-widget-skeleton>
    note-widget-skeleton
    <note-widget-skeleton :skeletonCount="5"></note-widget-skeleton>
    sticky-note-skeleton
    <sticky-note-skeleton :skeletonCount="5"></sticky-note-skeleton>
    calendar-widget-skeleton
    <calendar-widget-skeleton :skeletonCount="5"></calendar-widget-skeleton>
    conference-widget-skeleton
    <conference-widget-skeleton :skeletonCount="5"></conference-widget-skeleton>
    contact-widget-skeleton
    <contact-widget-skeleton :skeletonCount="5"></contact-widget-skeleton>
    weather-widget-skeleton
    <weather-widget-skeleton :skeletonCount="5"></weather-widget-skeleton>
    navbar-search-skeleton
    <navbar-search-skeleton :skeletonCount="5"></navbar-search-skeleton>
    conference-card-skeleton
    <conference-card-skeleton :skeletonCount="5"></conference-card-skeleton>
    note-content-skeleton
    <note-content-skeleton :skeletonCount="5"></note-content-skeleton>
    project-task-card
    <project-task-card-skeleton :skeletonCount="5"></project-task-card-skeleton>
    project-card-skeleton
    <project-card-skeleton :skeletonCount="5"></project-card-skeleton>
    project-task-detail
    <project-task-detail-skeleton
      :skeletonCount="5"
    ></project-task-detail-skeleton>
    project-header-skeleton
    <project-header-skeleton :skeletonCount="5"></project-header-skeleton>
    activity-skeleton
    <activity-skeleton :skeletonCount="5"></activity-skeleton>
    comment-skeleton
    <comment-skeleton :skeletonCount="5"></comment-skeleton>
    navigation-drawer-skeleton
    <navigation-drawer-skeleton :skeletonCount="5"></navigation-drawer-skeleton>
    uploading-item-skeleton
    <uploading-item-skeleton :skeletonCount="4"></uploading-item-skeleton>
  </div>
  <yartu-card-skeleton
    v-else-if="type.includes('yartu-card')"
    :skeletonCount="skeletonCount"
  ></yartu-card-skeleton>
  <repo-folder-skeleton
    v-else-if="type.includes('repo-folder')"
    :skeletonCount="skeletonCount"
  ></repo-folder-skeleton>
  <drive-client-skeleton
    v-else-if="type.includes('drive-client')"
    :skeletonCount="skeletonCount"
  ></drive-client-skeleton>
  <table-item-skeleton
    v-else-if="type.includes('table-item')"
    :skeletonCount="skeletonCount"
  ></table-item-skeleton>
  <title-skeleton
    v-else-if="type.includes('title')"
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
  <conference-widget-skeleton v-else-if="type === 'conference-widget'">
  </conference-widget-skeleton>
  <contact-widget-skeleton v-else-if="type === 'contact-widget'">
  </contact-widget-skeleton>
  <weather-widget-skeleton v-else-if="type === 'weather-widget'">
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
  <project-card-skeleton
    v-else-if="type.includes('project-card')"
    :skeletonCount="skeletonCount"
  ></project-card-skeleton>
  <project-task-card-skeleton
    v-else-if="type.includes('project-task-card')"
    :skeletonCount="skeletonCount"
  >
  </project-task-card-skeleton>
  <project-board-card-skeleton
    v-else-if="type.includes('project-board-card')"
    :skeletonCount="skeletonCount"
  >
  </project-board-card-skeleton>
  <project-task-detail-skeleton v-else-if="type === 'project-task-detail'">
  </project-task-detail-skeleton>
  <project-header-skeleton
    v-else-if="type.includes('project-header')"
    :skeletonCount="skeletonCount"
  >
  </project-header-skeleton>
  <activity-skeleton
    v-else-if="type.includes('activity')"
    :skeletonCount="skeletonCount"
  >
  </activity-skeleton>
  <comment-skeleton
    v-else-if="type.includes('comment')"
    :skeletonCount="skeletonCount"
  >
  </comment-skeleton>
  <navigation-drawer-skeleton
    v-else-if="type.includes('navigation-drawer')"
    :skeletonCount="skeletonCount"
  >
  </navigation-drawer-skeleton>
  <uploading-item-skeleton
    v-else-if="type.includes('uploading-item')"
    :skeletonCount="skeletonCount"
  >
  </uploading-item-skeleton>
  <thread-skeleton
  v-else-if="type === 'thread'"
  >
  </thread-skeleton>
  <loading-circular v-else-if="type === 'loading-circular'"> </loading-circular>
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
import ProjectTaskCardSkeleton from "./ProjectTaskCardSkeleton.vue";
import ProjectBoardCardSkeleton from "./ProjectBoardCardSkeleton.vue";
import ProjectCardSkeleton from "./ProjectCardSkeleton.vue";
import ProjectTaskDetailSkeleton from "./ProjectTaskDetailSkeleton.vue";
import ActivitySkeleton from "./ActivitySkeleton.vue";
import CommentSkeleton from "./CommentSkeleton.vue";
import NavigationDrawerSkeleton from "./NavigationDrawerSkeleton.vue";
import LoadingCircular from "./LoadingCircular.vue";
import ProjectHeaderSkeleton from "./ProjectHeaderSkeleton.vue";
import UploadingItemSkeleton from "./UploadingItemSkeleton.vue";
import ThreadSkeleton from "./ThreadSkeleton.vue";

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
