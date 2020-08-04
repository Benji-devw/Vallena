import React, { Fragment } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkout_Form'


const Stripe = () => {

   const promise = loadStripe("pk_test_51HByVWAkOHy2ySzJ6pDEd2IqFEpveJBaanEqrf1DKGjNTNMM9vyB4Ehw2R5n12jd8mObnQGwOTDcQoDE7bOiSoxB00UwSgbNZN")


   return (
      <Fragment>
         <Elements stripe={promise}>
            <CheckoutForm />
         </Elements>
      </Fragment>
   )
}
export default Stripe