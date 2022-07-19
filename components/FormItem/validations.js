const REQUIRED = [
  v => !!v || 'Required',
];

const EMAIL = [
  v => !!v || 'E-mail is required',
  v => /.+@.+/.test(v) || 'E-mail must be valid',
];

const IPv4 = [
  v => !!v || 'Required',
  v => /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(v) || 'IP must be valid',
];

export default {
  REQUIRED,
  EMAIL,
  IPv4,
};
