const REQUIRED = [
  v => !!v.trim() || 'Required',
];

const EMAIL = [
  v => !!v || 'E-mail is required',
  v => /.+@.+/.test(v) || 'E-mail must be valid',
];

const IPv4 = [
  v => !!v || 'Required',
  v => /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(v) || 'IP must be valid',
];

const MAX_LENGTH = [
  (v, param) => (!!v.trim() && v.trim().length < param) || `This field shoul be max ${param}`,
];

const MIN_LENGTH = [
  (v, param) => (!!v.trim() && v.trim().length > param) || `This field shoul be min ${param}`,
];

const VALID_NAME = [
  v =>  (v && v[0] !== ' ') || 'Not start with space',
  v =>  !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(v) || 'Name is not valid, don\'t accept special chracrer (.,!?*, etc)',
  v =>  !/  +/g.test(v) || 'This field don\'t aceept repeated space',
];

export default {
  REQUIRED,
  EMAIL,
  IPv4,
  VALID_NAME,
  MAX_LENGTH,
  MIN_LENGTH,
};

