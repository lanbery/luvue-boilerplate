/**
 * Vuetify used vuetify-loader optimization package minize
 */
import Vue from 'vue'
import Vuetify, { VApp } from 'vuetify/lib'

Vue.use(Vuetify, {
  comments: {
    VApp
  }
})

const opts = {}

export default new Vuetify(opts)
