<template>
  <div :class="avatarGroup" ref="yAvatarGroup">
    <slot></slot>
  </div>
</template>

<script>
import colors from '../../utils/colors';
export default {
  name: 'y-avatar-group',
  data() {
    return {
      shownAvatar: 0,
    };
  },
  props: {
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
      default: 'red',
    },
  },
  computed: {
    avatarGroup() {
      return [
        'y-avatar-group',
        'flex',
        'items-center',
        {
          'y-avatar-group-sm': this.size == 'sm',
        },
      ];
    },
    getAvatar() {
      return this.$refs.yAvatarGroup;
    },
  },
  methods: {
    popAvatars() {
      this.getAvatar.removeChild(this.getAvatar.lastChild);
    },
    setPlusAvatar() {
      if (
        !this.color.includes('#') &&
        !this.color.includes('r') &&
        !this.color.includes('h')
      )
        this.getAvatar.lastChild.style.backgroundColor =
          colors[this.color].base;
      else this.getAvatar.lastChild.style.backgroundColor = this.color;
      this.getAvatar.lastChild.innerHTML = '+' + this.shownAvatar;
    },
  },
  mounted() {
    if (this.getAvatar.children.length > this.max) {
      this.shownAvatar = Math.abs(this.getAvatar.children.length - this.max);
    } else {
      this.shownAvatar = 0;
    }
    //eslint-disable-next-line
    for (var i = 0; i <= this.shownAvatar; i++) {
      this.popAvatars();
    }
    if (this.shownAvatar) {
      this.setPlusAvatar();
    }
  },
};
</script>

<style>
/* TODO :: with bagde will add */
.y-avatar-group > .y-avatar + .y-avatar {
  margin-left: -1rem;
}

.y-avatar-group-sm > .y-avatar + .y-avatar {
  margin-left: -0.5rem;
}

.y-avatar-group > .y-avatar {
  border: 2px solid #ffffff;
}
</style>
