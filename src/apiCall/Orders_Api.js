import axios from 'axios'

const apiCallOrders = axios.create({
    // baseURL: '/api/orders',
    baseURL: 'http://localhost:8802/api',
})

const insertOrder = payload => apiCallOrders.post(`/order`, payload)
const getAllOrders = payload => apiCallOrders.get(`/order`, payload)
const deleteOrderById = id => apiCallOrders.delete(`/order/${id}`)
const updateOrderById = (id, payload) => apiCallOrders.put(`/order/${id}`, payload)

const apis = {
    insertOrder,
    getAllOrders,
    deleteOrderById,
    updateOrderById

}

export default apis
