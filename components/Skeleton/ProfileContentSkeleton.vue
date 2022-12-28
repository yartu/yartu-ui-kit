<template>
  <div role="status" class="w-full rounded animate-pulse">
    <div class="flex flex-wrap items-center space-x-3 bg-LIGHTBLUE-6 px-6 py-4">
      <div class="flex-1 flex">
        <div class="w-20 h-20 bg-BORDER rounded-full"></div>
        <div class="rounded-lg flex flex-col gap-2 ml-4">
          <div class="w-full h-4 rounded-lg bg-BORDER"></div>
          <div class="w-1/4 h-4 rounded-lg bg-BORDER"></div>
        </div>
        <div class="w-1/5 rounded-lg flex flex-col gap-2">
          <div class="w-full h-3 rounded-lg bg-BORDER"></div>
          <div class="w-1/4 h-3 rounded-lg bg-BORDER"></div>
        </div>
      </div>
      <div class="flex items-center w-full space-x-8 mt-6" v-for="i in 10">
        <div class="h-7 bg-BORDER rounded-full w-full"></div>
        <div class="h-7 bg-BORDER rounded-full w-full"></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
