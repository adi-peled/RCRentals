import Vue from 'vue';
import VueRouter from 'vue-router';
//Views
import Home from '../views/Home.vue';
import signUp from '../views/signup.vue';
import logIn from '../views/login.vue';
import profile from '../views/profile.vue';
import browseCars from '../views/browse-cars.cmp.vue';
import carDetails from '../views/car-details.cmp.vue';
//Components
import ownedCars from '../components/owned-cars.cmp.vue';
import favCars from '../components/favorite-cars.cmp.vue';
import userReviews from '../components/user-reviews.cmp.vue';
import userOrders from '../components/user-orders.cmp.vue';
import addCar from '../components/add-car.cmp.vue'
import usersList from '../components/chat-users-list.cmp.vue'
import requestedOrders from '../components/requested-orders.cmp.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signup',
        name: 'signUp',
        component: signUp
    },
    {
        path: '/userslist/:id?',
        name: 'UsersList',
        component: usersList
    },
    {
        path: '/login',
        name: 'logIn',
        component: logIn
    },
    {
        path: '/profile/:id?',
        name: 'profile',
        component: profile,
        children: [{
                path: '/profile/owncars/:id?',
                name: 'owncars',
                component: ownedCars
            },
            {
                path: '/profile/favoriteCar/:id?',
                name: 'favorite-car',
                component: favCars
            },
            {
                path: '/profile/reviews/:id?',
                name: 'user-reviews',
                component: userReviews
            },
            {
                path: '/profile/myOrder/:id?',
                name: 'user-order',
                component: userOrders
            },
            {
                path: '/profile/requestedOrders/:id?',
                name: 'requested-orders',
                component: requestedOrders
            },
            {
                path: '/profile/addcar/:id',
                name: 'add-car',
                component: addCar
            }

        ]
    },
    {
        path: '/car/:category?',
        name: 'browse cars',
        component: browseCars
    },
    {
        path: '/car/details/:id',
        name: 'car-details',
        component: carDetails
    },
]

const router = new VueRouter({
    routes
})

export default router