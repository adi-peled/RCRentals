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
            try {
                const user = await userService.signup(userCred)
                context.commit({ type: 'setUser', user })
                return user;
            } catch (err) {
                console.log(err);
            }
        },
        async login(context, { userCred }) {
            try {
                const user = await userService.login(userCred);
                console.log(user);
                context.commit({ type: 'setUser', user })
                return user;
            } catch (err) {
                console.log(err);
            }
        },
        async logout(context) {
            try {
                await userService.logout();
                context.commit({ type: 'setUser', user: null })
            } catch (err) {
                console.log(err);
            }
        },
        async updateFavs({ commit }, { car, isLiked, user }) {
            try {
                await userService.updateFavs(car, isLiked, user)
            } catch (err) {
                console.log(err);
            }
        }

    }



}