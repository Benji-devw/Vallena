import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PayPalButton from './Paypal'
import RowItem from './Row_Item'
// import DragNDrop from './Row_item_Drag'
// import TransferList from './old/Transfer_List';
// import { Redirect } from "react-router-dom";

const PaymentForm = () => {
   const items = useSelector(state => state.items)
   // const [datas, setDatas] = useState([])
   // const data = [
   //    { title: "Group 1", items: datas.slice(0, 3) },
   //    { title: "Group 2", items: [] }
   // ] 
   
   // Calcul Quantity articles
   const getQty = items.map(e => e.quantity)
   let sum = getQty.reduce((a, b) => {
      return a + b
   }, 0)

   const [subTotal, setSubTotal] = useState(0)
   const [total, setTotal] = useState(0)
   const [shipping, setShipping] = useState(0)

   const [paypalScroll, setPaypalScroll] = useState('');


   const [forMom, setForMom ] = useState(true)
   useEffect(() => {
      if (forMom) {
         window.scrollTo({ top: 0 });
         setForMom(false)
      }

      window.addEventListener('scroll', () => {
         let paypalScroll = '';
         if (window.scrollY >= 300) {
            paypalScroll = 'scrolled';
         }
         setPaypalScroll(paypalScroll);
      });

      let totals = items.map(item => {
         return item.quantity * item.details.priceProduct
      })
      setSubTotal(totals.reduce((item1, item2) => item1 + item2, 0))
      setTotal(subTotal + shipping)

      if (subTotal < 30) {
         setShipping(4.95)
      } else {
         setShipping(0)
      }
      // setDatas(items)
   }, [items, subTotal, total, setShipping, shipping, forMom]);
   



   const closeModal = () => {
      return null
   }

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
                        <h1 className="title">Votre Commande : </h1>
                     </div>
                  </article>
               </div>


            <div id="payment" className="container">
            <article>
               <div className="row justify-content-center p-3">
                  
                  {/* Order summary */}
                  {!showDiv ? (
                  <div className={`col-lg-8 order-summary p-3`}>
                     {items.map((item, i) => <RowItem key={i} item={item} onCloseModal={closeModal}/>)}
                        {/* <DragNDrop data={data} /> */}
                     {/* <TransferList onHandleLeft={handleLeft} onHandleRight={handleRight} /> */}

                     <hr />
                     <div className="order-summary-total">
                     <p className="text-left">Sous-total ({sum} {sum > 1 ? "articles" : "article"}):</p>
                     <p className="text-right">{subTotal.toFixed(2)} €</p>

                     <p className="text-left">Frais livraison</p>
                     <p className="text-right">{subTotal < 30 ? '€' + shipping : 'Offert'} <br /> <span style={{ fontSize: ".7em" }}>Livraison OFFERT à partir de 30€</span></p>
                     <hr />
                     <h3 className="text-left">Total</h3>
                     <h4 className="text-right">{subTotal === 0.00 ? "0.00 " : total.toFixed(2)} €</h4>
                     </div>
                  </div>
                  ) : ('')}
                 
                  <div className={`${showDiv ? "col-lg-6 fadeIn" : "col-lg-4"}`}>
                     <div className={`paypal-btn ${paypalScroll === "scrolled" ? "scrolled" : ""}`}>
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
                  
               </div>

               </article>


            </div>
         </section>
      </>
   )
}
export default PaymentForm