import React, { Fragment } from 'react';

import Home from './Home/Home';
import About from './About/About';
// import Service from './Service/Service';
import Facts from './Facts/Facts';
import ShopDisplayProducts from './Shop/Shop_Display_Products';
// import Contact from './Contact/Contact';
// import MapMarker from './MapMarker/MapMarker';


const sections = props => {
  return (
    <Fragment>
      <Home />
      {/* <Service /> */}
      <ShopDisplayProducts />
      <About />
      <Facts />
      {/* <Contact /> */}
      {/* <MapMarker /> */}
    </Fragment>
  );
};

export default sections;
