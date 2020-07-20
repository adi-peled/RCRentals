import httpService from './http-service'
// import json from '../../../../db.json';
// var users = json.user

export default {
    login,
    logout,
    signup,
    query,
    getById,
    remove,
    update,
    getLoggedinUser,
    updateFavs
}

function getById(userId) {
    console.log(userId);
    return httpService.get(`user/${userId}`)
}

async function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)


}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    console.log('signup', userCred);
    return _handleLogin(user)
}


async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

function query() {
    return httpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function getLoggedinUser() {
    const user = sessionStorage.getItem('user')
    if (!user) return ''
    return JSON.parse(user);
}

async function updateFavs(car, isLiked, user) {
    console.log(user);
    if (isLiked) {
        if (user.favCars.some(favCar => favCar._id === car._id)) return
        user.favCars.push(car)
    } else {
        const idx = user.favCars.findIndex(favCar => favCar._id === car._id)
        console.log(idx);
        user.favCars.splice(idx, 1)
        console.log(user);
    }
    _handleLogin(user)
    return await httpService.put(`user/${user._id}`, user)
}


