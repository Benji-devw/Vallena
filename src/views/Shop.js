import React, { Fragment } from "react";
import DisplayProducts from '../components/sections/Shop/Shop_Display_Products';
import Footer from '../components/UI/Footer/Footer';

const Shop = () => {

  return (
    <Fragment>
      <main>
        <DisplayProducts/>
      </main>
      <Footer />
    </Fragment>
  );
}
export default Shop;
