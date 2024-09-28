import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const vuetify = createVuetify({
  components: {
    ...components,
    VTimePicker
  }, 
  directives,
})

createApp(App).use(pinia).use(vuetify).mount('#app')
