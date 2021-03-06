import { registerRootComponent } from 'expo';
import './shim.js'
import crypto from 'crypto'
import App from './App';
import * as filters from './src/filters'
import Vue from "vue-native-core";

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
