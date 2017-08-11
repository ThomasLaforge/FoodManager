import { stock } from '../vue/stock'

Vue.use(require('vue-resource'));

const routes = [
  { path: '/', component: stock },
  { path: '/stock', component: stock}
]

const router = new VueRouter({
  routes
})

let app = new Vue({
    el: '#app',
		router,
		sockets:{
      isLoggedIn(isLoggedIn: boolean){
        console.log('is Logged in', isLoggedIn)
        if(!isLoggedIn){
            this.$router.push({path: '/login'});  
        }
      }
		}
});