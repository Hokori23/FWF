import Vue from 'vue';
import Vuex from 'vuex';

import api from './api';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import { colors } from 'quasar';
const primaryColor = '#1976D2';
const warningColor = '#F2C037';
// const warningColor = '#be8431';
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      api
    },
    state: {
      brightness: 100,
      dark: false
    },
    mutations: {
      setBrightness(state, brightness) {
        state.brightness = brightness;
      },
      setDark(state, { dark, vm }) {
        if (dark !== null && dark !== undefined) {
          state.dark = dark;
        } else {
          state.dark = dark = true;
        }
        colors.setBrand('primary', dark ? warningColor : primaryColor);
        colors.setBrand('warning', dark ? primaryColor : warningColor);
        vm.$q.dark.set(dark);
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
