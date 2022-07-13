<template>
  <div class="inline-block">
    <svg :width="width" :height="height" :viewBox="'0 0 ' + viewPortX + ' ' + viewPortY" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path :d="'M0,' + viewPortY + 'a1,1 0 0,1 ' + calcDiameter + ',0'" fill="transparent" :stroke="ringBgColor"
        :stroke-width="stroke" />
      <path :d="'M0,' + viewPortY + 'a1,1 0 0,1 ' + calcDiameter + ',0'" fill="transparent"
        :stroke-dasharray="circumference + ' ' + circumference" :stroke-dashoffset="fromValue" :stroke="ringColor"
        :stroke-width="stroke" stroke-linecap="round" />
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
  data() {
    return {
      toValue: 0.0,
      fromValue: 0.0,
      viewPortX: 0,
      viewPortY: 0,
      width: 0,
      height: 0,
      flag: true,
    };
  },
  props: {
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
  },
  computed: {
    ringContentClass() {
      return [
        'text-gray-600',
        'text-center',
      ];
    },

    ringTitleClass() {
      return ['text-xl font-extrabold text-BLACK-2'];
    },

    ringTextClass() {
      return ['text-2xs text-GREY-1', 'font-medium'];
    },

    calcDiameter() {
      return this.radius * 2;
    },
    circumference() {
      return Math.floor(Math.PI * this.radius);
    },
    strokeDashoffset() {
      return parseInt(this.circumference - (this.progress / 100) * this.circumference)
    },
  },
  mounted() {
    this.fromValue = this.circumference;
    this.toValue = this.strokeDashoffset;
    this.viewPortX = this.radius * 2;
    this.viewPortY = parseInt(this.radius) + this.stroke / 2;
    this.width = (this.radius * 2) + this.stroke;
    this.height = this.radius;
    
    this.animate();
  },
  methods: {
    animate() {
      if (this.fromValue >= this.toValue) {
        this.fromValue--;
        setTimeout(this.animate, 1);
      }
    },
  },
};
</script>
