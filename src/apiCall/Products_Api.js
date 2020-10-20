import axios from 'axios'

const apiCall = axios.create({
    baseURL: '/api/products',
    // baseURL: 'http://localhost:8800/api',
})

const insertProduct = payload => apiCall.post(`/insert`, payload)            // Lien => Api=>productRouter.js/insertProduct
const updateProductById = (id, payload) => apiCall.put(`/update/${id}`, payload)    // Lien => Api=>productRouter.js/updateProduct
const getProducts = payload => apiCall.get(`/`, payload)                            // Lien => Api=>productRouter.js./getProducts
const getProductById = id => apiCall.get(`/${id}`)
const deleteProductById = id => apiCall.delete(`/${id}`)
const getProductsPost = payload => apiCall.post(`/getproductspost`, payload)                            // Lien => Api=>productRouter.js./getProducts

const apis = {
    insertProduct,
    updateProductById,
    getProducts,
    getProductById,
    deleteProductById,
    getProductsPost
}

export default apis
