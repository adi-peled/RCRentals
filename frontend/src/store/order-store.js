import orderService from '../services/order-service.js'

export const orderStore = {
    state: {
        orders: []
    },
    getters: {
        orders(state) {
            return state.orders;
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders;
        },
        addOrder(state, { savedOrder }) {
            
            state.orders.push(savedOrder)
        },
        updateOrder(state, { savedOrder }) {
            const idx = state.orders.findIndex(orders => orders._id === savedOrder._id)
            state.orders.splice(idx, 1, savedOrder)
        },
        removeOrder(state, { id }) {
            const idx = state.orders.findIndex(order => order._id === id)
            state.orders.splice(idx, 1);
          },
    },
    actions: {
        async getOrders({ commit }) {
            const orders = await orderService.getOrders()
            commit({ type: 'setOrders', orders })

        },
        async saveOrder({ commit }, { order }) {
            console.log(order);
            const type = (order._id) ? 'updateOrder' : 'addOrder';
            const savedOrder = await orderService.saveOrder(order)
            commit({ type, savedOrder })
        },
      
        async removeOrder({ commit }, { orderId }) {
            await orderService.remove(orderId);
            commit({ type: 'removeOrder', orderId })
        },

    }
}