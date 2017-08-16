import { stock } from '../vue/routes/stock'
import { product } from '../vue/routes/product'

Vue.use(require('vue-resource'));
Vue.use(require('vuetify'));

const routes = [
  { path: '/', component: stock },
  { path: '/stock', component: stock },
  { path: '/product/:barCode', component: product }
]

const router = new VueRouter({
  routes
})

let app = new Vue({
    el: '#app',
    data : function(){
      return {
        drawer: null,
        mini: false,
        right: null,
        items: [
            { title: 'Home', icon: 'home', route: '/home' },
            { title: 'Stock', icon: 'business', route: '/stock' }
        ]
      }
    },
    router,
    methods: {
        moveTo(route: string){
            this.$router.push(route)
        }
    }
});