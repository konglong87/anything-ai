import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ViewCount from './ViewCount.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () => h(ViewCount)
    })
  }
}
