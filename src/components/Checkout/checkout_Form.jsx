import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Col, Form  } from 'react-bootstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../lib/actions';

import { ClientProfileContext } from '../../lib/ClientProfileContext'
import apiCallStripe from '../../apiCall/Orders_Api'
import apiCall from '../../apiCall/Products_Api'

const CheckoutForm = props => {
   
   const dispatch = useDispatch()

   // Format Total
   const amountTotal = props.amount.total
   function formatNumber(num) {
     let number = num.toString().replace(".", "")
      return number
   }
   const formatTotal = formatNumber(amountTotal)

   // Format Description Produits
   const items = props.itemsCmd

   const itemsMap = new Set(items.map((e) => { return e.details._id }))
   const listItems = Array.from(itemsMap);
   const itemsName = JSON.stringify(listItems)
   // console.log('itemsName', itemsName)

   // Format Name Client
   const clientNom = props.client.nomClient
   const clientPrenom = props.client.prenomClient
   const firstNameClient = JSON.stringify(clientPrenom)
   const nameClient = JSON.stringify(clientNom)
   // console.log('ClientName', nomClient)

   // Context info Client
   const client = useContext(ClientProfileContext);
   const {
      nomClient,
      prenomClient,
      // emailClient,
      adresseClient,
      cpClient,
      villeClient,
      setClientProfileContext
   } = client


   const [succeeded] = useState(false);
   const [error, setError] = useState(null);
   const [processing] = useState('');
   const [disabled, setDisabled] = useState(true);
   // const [clientSecret, setClientSecret] = useState('');

   const [email, setEmail] = useState('');
   const stripe = useStripe();
   const elements = useElements();

   // console.log('items', items)
   // console.log('client', client)
   // console.log('status', status)
   const status = { inProgress: true, finish: false };
   const totalCmd = props.amount


 
   const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
      if (!stripe || !elements) { // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
         return;
      }
      // Get a reference to a mounted CardElement. Elements knows how to find your CardElement because there can only ever be one of  each type of element.
      const cardElement = elements.getElement(CardElement);
      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card: cardElement,
      });

      if (error) { console.log('[error]', error);
      } else {
         // console.log('[PaymentMethod]', paymentMethod);
         const { id } = paymentMethod;

         await axios.post("http://localhost:4242/charge", {
            id, 
            amount: formatTotal,
            description: `${nameClient} ${firstNameClient} - ${itemsName}`,
            receipt_email: email,
         })
         .then( data => {
            console.log('data', data)
            // setClientSecret(data.clientSecret)

            // Update quantity in db
            // setObject in newItems
            const test = (items.map(item => {
               const newProductQuantity = item.details.quantityProduct - item.quantity;
               return {
                  ...item.details, quantityProduct: newProductQuantity
               }
            }))
            // Update quantityProduct in db
            test.map(change => (
               <> {apiCall.updateProductById(change._id, change).then(res => { console.log('update quantityProduct in db OK !!! ') })
               } </>
            ))

            // Send order in db
            const payload = { items, client, totalCmd, status }
            apiCallStripe.insertOrder(payload).then(res => {
               window.alert(`NewProduct inserted successfully`)
               console.log("Order enregistré")
               const reset = () => {
                  dispatch(resetCart())
               }
               return reset()
            })

         });
      }
   };

   const handleChange = async (event) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
   };





   return (
      <>
      <Form id="payment-form" onSubmit={handleSubmit}>
         <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
               <Form.Control placeholder="Nom" className="form-control-input"
                  name="nomClient"
                  defaultValue={nomClient}
                  onChange={e => {
                     setClientProfileContext({ [e.target.name]: e.target.value })
                  }}
               />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridFirstName">
               <Form.Control placeholder="Prénom" className="form-control-input"
                  name="prenomClient"
                  defaultValue={prenomClient}
                  onChange={e => {
                     setClientProfileContext({ [e.target.name]: e.target.value })
                  }}
               />
            </Form.Group>
         </Form.Row>
         {/* <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
               <Form.Control placeholder="Email" className="form-control-input"
                  name="emailClient"
                  defaultValue={emailClient}
                  onChange={e => {
                     setClientProfileContext({ [e.target.name]: e.target.value })
                  }}
               />
            </Form.Group>
         </Form.Row> */}
         <br />
         <Form.Group controlId="formGridAddress1">
            <Form.Control placeholder="Adresse de livraison" className="form-control-input"
               name="adresseClient"
               defaultValue={adresseClient}
               onChange={e => {
                  setClientProfileContext({ [e.target.name]: e.target.value })
               }}
            />

         </Form.Group>
         <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
               <Form.Control placeholder="Code Postal" className="form-control-input"
                  name="cpClient"
                  defaultValue={cpClient}
                  onChange={e => {
                     setClientProfileContext({ [e.target.name]: e.target.value })
                  }}
               />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
               <Form.Control placeholder="Ville" className="form-control-input"
                  name="villeClient"
                  defaultValue={villeClient}
                  onChange={e => {
                     setClientProfileContext({ [e.target.name]: e.target.value })
                  }}
               />
            </Form.Group>
         </Form.Row>
         {/* <Link to="/payment" className={`${ !isValid && 'disabled' } btn btn-outline-success float-right`}>
                        Confirmer
                     </Link> */}






          <Form.Group as={Col} controlId="formGridName">
            <Form.Control className="form-control-input"
               name="emailClient"
               placeholder="Email"
               type="email"
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value)
                  setClientProfileContext({ [e.target.name]: e.target.value })
               }}
            />

         <CardElement id="card-element" onChange={handleChange} />
               <button  disabled={processing || disabled || succeeded} id="submit" >
            <span id="button-text">
               {processing ? ( <div className="spinner" id="spinner"></div> ) : ( "Confirmer" )}
            </span>
         </button>
         {/* Show any error that happens when processing the payment */}
         {error && (
            <div className="card-error" role="alert">
               {error}
            </div>
         )}
         {/* Show a success message upon completion */}
         <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your 
            <a href={`https://dashboard.stripe.com/test/payments`} > {" "} Stripe dashboard. </a> Refresh the page to pay again.
         </p>
         </Form.Group>
      </Form>
      </>
   );
};
export default CheckoutForm