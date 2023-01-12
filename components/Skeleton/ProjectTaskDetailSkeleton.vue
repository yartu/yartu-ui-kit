<template>
  <div class="flex flex-col gap-7 gap-6 w-full h-full animete-pulse">
    <div class="w-3/5 h-6 bg-BORDER rounded-full"></div>
    <div class="flex items-center gap-10">
      <div class="flex flex-col gap-3">
        <div class="w-16 h-3 bg-BORDER rounded-full"></div>
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-BORDER rounded-full"></div>
          <div class="w-20 h-3 bg-BORDER rounded-full"></div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="w-16 h-3 bg-BORDER rounded-full"></div>
        <div class="flex items-center gap-2">
          <div class="w-32 h-4 bg-BORDER rounded-full"></div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="w-16 h-3 bg-BORDER rounded-full"></div>
        <div class="flex items-center gap-2">
          <div class="w-24 h-3 bg-BORDER rounded-full"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="w-16 h-3 bg-BORDER rounded-full"></div>
      <div class="flex items-center gap-2">
        <div v-for="i in 4" class="w-20 h-3 bg-BORDER rounded-full"></div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="w-16 h-3 bg-BORDER rounded-full"></div>
      <div class="flex flex-col items-start justify-start gap-1">
        <div class="w-full h-3 bg-BORDER rounded-full"></div>
        <div class="w-11/12 h-3 bg-BORDER rounded-full"></div>
        <div class="w-3/12 h-3 bg-BORDER rounded-full"></div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="w-16 h-3 bg-BORDER rounded-full"></div>
      <div class="flex items-center gap-2 flex-wrap">
        <div v-for="i in 4" class="w-24 h-16 bg-BORDER rounded-lg"></div>
        <repo-folder-skeleton :skeletonCount="2"></repo-folder-skeleton>
      </div>
    </div>
  </div>
</template>
<script setup>
import RepoFolderSkeleton from "./RepoFolderSkeleton.vue";
</script>
