const VALIDATIONS = {
  REQUIRED: [(v) => !!v || (v && !!v.trim()) || 'Required'],
  EMAIL: [
    (v) => !!v || 'E-mail is required',
    (v) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
  ],
  USERNAME: [
    (v) => !!v || 'Username is required',
    (v) => /[a-z0-9_.]+$/.test(v) || 'Username be valid',
  ],
  PASSWORD: [
    (v) => !!v || 'Required',
  ],
  PASSWORD_CONFIRM: [
    (v) => !!v || 'Required',
  ],
  IPv4: [
    (v) => !!v || 'Required',
    (v) =>
      /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(v) ||
      'IP must be valid',
  ],
  MAX_LENGTH: [
    (v, param) => (!!v && !!v.trim() && v.trim().length < param) ||
      `This field should be max ${param}`,
  ],
  MIN_LENGTH: [
    (v, param) => !!v && (!!v.trim() && v.trim().length >= param) ||
      `This field should be min ${param}`,
  ],
  VALID_NAME: [
    (v) => (v && v[0] !== ' ') || 'Not start with space',
    (v) =>
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(v) ||
      "Name is not valid, don't accept special chracrer (.,!?*, etc)",
    (v) => !/  +/g.test(v) || "This field don't aceept repeated space",
  ],
};

const validate = (rules, value) => {
  let valid = true;
  for (let rule of rules) {
    if (typeof rule === 'function') {
      const isValid = rule(value);
      if (isValid !== true) {
        valid = isValid;
        break;
      }
    } else if (typeof rule === 'string') {
      let ruleName = rule;
      let ruleParams = [];

      if (rule.includes(':')) {
        const splitName = rule.split(':');
        ruleName = splitName[0];
        ruleParams = splitName.splice(1);
      }

      if (!VALIDATIONS[ruleName]) {
        continue;
      }

      const functions = VALIDATIONS[ruleName];
      for (let ruleFunction of functions) {
        const isValid = ruleFunction(value, ruleParams);
        if (isValid !== true) {
          valid = isValid;
          break;
        }
      }
    } else {
      console.error("Yartu Ui Kit, form validation don't accept to: ", rule);
    }
  }
  return valid;
};

export { validate };

export default {
  ...VALIDATIONS,
  validate,
};
