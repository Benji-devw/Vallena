import { useLayoutEffect, useState } from 'react';
import apiCall from './Products_Api'

function useFetchAllProducts() {
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
export default useFetchAllProducts
