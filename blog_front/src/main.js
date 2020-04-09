import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import '@/assets/css/base.css'
import axios from '@/assets/js/http'
import { Button, Message  ,Pagination,Popconfirm } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'highlight.js'
// import 'highlight.js/styles/monokai-sublime.min.css'
import 'highlight.js/styles/atelier-forest-dark.css'

import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)
// Vue.use(ElementUI);
Vue.use(Button).use(Pagination).use(Popconfirm)

Vue.prototype.$message=Message
Vue.prototype.$axios=axios
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
