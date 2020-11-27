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
    faEye,
    faFileDownload,
    faFilePdf,
    faUserMinus,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import VueMoment from "vue-moment"

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMoment)

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faPlay)
library.add(faCheck)
library.add(faEdit)
library.add(faClipboard)
library.add(faEye)
library.add(faFileDownload)
library.add(faFilePdf)
library.add(faUserMinus)
library.add(faTrashAlt)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
