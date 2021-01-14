import React, {useEffect, useState} from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from 'react-redux';
import { resetCart } from '../../lib/actions';
import apiCallOrders from '../../apiCall/Call_Api'
import apiCallProdcuts from '../../apiCall/Call_Api'
// import Success from './Success'
import Button from '@material-ui/core/Button';


const PayPalBtn = (props) => {

   const dispatch = useDispatch()
   const statut = { inProgress: true, finish: false };
   const {items} = props
   const [amount, setAmount] = useState()
   const [show, setShow] = useState(false)


   const handleUpdateProduct = (id, data) => {
      var formData = new FormData();
      formData.append('quantityProduct', data.quantityProduct)

      apiCallProdcuts.updateProductById(id, formData)
         .then(res => {
            // console.log('Quantity update Done !', res)
            // window.alert(`Modification OK !`)
         }).catch(() => { })
      window.location = "/Success";
   }

   useEffect(() => {
      setAmount(props.amount)
   }, [props.amount]);

   return (
      <>
         <div className="row p-3 zoomIn align-items-center justify-content-center">

            <div className="col-12">
               <div className={`text-center p-3 ${show ? "" : "content-list-payment"}`}>
                  <Button variant="contained" 
                  className="btn btn-sm mb-3" 
                  onClick={() => window.location = "/payment"}>Annuler</Button>
                  <p style={{fontSize:"1.2em"}}>Montant à payer: <b>€ {amount}</b></p>
               </div>
            <PayPalButton
                  onClick={() => {
                     props.handlePay()
                     setShow(true)
                  }}
                  style={{
                     shape: 'rect',
                     color: 'gold',
                     layout: 'vertical',
                     label: 'paypal',
                  }}
                  
               amount={amount}

               onSuccess={(details, data) => {
                  // alert("Transaction completed by " + details.payer.name.given_name);

                  // console.log(items)
                  const calcul = (items.map(item => {
                     const newProductQuantity = item.details.quantityProduct - item.quantity;
                     return {
                        ...item.details, quantityProduct: newProductQuantity
                     }
                  }))
                  // Update quantityProduct in db
                  calcul.map(change => (handleUpdateProduct(change._id, change)))

                  // Send order in db
                  const client = details.purchase_units
                  const payer = details.payer
                  let orderNumber = Math.floor(Math.random() * (9999999999999 - 1111111111111)) + 'VL';
                  const payload = { orderNumber, items, payer, client, amount, statut }
                  apiCallOrders.insertOrder(payload).then(res => {
                     // console.log("Order enregistré")
                     const reset = () => {
                        dispatch(resetCart())
                     }
                     return reset()
                  })

                  localStorage.setItem('purchaseClient', JSON.stringify(details.purchase_units));
                  localStorage.setItem('purchaseClientItems', JSON.stringify(items));
                  localStorage.setItem('orderNumber', JSON.stringify(orderNumber));

               }}
               options={{
                  // SANDBOX
                  currency: "EUR",
                  clientId: "AX2P46p1RbwouBK4mOZokjgcbCfNqRd_Fmf8R5Kx0qUH-F6wBgoNVSm47PF5_45m-UQoup6SuBWXXKCF",
               }}
            />

            </div>
         </div>
      </>
   );
}
export default PayPalBtn

