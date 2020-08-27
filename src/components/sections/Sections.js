import React, { Fragment } from 'react';
import Home from './Home/Home';
import About from './About/About';

import DisplayProducts from "./Shop/Shop_Display_Products";

import Facts from './Facts/Facts';

const sections = () => {
  return (
    <Fragment>
      {/* <div className="background-animate"></div> */}

      <Home />
      <DisplayProducts />
      <About />
      <Facts />
    </Fragment>
  );
};
export default sections;