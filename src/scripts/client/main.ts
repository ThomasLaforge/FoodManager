import { stock } from '../vue/routes/stock'
import { categories } from '../vue/routes/categories'
import { places } from '../vue/routes/places'
import { home } from '../vue/routes/home'
import { product } from '../vue/routes/product'

Vue.use(require('vue-resource'));
Vue.use(require('vuetify'));

const routes = [
	{ path: '/', component: home },
	{ path: '/home', component: home },
	{ path: '/categories', component: categories },
	{ path: '/places', component: places },
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
					{ title: 'Categories', icon: 'business', route: '/categories' },
					{ title: 'Places', icon: 'business', route: '/places' }
			]
		}
	},
	router,
	methods: {
		moveTo(route: string){
				this.$router.push(route)
		}
	},
	mounted(){
		let pressed = false; 
		let chars = [];

		window.addEventListener('keypress', (e) => {
			if (e.which >= 48 && e.which <= 57) {
				chars.push(String.fromCharCode(e.which));
			}
			if (pressed == false) {
				setTimeout(() => {
					if (chars.length >= 10) {
						let barcode = chars.join("");
						console.log("Barcode Scanned: " + barcode);
						this.$router.push({path: '/product/' + barcode});
					}
					chars = [];
					pressed = false;
				},500);
			}
			pressed = true;
		})
	}
});