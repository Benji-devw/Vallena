import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TransferList from './Transfer_List';

const PaymentForm = () => {
   const items = useSelector(state => state.items)

   const [subTotal, setSubTotal] = useState(0.00)
   const [total, setTotal] = useState(0.00)
   const shipping = 5.50
   useEffect(() => {
      let totals = items.map(item => {
         return item.quantity * item.details.priceProduct
      })
      setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0))
      setTotal(subTotal + shipping)
   }, [items, subTotal, total]);
   // const totalCmd = { total: total, shipping: shipping }
   // console.log('totalCmd', totalCmd)


   return (
      <Fragment>
         <section>
            <div id="payment" className="container">


               <div className="row">
                  <div className="col-md-8">
                     
                     <TransferList items={items}/>

                  </div>

                  {/* Cart Payment */}
                  <div className="col-md-4 p-5">
                     <h4>Commande :</h4>
                     <hr />
                     <p className="text-left">Subtotal</p>
                     <p className="text-right">€<b>{subTotal.toFixed(2)}</b></p>

                     <p className="text-left">shipping</p>
                     <p className="text-right">€<b>{shipping.toFixed(2)}</b></p>
                     <hr />
                     <h3 className="text-left">Total</h3>
                     <h4 className="text-right">€<b>{subTotal === 0.00 ? "0.00 " : total.toFixed(2)}</b></h4>
                  </div>
               </div>

            </div>
         </section>
      </Fragment>
   )
}
export default PaymentForm