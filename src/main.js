// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* ===================== Plugins Begin ==================== */
import { i18n } from './plugins/vue-i18n'
// import vuetify from './plugins/vuetify'

/* ===================== Plugins End ==================== */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  // vuetify,
  router,
  components: { App },
  template: '<App/>'
})
