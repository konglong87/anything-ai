import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import LocaleSafeLayout from './LocaleSafeLayout.vue'
import './custom.css'
import { NAVIGATION_EVENT } from '../../scripts/jargon/search-state.mjs'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      const previous = router.onAfterRouteChanged
      router.onAfterRouteChanged = async (href) => {
        await previous?.(href)
        window.dispatchEvent(new Event(NAVIGATION_EVENT))
      }
    }
    app.component('JargonSearchEntry', defineAsyncComponent(() => import('./jargon/JargonSearchEntry.vue')))
    app.component('JargonLibrary', defineAsyncComponent(() => import('./jargon/JargonLibrary.vue')))
    app.component('JargonPrompt', defineAsyncComponent(() => import('./jargon/JargonPrompt.vue')))
  },
  Layout: LocaleSafeLayout
}
