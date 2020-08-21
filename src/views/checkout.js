import React, { Fragment } from 'react';
import Payment from '../components/Checkout/payment'
import Footer from '../components/UI/Footer/Footer'

const Checkout = () => {
   return (
      <Fragment>
         <main>
            <Payment />
         </main>
         <Footer />
      </Fragment>
   )
}
export default Checkout