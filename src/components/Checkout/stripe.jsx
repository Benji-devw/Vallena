import React, { Fragment } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkout_Form'

const promise = loadStripe("pk_test_dkqruS4Wn9fEWEMrRQ7qKBtV00iZ2mBdzz")

const Stripe = props => {

   // Recup Props Client
   const items = props.items

   return (
      <Fragment>
         <Elements stripe={promise}>
            <CheckoutForm amount={props.total} itemsCmd={items} status={props.status}/>
         </Elements>
      </Fragment>
   )
}
export default Stripe