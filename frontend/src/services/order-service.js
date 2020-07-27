import httpService from './http-service';
import userService from '../services/user-service.js'
export default {
    saveOrder,
    getOrders,
    getOrdersByBuyerId,

}


async function getOrders() {
    return await httpService.get(`order`)
}
async function getOrdersByBuyerId(id) {
    return await httpService.get(`order` + `?buyer._id=${id}`)
}


function saveOrder(order) {
    return (order._id) ? _update(order) : _add(order)
}

async function _update(order) {

    return await httpService.put(`order/${order._id}`, order)

}

async function _add(order) {
    return await httpService.post(`order/`, order)

}