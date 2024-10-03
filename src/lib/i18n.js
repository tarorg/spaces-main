import { init, register } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
// Register other languages as needed

init({
  fallbackLocale: 'en',
  initialLocale: 'en', // or determine this based on user's preference
});

export { i18n } from 'svelte-i18n';