import React, { useState, useEffect } from 'react';

import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { GiStorkDelivery } from 'react-icons/gi'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Button from '@material-ui/core/Button';




const SuccessOk = props => {
   console.log('props', props)

   const [order, setOrder] = useState([])
   console.log('order', order)
   const [items, setItems] = useState([])


   useEffect(() => {
         setOrder(JSON.parse(localStorage.getItem('purchaseClient')))
         setItems(JSON.parse(localStorage.getItem('purchaseClientItems')))
   }, [props.order])

   const print = () => {
      window.print();
   }

   return (
      <>
      <section className="container success-payment">
         <div className="row text-center">
            <div className="col-12 icon-success"><DoneAllOutlinedIcon /></div>
            <div className="col-12 success">  <h3>Votre commande à bien été prise en compte !</h3> </div>
         </div>
         <hr />
         <div className="row justify-content-center">

            <div className="col-md-12 text-center">

            <Button variant="outlined" onClick={print} style={{outline:"none"}}>Enregistrer</Button>
            <h5>Récapitulatif de votre commande :</h5>

               <div className="row text-center success-client">
                   <div className="col-md-4">
                     <CreditCardIcon />
                     {order.map((client, id) =>
                     <div key={id}>
                        <p><b>{client.amount.value} {client.amount.currency_code}</b></p>
                     </div>
                     )}
                  </div>
                  <div className="col-md-4">
                     <AccountCircleIcon />
                     {order.map((client, id) =>
                     <div key={id}>
                        <p><b>{client.shipping.name.full_name}</b></p>
                     </div>
                     )}
                  </div>
                  <div className="col-md-4">
                     <GiStorkDelivery />
                     {order.map((add, id) =>
                        <div key={id}>
                           <p><b>{add.shipping.address.address_line_1}</b></p>
                           <p><b>{add.shipping.address.admin_area_2}</b></p>
                           <p><b>{add.shipping.address.postal_code} - {add.shipping.address.country_code === "FR" ? 'FRANCE' : add.shipping.address.country_code}</b></p>
                        </div>
                     )}
                  </div>
               </div>
                  


               <table className="table m-4 table-striped">
                  <thead>
                     <tr>
                        <th scope="col">ID</th>
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
                           <th scope="row">{item.details._id}</th>
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

      </section>

      </>
   );
}
export default SuccessOk






