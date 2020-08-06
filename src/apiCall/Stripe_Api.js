import axios from 'axios'

const apiCallStripe = axios.create({
    baseURL: 'http://localhost:8802/api',
})

const insertOrder = payload => apiCallStripe.post(`/order`, payload)      // Lien avec Api=>orderRouter.js (artid'eche/Api/orders/routes)
const getAllOrders = payload => apiCallStripe.get(`/order`, payload)
const deleteOrderById = id => apiCallStripe.delete(`/order/${id}`)
const updateOrderById = (id, payload) => apiCallStripe.put(`/order/${id}`, payload)

const apis = {
    insertOrder,
    getAllOrders,
    deleteOrderById,
    updateOrderById

}

export default apis
