import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './scss/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocialSharing from 'vue-social-sharing';
 


Vue.config.productionTip = false
Vue.use(VueSocialSharing);
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')



// var push = require('web-push')
// let vapidKeys = {
//     privateKey: "knjySZVIVwHYXXNmNC7aQI_zJkoY_eVwAFgdaRztBOo",
//     publicKey: "BGUIFKWQ9lPoxCR0bYKhti6WBXs8XO_v5Or6woaYdj7Z0OrhJy9PREJami6-nyJMhZxjOVY8e87rYgo2gJxBhhA"
// }
// push.setVapidDetails('mailto:text@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey)
// console.log(vapidKeys);
// let sub = {
//     "endpoint": "https://fcm.googleapis.com/fcm/send/eEO2Ri3ifJY:APA91bE4ntyOgOcFUnq1uf1alN8PqFUwbfuIsx_h60xyK3dAgdUkZ08VcY3NW_c8ZpFjgSqmRRTWIFi5-9e_bXg3nEsPuEgo821l7sa3TM3a47Ei5pDFYPlXO54h3DQMerTLVdTVs6vs",
//     "expirationTime": null,
//     "keys": {
//         "p256dh": "BNycw1wZgb9c4a3d8C2WS1nyuy40W90h4wRN754NppFAA_lm5V68NO4QnvJ68v6XoVrsp8ASmDAScjtED3irHFk",
//         "auth": "r5bGCt5CqLrKTpEcCsAz3Q"
//     }
// }

// push.sendNotification(sub, 'text massage')