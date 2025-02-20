import { defineConfig } from '@vueform/vueform'
import en from '@vueform/vueform/locales/en'
import tailwind from '@vueform/vueform/themes/tailwind'

export default defineConfig({
  theme: tailwind,
  locales: { en },
  locale: 'en',
})
