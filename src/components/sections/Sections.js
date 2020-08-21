import React, { Fragment } from 'react';
import Home from './Home/Home';
import About from './About/About';

import Facts from './Facts/Facts';
import ShopDisplayProducts from './Shop/Shop_Display_Products';

const sections = () => {
  return (
    <Fragment>
      <Home />
      <ShopDisplayProducts />
      <About />
      <Facts />
    </Fragment>
  );
};
export default sections;