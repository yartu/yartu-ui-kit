<template>
  <form @submit.prevent="submit">
    <slot :errors="errors"> </slot>
  </form>
</template>

<script>
export default {
  name: 'y-form',
  emits: ['yartu-submit'],
  data: () => ({
    errors: [],
    formItems: [],
  }),
  provide() {
    return {
      yartuFormRegister: this.register,
      yartuFormUnRegiser: this.unregister,
    };
  },
  methods: {
    register(formItem) {
      this.formItems.push(formItem);
    },
    unregister(formItem) {
      this.formItems = this.formItems.filter((f) => f.formItemId !== formItem.formItemId);
    },
    resetFormItems() {
      this.formItems = [];
    },
    validate() {
      let valid = true;
      this.errors = [];
      for (let formItem of this.formItems) {
        const isValid = formItem.validate();
        if (isValid !== true) {
          this.errors.push(isValid);
          valid = false;
        }
      }
      return valid;
    },
    submit(e) {
      e.preventDefault();
      this.$emit('yartu-submit');
    },
  },
};
</script>
