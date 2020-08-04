import { useLayoutEffect, useState } from 'react';
import apiCallStripe from './Stripe_Api'
import apiCall from './Products_Api'


export function useFetchAllOrders() {
    const [state, setState] = useState({
        orders: [],
        loading: true
    })
    // Appel
    useLayoutEffect(() => {
        (async () => {
            apiCallStripe.getAllOrders()
                .then(orders => {
                    // console.log('orders', orders)
                    setState({
                        orders: orders.data.data,
                        loading: false,
                    })
                })
        })()
    }, [])
    return [
        state.loading,
        state.orders
    ]
}

export function useFetchAllProducts() {
    const [state, setState] = useState({
        products: [],
        loading: true
    })
    // Appel
    useLayoutEffect(() => {
        (async () => {
            apiCall.getAllProducts()
                .then(products => {
                    // console.log('products', products)
                    setState({
                        products: products.data.data,
                        loading: false,
                    })
                })
        })()
    }, [])
    return [
        state.loading,
        state.products
    ]
}

