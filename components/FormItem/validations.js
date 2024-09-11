import { t } from '../../locales';

const VALIDATIONS = {
  REQUIRED: [(v) => !!v || (v && !!v.trim()) || t('FormValidations.required_message')],
  EMAIL: [
    (v) => !!v || t('FormValidations.required_email_message'),
    (v) =>
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v,
      ) || t('FormValidations.valid_email_message'),
  ],
  VALID_EMAIL: [
    (v) =>
      !v ||
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v,
      ) ||
      t('FormValidations.valid_email_message'),
  ],
  USERNAME: [
    (v) => !!v || t('FormValidations.username_required_message'),
    (v) => /[a-z0-9_.]+$/.test(v) || t('FormValidations.username_be_valid_message'),
  ],
  URL: [
    (v) => !!v || t('FormValidations.url_required__message'),
    (v) =>
      /(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
        v,
      ) || t('FormValidations.valid_url_message'),
  ],
  URL_DOMAIN: [
    (v) => !!v || t('FormValidations.required_domain_message'),
    (v) =>
      /^((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
        v,
      ) || t('FormValidations.valid_domain_message'),
  ],
  PASSWORD: [(v) => !!v || t('FormValidations.required_message')],
  PASSWORD_CONFIRM: [(v) => !!v || t('FormValidations.required_message')],
  VALID_NUMBER: [(v) => Number.isInteger(v) || t('FormValidations.not_valid_number_message')],
  IPv4: [
    (v) => !!v || t('FormValidations.required_message'),
    (v) => /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(v) || t('FormValidations.valid_ip_message'),
  ],
  MAX_LENGTH: [
    (v, param) =>
      (!!v && !!v.trim() && v.trim().length < param) || t('FormValidations.should_be_max_message', { length: param }),
  ],
  MIN_LENGTH: [
    (v, param) =>
      (!!v && !!v.trim() && v.trim().length >= param) || t('FormValidations.should_be_min_message', { length: param }),
  ],
  LENGTH: [
    (v, param) =>
      (!!v && !!v.trim() && v.trim().length == param) ||
      t('FormValidations.should_be_length_message', { length: param }),
  ],
  VALID_NAME: [
    (v) => (v && v[0] !== ' ') || t('FormValidations.not_start_with_space_message'),
    (v) => !/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/.test(v) || t('FormValidations.name_is_not_valid_message'),
    (v) => !/  +/g.test(v) || t('FormValidations.not_accept_repeated_space_message'),
  ],
  FOLDER_FILE_NAME: [
    (v) => (v && v[0] !== ' ') || t('FormValidations.not_start_with_space_message'),
    (v) => !/[*':"\\|<>\/?]+/.test(v) || t('FormValidations.name_is_not_valid_message'),
  ],
};

const validate = (rules, value, objectKey = false) => {
  let valid = true;
  let valueList = [];

  if (Array.isArray(value)) {
    valueList = value;
  } else {
    valueList = [value];
  }

  for (let val of valueList) {
    if (val && typeof val === 'object') {
      if (objectKey) {
        val = val[objectKey];
      } else if (val.email) {
        val = val.email;
      }
    }

    for (let rule of rules) {
      if (typeof rule === 'function') {
        const isValid = rule(val);
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
          const isValid = ruleFunction(val, ruleParams);
          if (isValid !== true) {
            valid = isValid;
            break;
          }
        }
      } else {
        console.error("Yartu Ui Kit, form validation don't accept to: ", rule);
      }
    }
  }

  return valid;
};

export { validate };

export default {
  ...VALIDATIONS,
  validate,
};
