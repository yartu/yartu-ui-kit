<script>

import { validate } from './validations';

export default {
  name: 'formItem',
  inject: {
    yartuFormRegister: {
      from: 'yartuFormRegister',
      default: () => {},
    },
    yartuFormUnRegiser: {
      from: 'yartuFormUnRegiser',
      default: () => {},
    },
  },
  provide: {
    'form-item': this,
  },
  data: () => ({
    formItemId: (Math.random() + 1).toString(36).substring(7),
    errors: [],
  }),
  props: {
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
    lazyOff: {
      type: Boolean,
      required: false,
      default: false,
    },
    ignoreValid: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  created() {
    try {
      this.yartuFormRegister(this);
    } catch {
      // This input not have a form parent.
    }
  },
  beforeUnmount() {
    try {
      this.yartuFormUnRegiser(this);
    } catch {
      // This input not have a form parent.
    }
  },
  methods: {
    validate() {
      if (!this.ignoreValid && this.rules?.length > 0) {
        this.errors = [];
        const value = this.modelValue;
        const valid = validate(this.rules, value);
        if (valid !== true) {
          this.errors.push(valid);
        }
        return valid;
      } else {
        return true
      }
    },
  },
  watch: {
    modelValue(val) {
      if (!this.lazyOff && this.rules && this.rules.length > 0) {
        this.validate();
      }
    },
  },
};
</script>
