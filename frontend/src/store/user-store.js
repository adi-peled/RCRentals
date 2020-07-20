import userService from '../services/user-service.js'

var localLoggedInUser = null;

if (sessionStorage.user) {
    localLoggedInUser = JSON.parse(sessionStorage.user);
}


export const userStore = {
    state: {
        loggedInUser: localLoggedInUser

    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedInUser = user;
        },
    },
    actions: {
        async signUp(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            console.log(user);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async logout(context) {
            await userService.logout();

            context.commit({ type: 'setUser', user: null })
        },
        async updateFavs({ commit }, { car, isLiked, user }) {
            console.log(car, isLiked, user);
            await userService.updateFavs(car, isLiked, user)
        }

    }



}