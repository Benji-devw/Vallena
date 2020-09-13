import React, { Fragment } from 'react';
import Home from './Home/Home';
// import Logos from './Home/Logos'
// import About from './About/About';
import Footer from '../../components/UI/Footer/Footer';

// import DisplayProducts from "./Shop/Shop_Display_Products";

// import Parallax from 'react-rellax'
// import visage from '../../scss/img/visage.svg';

// import Facts from './Facts/Facts';

const sections = () => {

  return ( 
    <Fragment>
      <div className="background-home">

        {/* <Parallax speed={1} data-scroll>
          <img src={visage} alt="visage" className="visage"/>
        </Parallax> */}

      <Home />
      {/* <Logos /> */}
      {/* <DisplayProducts /> */}
      {/* <About />
      <Facts /> */}

    </div> 

    <Footer />

    </Fragment>
  );
};
export default sections;