/**
 * Vuetify used vuetify-loader optimization package minize
 */
import Vue from 'vue'
import Vuetify, { VApp } from 'vuetify/lib'
import minifyTheme from 'minify-css-string'

Vue.use(Vuetify, {
  comments: {
    VApp
  }
})

const opts = {
  theme: {
    options: { minifyTheme },
    themeCache: {
      get: key => localStorage.getItem(key),
      set: (key, value) => localStorage.setItem(key, value)
    }
  }
}

export default new Vuetify(opts)
