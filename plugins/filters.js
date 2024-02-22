import Vue from 'vue'
import { capitalize, truncate } from '@/utils/Helpers'

Vue.filter('capitalize', capitalize)
Vue.filter('truncate', truncate)
