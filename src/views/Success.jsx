import React, { useState, useEffect } from 'react';

import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { GiStorkDelivery } from 'react-icons/gi'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Button from '@material-ui/core/Button';



const SuccessOk = () => {
   const [order, setOrder] = useState([])
   const [items, setItems] = useState([])
   const [orderNumber, setOrderNumber] = useState([])

   
   useEffect(() => {
      if (JSON.parse(localStorage.getItem('purchaseClient')) === null && order.length <= 0) {
         return window.location = '/';
      }
      setOrder(JSON.parse(localStorage.getItem('purchaseClient')))
      setItems(JSON.parse(localStorage.getItem('purchaseClientItems')))
      setOrderNumber(JSON.parse(localStorage.getItem('orderNumber')))
   }, [order.length])

   const print = () => {
      window.print();
   }
   const back = () => {
      localStorage.clear();
      var currentIDB = indexedDB.open('customers', 2);
      currentIDB.onsuccess = function () {
         var idb = currentIDB.result;
         idb.close();
         indexedDB.deleteDatabase("customers");
      };
      window.location = "/"
   }

   return (
      <>
      <section className="container success-payment">
         <div className="row text-center">
            <div className="col-12 icon-success"> <DoneAllOutlinedIcon /> </div>
            <div className="col-12 success">  <h1>Votre commande à bien été prise en compte !</h1> </div>
            <Button variant="outlined" onClick={() => back()} style={{outline:"none"}}>Accueil</Button>
            <Button variant="outlined" onClick={print} style={{outline:"none"}}>Enregistrer</Button>
         </div>
         <hr />
         <div className="row justify-content-center">

            <div className="col-md-12 text-center">

               <h3>Récapitulatif de votre commande N° <b>{orderNumber}</b> </h3>
               <p>Merci de conserver le n° de commande jusqu'à réception, il vous sera aussi demander si vous souhaitez donner votre avis !</p>

               <div className="row text-center success-client">
                   <div className="col-md-4">
                     <CreditCardIcon />
                     {order.map((client, id) =>
                     <div key={id} className="m-2">
                        <p><b>{client.amount.value} {client.amount.currency_code}</b></p>
                     </div>
                     )}
                  </div>
                  <div className="col-md-4">
                     <AccountCircleIcon />
                     {order.map((client, id) =>
                     <div key={id}  className="m-2">
                        <p><b>{client.shipping.name.full_name}</b></p>
                     </div>
                     )}
                  </div>
                  <div className="col-md-4">
                     <GiStorkDelivery />
                     {order.map((add, id) =>
                        <div key={id} className="m-2">
                           <p><b>{add.shipping.address.address_line_1}</b> <br />
                           <b>{add.shipping.address.address_line_2}</b><br />
                           <b>{add.shipping.address.admin_area_2}</b><br />
                           <b>{add.shipping.address.postal_code} - {add.shipping.address.country_code === "FR" ? 'FRANCE' : add.shipping.address.country_code}</b>
                           </p>
                        </div>
                     )}
                  </div>
               </div>
                  

               <table className="table m-4 table-striped">
                  <thead>
                     <tr>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col">Article</th>
                        <th scope="col">Taille</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Promotion</th>
                     </tr>
                  </thead>
                  <tbody>
                     
                        {items.map((item, id) => 
                           <tr key={id}>
                           {/* <th scope="row">{item.details._id}</th> */}
                           <th scope="row"></th>
                              <td>{item.details.titleProduct}</td>
                              <td>{item.details.sizeProduct}</td>
                              <td>{item.details.priceProduct}€</td>
                              <td>{item.quantity}</td>
                              <td>{item.details.promotionProduct ? 'oui' : 'non'}</td>
                           </tr>
                        )}
                        
                  </tbody>
               </table>


            </div>
         </div>
         
         <div className="row text-center">
            <div className="col">
               <h4>
                  Merci pour votre achat <br /> et <br />votre confiance !!! <br /> 
               </h4>
               <h5> À bientôt sur Vallena.fr</h5>
            </div>
         </div>

      </section>

      </>
   );
}
export default SuccessOk






