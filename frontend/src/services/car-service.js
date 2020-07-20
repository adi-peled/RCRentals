const { default: axios } = require("axios")
import httpService from './http-service'


export const carService = {
    query,
    getById,
    remove,
    saveCar,
    getByOwnerId,
    getUserReviews
}



async function query(filterBy = "") {
    if (!filterBy) {
        return await httpService.get(`car`)
    } else {
        console.log(filterBy);
        const { price, type, location, available, model } = filterBy;
        return await httpService.get('car' + `?price=${price}&type=${type}&location=${location}&model=${model}&=${available}`)
    }
}
async function getById(id) {
    return await httpService.get(`car/${id}`)
}
async function getByOwnerId(id) {
    return await httpService.get('car' + `?owner._id=${id}`)
}
async function getUserReviews(id) {
    return await httpService.get('car/' + `?reviews.byUser._id=${id}`)
}

async function remove(id) {
    return await httpService.delete(`car/${id}`)
}

function saveCar(car) {
    return (car._id) ? _update(car) : _add(car)
}

async function _update(car) {
    return await httpService.put(`car/${car._id}`, car)

}

async function _add(car) {
    return await httpService.post(`car/`, car)

}