import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from 'react-redux';
// import Success from './Success'
import { resetCart } from '../../lib/actions';
import apiCallOrders from '../../apiCall/Orders_Api'
import apiCall from '../../apiCall/Products_Api'

const PayPalBtn = (props) => {
   // console.log('props', props)

   const dispatch = useDispatch()
   const status = { inProgress: true, finish: false };
   const {amount, items} = props


   const handleUpdateProduct = (id, data) => {
      var formData = new FormData();
      formData.append('quantityProduct', data.quantityProduct)
      // ROUTE => serverURL/server.js/router.js/:id
      apiCall.updateProductById(id, formData)         // Lien => src/apiCall/index.js
         .then(res => {
            console.log('Quantity update Done !', res)
            window.alert(`Modification OK !`)
         }).catch(() => { })
      window.location = "/Success";
   }

   return (
      <>
         <div className="row mt-5 p-3 zoomIn align-items-center justify-content-center">

            {/* <div className="col-12 text-right">
                  <CancelIcon onClick={closeModal} style={{cursor:"pointer"}} />
               <hr />
            </div> */}

            <div className="col-12">
            <PayPalButton
                  style={{
                     shape: 'rect',
                     color: 'gold',
                     layout: 'vertical',
                     label: 'paypal',
                  }}
                  
               amount={amount}

               onSuccess={(details, data) => {
                  // console.log('data', data)
                  // console.log('details', details)
                  console.log('details', details.purchase_units)
                  console.log('shipping', details.purchase_units.shippin)
                  // console.log('Status', details.status);

                  // alert("Transaction completed by " + details.payer.name.given_name);

                  console.log(items)
                  const calcul = (items.map(item => {
                     const newProductQuantity = item.details.quantityProduct - item.quantity;
                     // console.log('newProductQuantity', newProductQuantity)
                     return {
                        ...item.details, quantityProduct: newProductQuantity
                     }
                  }))
                  // Update quantityProduct in db
                  calcul.map(change => (
                     <>
                        {/* {console.log('change', change)} */}
                        {handleUpdateProduct(change._id, change)}
                     </>
                  ))

                  // Send order in db
                  const client = details.purchase_units
                  const payload = { items, client, amount, status }
                  apiCallOrders.insertOrder(payload).then(res => {
                     console.log('res', res)
                     window.alert(`New Order inserted Done !`)
                     console.log("Order enregistré")
                     const reset = () => {
                        dispatch(resetCart())
                     }
                     return reset()
                  })

                  localStorage.setItem('purchaseClient', JSON.stringify(details.purchase_units));
                  localStorage.setItem('purchaseClientItems', JSON.stringify(items));

               }}
               options={{
                  // SANDBOX
                  clientId: "AX2P46p1RbwouBK4mOZokjgcbCfNqRd_Fmf8R5Kx0qUH-F6wBgoNVSm47PF5_45m-UQoup6SuBWXXKCF",
                  // PRODUCTION - https://developer.paypal.com/developer/applications/
                  // clientId: "AQtzB08CGU4_quL2r6GTR_nB5iOZVgIuhYdJ7HG3-y7aJMHJCuFBc5oANY2MlZnJG9hn2_HGalUkjjIR",
                  currency: "EUR"
               }}
            />
            </div>

         </div>

    
      </>
   );
}
export default PayPalBtn

