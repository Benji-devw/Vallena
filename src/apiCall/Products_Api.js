import axios from 'axios'

const apiCall = axios.create({
    baseURL: 'http://localhost:8800/api',
})


const insertProduct = payload => apiCall.post(`/product`, payload)      // Lien avec Api=>productRouter.js (artid'eche/Api/products/routes)
const getAllProducts = payload => apiCall.get(`/products`, payload)
const updateProductById = (id, payload) => apiCall.put(`/product/${id}`, payload)       // Lien => Api=>productRouter.js
const deleteProductById = id => apiCall.delete(`/product/${id}`)
const getProductById = id => apiCall.get(`/product/${id}`)

const apis = {
    insertProduct,
    getAllProducts,
    updateProductById,
    deleteProductById,
    getProductById,
}

export default apis
