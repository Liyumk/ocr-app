import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueClipboard from 'vue-clipboard2'


VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
