import React, { Fragment } from 'react';

import InfosClient from '../components/Checkout/infos_Client'
import Footer from '../components/UI/Footer/Footer'


const Checkout = () => {

   return (
      <Fragment>

         <main>
            <InfosClient />
         </main>

         <Footer />
      </Fragment>
   )
}
export default Checkout