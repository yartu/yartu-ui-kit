<script>

import { validate } from './validations';

export default {
  name: 'formItem',
  inject: {
    yartuForm: {
      from: 'yartuForm',
      default: () => {},
    },
  },
  provide: {
    'form-item': this,
  },
  data: () => ({
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
      this.yartuForm(this);
    } catch {
      // This input not have a form parent.
    }
  },
  methods: {
    validate() {
      if (!this.ignoreValid) {
        this.errors = [];
        const value = this.modelValue;
        const valid = validate(this.rules, value);
        if (valid !== true) {
          this.errors.push(valid);
        }
        return valid;
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
