import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Импорт плагинов
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import AppLoader from './components/App/AppLoader'
import localizeFilter from './filters/localize.filter'

//Импорт стилей
import 'materialize-css/dist/js/materialize.min'
import 'materialize-css/dist/css/materialize.min.css'
import './assets/index.css'

//Импорт fb
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import {createMetaManager} from 'vue-meta'

firebase.initializeApp({
  apiKey: "AIzaSyChN0ksxDJBqjB3dSDx1BvB0bv3XeuS6cs",
  authDomain: "vueproject-b3bb7.firebaseapp.com",
  projectId: "vueproject-b3bb7",
  storageBucket: "vueproject-b3bb7.appspot.com",
  messagingSenderId: "662539124219",
  appId: "1:662539124219:web:cd0c235182d0e5f8d21f5e"
});

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .use(createMetaManager())
            .component('AppLoader', AppLoader)
            .directive('tooltip', tooltipDirective)
        
        app.config.globalProperties.$filters = {
            localize(value) {
                return localizeFilter(value)
            }
        }

        app.mount('#app')
    }
})
