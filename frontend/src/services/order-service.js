import httpService from './http-service';
import userService from '../services/user-service.js'
export default {
    saveOrder,
    remove,
    getOrders,
    getOrdersByBuyerId,
    
}
async function _add(order) {
    console.log(order);
    return await httpService.post(`order/`, order)

}

async function getOrders() {
    return await httpService.get(`order`)
}
async function getOrdersByBuyerId(id) {
    return await httpService.get(`order` + `?buyer._id=${id}`)
}

async function remove(id) {
    return await httpService.delete(`order/${id}`)
}

function saveOrder(order) {
    return (order._id) ? _update(order) : _add(order)
}

async function _update(order) {

    return await httpService.put(`order/${order._id}`, order)

}

