<template>
  <div role="status" class="w-full animate-pulse">
    <div
      class="flex flex-wrap items-center rounded-lg gap-7 bg-LIGHTBLUE-6 p-4"
    >
      <div class="flex-1 flex">
        <div class="w-20 h-20 bg-BORDER rounded-full"></div>
        <div class="w-1/5 rounded-lg flex flex-col gap-2">
          <div class="w-full h-3 rounded-lg bg-BORDER"></div>
          <div class="w-1/4 h-3 rounded-lg bg-BORDER"></div>
        </div>
      </div>
      <hr class="w-full" />
      <div class="flex flex-col items-center w-full gap-7" v-for="i in 3">
        <div class="flex gap-4 flex-wrap w-full">
          <div
            class="w-1/2-gap-4 h-5 rounded-full bg-BORDER"
            v-for="i in 6"
          ></div>
        </div>
        <hr class="w-full" v-if="i !== 3" />
      </div>
    </div>
  </div>
</template>
<script setup></script>
