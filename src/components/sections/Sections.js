import React, { Fragment } from 'react';
import Home from './Home/Home';
// import About from './About/About';
import Footer from '../../components/UI/Footer/Footer';

import DisplayProducts from "./Shop/Shop_Display_Products";

// import Facts from './Facts/Facts';

const sections = () => {
  return (
    <Fragment>
      {/* <div className="background-animate"></div> */}

      <Home />
      <DisplayProducts />
      {/* <About />
      <Facts /> */}

      
      <Footer />

    </Fragment>
  );
};
export default sections;