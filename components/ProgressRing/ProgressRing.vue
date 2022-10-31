<template>
  <div class="inline-block">
    <svg
      :width="width"
      :height="height"
      :viewBox="'0 0 ' + viewPortX + ' ' + viewPortY"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :d="'M0,' + viewPortY + 'a1,1 0 0,1 ' + calcDiameter + ',0'"
        fill="transparent"
        :stroke="ringBgColor"
        :stroke-width="stroke"
      />
      <path
        :d="'M0,' + viewPortY + 'a1,1 0 0,1 ' + calcDiameter + ',0'"
        fill="transparent"
        :stroke-dasharray="circumference + ' ' + circumference"
        :stroke-dashoffset="fromValue"
        :stroke="ringColor"
        :stroke-width="stroke"
        stroke-linecap="round"
      />
      <foreignObject x="0" :y="height - 34" :width="viewPortX" :height="height">
        <div :class="ringContentClass">
          <p :class="ringTitleClass">{{ title }}</p>
          <p :class="ringTextClass">{{ subtitle }}</p>
        </div>
      </foreignObject>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'y-progress-ring',
};
</script>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
  radius: {
    type: Number,
    default: 80,
  },
  progress: {
    type: Number,
    default: 52,
  },
  stroke: {
    type: Number,
    default: 12,
  },
  ringBgColor: {
    type: String,
    default: '#DBE4FF',
  },
  ringColor: {
    type: String,
    default: '#3663F2',
  },
  title: {
    type: String,
    default: '750MB',
  },
  subtitle: {
    type: String,
    default: 'of 1 GB used',
  },
});

const toValue = ref(0.0);
const fromValue = ref(0.0);
const viewPortX = ref(0);
const viewPortY = ref(0);
const width = ref(0);
const height = ref(0);

onMounted(() => {
  fromValue.value = circumference.value;
  toValue.value = strokeDashOffset.value;
  viewPortX.value = props.radius * 2;
  viewPortY.value = parseInt(props.radius) + props.stroke / 2;
  width.value = props.radius * 2 + props.stroke;
  height.value = props.radius;
  animate();
});

const animate = () => {
  if (fromValue.value >= toValue.value) {
    fromValue.value -= 1;
    setTimeout(animate, 1);
  }
};

const ringContentClass = computed(() => ['text-gray-600', 'text-center']);
const ringTitleClass = computed(() => ['text-xl font-extrabold text-BLACK-2']);
const ringTextClass = computed(() => ['text-2xs text-GREY-1', 'font-medium']);
const calcDiameter = computed(() => props.radius * 2);
const circumference = computed(() => Math.floor(Math.PI * props.radius));
const strokeDashOffset = computed(() =>
  parseInt(circumference.value - (props.progress / 100) * circumference.value, 10)
);

watch(
  () => props.progress,
  () => {
    fromValue.value = circumference.value;
    toValue.value = strokeDashOffset.value;
    animate();
  },
);
</script>
