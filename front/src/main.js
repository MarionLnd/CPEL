import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from "vue-router"
import Routes from "./js/Routes"
import 'skulpt/dist/skulpt.min'
import 'skulpt/dist/skulpt-stdlib'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPlay,
    faCheck,
    faEdit,
    faClipboard,
    faEye
} from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faPlay)
library.add(faCheck)
library.add(faEdit)
library.add(faClipboard)
library.add(faEye)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
