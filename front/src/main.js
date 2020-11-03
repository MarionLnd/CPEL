import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueCookies from 'vue-cookies';
import VueRouter from "vue-router"; 
import Routes from "./Routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueDropdown from 'vue-dynamic-dropdown'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'skulpt/dist/skulpt.min';
import 'skulpt/dist/skulpt-stdlib';



Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueSidebarMenu)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-dropdown', VueDropdown);

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
