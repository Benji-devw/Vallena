import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PayPalButton from './Paypal'
import RowItem from './Row_Item'
// import TransferList from './old/Transfer_List';
// import { Redirect } from "react-router-dom";

const PaymentForm = () => {
   const items = useSelector(state => state.items)

   // Calcul Quantity articles
   const getQty = items.map(e => e.quantity)
   let sum = getQty.reduce((a, b) => {
      return a + b
   }, 0)

   const [subTotal, setSubTotal] = useState(0)
   const [total, setTotal] = useState(0)


   const [shipping, setShipping] = useState(5.50)

   const [forMom, setForMom ] = useState(true)
   useEffect(() => {
      if (forMom) {
         window.scrollTo({ top: 0 });
         setForMom(false)
      }
      let totals = items.map(item => {
         return item.quantity * item.details.priceProduct
      })
      setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0))
      setTotal(subTotal + shipping)
      if (total >= 30) {
         setShipping(0.00)
      } else { setShipping(4.95)}
   }, [items, subTotal, total, setShipping, shipping]);
   // const totalCmd = { total: total, shipping: shipping }
   // console.log('totalCmd', totalCmd)
   
   // window.scrollTo({ top: 0 });
   // if (items.length <= 0) { return <Redirect to='/' /> }

   const closeModal = () => {
      return null
   }
   // // Transfer list
   // const [leftdiv, setLeft] = useState([]);
   // const [rightdiv, setRight] = useState([]);
   // const handleLeft = (data) => {setLeft({leftdiv: data})}
   // const handleRight = (data) => {setRight({ rightdiv: data })}
   const [showDiv, setShowDiv] = useState(false)
   const handlePay = () => {
      setShowDiv(true)
   }
   

   return (
      <>
         <section>
               <div className="row no-gutters payment-header">
                  <article className="container">
                     <div className="col-12 title">
                        <h2 className="title">Votre Commande : </h2>
                     </div>
                  </article>
               </div>


            <div id="payment" className="container">
            <article>
               <div className="row justify-content-center p-3">
                  
                  {/* Order summary */}
                  {!showDiv ? (
                  <div className={`col-md-8 order-summary p-3`}>
                     {items.map((item, i) => <RowItem key={i} item={item} onCloseModal={closeModal}/>)}

                     {/* <TransferList onHandleLeft={handleLeft} onHandleRight={handleRight} /> */}

                     <hr />
                     <div className="order-summary-total">
                           <p className="text-left">Sous-total ({sum} articles):</p>
                     <p className="text-right">{subTotal.toFixed(2)} €</p>

                     <p className="text-left">Frais livraison</p>
                     <p className="text-right">{total < 30 ? shipping.toFixed(2) + ' €' : 'Offert'} <br /> <span style={{fontSize:".7em"}}>Livraison OFFERT à partir de 30€</span></p>
                     <hr />
                     <h3 className="text-left">Total</h3>
                     <h4 className="text-right">{subTotal === 0.00 ? "0.00 " : total.toFixed(2)} €</h4>
                     </div>
                  </div>
                  ) : ('')}
                 
                  <div className={`${showDiv ? "col-md-6 fadeIn" : "col-md-4"}`} style={{userSelect:"auto"}}>
                        Card Type: <b>Visa</b> <br />
                        Card Number: <b>4020026056914040</b> <br />
                        Expiration Date: <b>04/2023</b> <br />
                        CVV: <b>087</b>
                     {items.length > 0 ?
                        (<PayPalButton amount={total} items={items} handlePay={handlePay}/>)
                        : ('')
                     }
                  </div>
               </div>

               </article>


            </div>
         </section>
      </>
   )
}
export default PaymentForm