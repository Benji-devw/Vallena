import React, { Fragment } from "react";
import CartClient from '../components/Cart/Cart_Client'
import Footer from '../components/UI/Footer/Footer'

const CartShopping = () => {
  return (
    <Fragment>

     <main>
        <CartClient />
     </main>
    
      <Footer />
    </Fragment>
  );
}
export default CartShopping;
