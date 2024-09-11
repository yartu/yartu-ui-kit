import { createI18n } from '../plugins/i18n';
import enlang from './en';
import trlang from './tr';
import delang from './de';
import arlang from './ar';

const { t, changeLocale, setLocaleMessage } = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enlang,
    tr: trlang,
    de: delang,
    ar: arlang,
  },
});

export { t, changeLocale, setLocaleMessage };
