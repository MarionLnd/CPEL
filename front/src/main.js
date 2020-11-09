import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from "vue-router"
import Routes from "./js/Routes"
import 'skulpt/dist/skulpt.min'
import 'skulpt/dist/skulpt-stdlib'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faPlay)
library.add(faCheck)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
