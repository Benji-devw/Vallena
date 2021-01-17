import axios from 'axios'

const apiCallProdcuts = axios.create({
    // baseURL: '/api/products',
    baseURL: 'http://localhost:8800/api',
})
const apiCallOrders = axios.create({
    // baseURL: '/api/orders',
    baseURL: 'http://localhost:8802/api',
})
const apiCallComments = axios.create({
    // baseURL: '/api/comments',
    baseURL: 'http://localhost:8800/api/comment',
})


/***** Products */
/***** */
const insertProduct = payload => apiCallProdcuts.post(`/insert`, payload)            // Lien => Api=>productRouter.js/insertProduct
const updateProductById = (id, payload) => apiCallProdcuts.put(`/update/${id}`, payload)    // Lien => Api=>productRouter.js/updateProduct
const getProducts = payload => apiCallProdcuts.get(`/`, payload)                            // Lien => Api=>productRouter.js./getProducts
const getProductById = id => apiCallProdcuts.get(`/${id}`)
const deleteProductById = id => apiCallProdcuts.delete(`/${id}`)
const getProductsPost = payload => apiCallProdcuts.post(`/getproductspost`, payload)                            // Lien => Api=>productRouter.js./getProducts

/***** Orders */
/***** */
const insertOrder = payload => apiCallOrders.post(`/order`, payload)
const getOrderByOrderNumber = payload => apiCallOrders.post(`/getorderbyordernumber`, payload)
const getAllOrders = payload => apiCallOrders.get(`/order`, payload)
const deleteOrderById = id => apiCallOrders.delete(`/order/${id}`)
const updateOrderById = (id, payload) => apiCallOrders.put(`/order/${id}`, payload)

/***** Comments */
/***** */
const getComments = payload => apiCallComments.get(`/comment`, payload)
const insertComment = payload => apiCallComments.post(`/comment`, payload)
const updateComment = (id, payload) => apiCallComments.put(`/comment/${id}`, payload)
const deleteComment = id => apiCallComments.delete(`/comment/${id}`)
const commentsFilter = payload => apiCallComments.post(`/commentsfilter`, payload)

const apis = {
    insertProduct,
    updateProductById,
    getProducts,
    getProductById,
    deleteProductById,
    getProductsPost,

    insertOrder,
    getOrderByOrderNumber,
    getAllOrders,
    deleteOrderById,
    updateOrderById,

    getComments,
    insertComment,
    updateComment,
    deleteComment,
    commentsFilter,
}

export default apis
