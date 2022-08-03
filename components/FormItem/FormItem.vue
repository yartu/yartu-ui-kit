<script>

import * as VALIDATIONS from './validations';

export default {
  name: 'formItem',
  inject: ['yartuForm'],
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
        let valid = true;
        for (let rule of this.rules) {
          if (typeof rule === 'function') {
            const isValid = rule(value);
            if (isValid !== true) {
              valid = isValid;
              break;
            }
          } else if (typeof rule === 'string' && VALIDATIONS.default[rule]) {
            const functions = VALIDATIONS.default[rule];
            for (let ruleFunction of functions) {
              const isValid = ruleFunction(value);
              if (isValid !== true) {
                valid = isValid;
                break;
              }
            }
          } else {
            console.error('Yartu Ui Kit, form validation don\'t accept to: ', rule);
          }
        }
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
