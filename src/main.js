import Vue from 'vue';
import App from './App.vue';
import VueFuse from 'vue-fuse';
import Sticky from 'vue-sticky-directive';

Vue.config.productionTip = false;
Vue.use(VueFuse);
Vue.use(Sticky);

new Vue({
  render: h => h(App),
}).$mount('#app');
