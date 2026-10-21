import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import LocaleSafeLayout from './LocaleSafeLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('JargonLibrary', defineAsyncComponent(() => import('./jargon/JargonLibrary.vue')))
    app.component('JargonPrompt', defineAsyncComponent(() => import('./jargon/JargonPrompt.vue')))
  },
  Layout: LocaleSafeLayout
}
