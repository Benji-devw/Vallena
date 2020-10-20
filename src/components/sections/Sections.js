import React, { Fragment } from 'react';
import Home from './Home/Home';
import Footer from '../../components/UI/Footer/Footer';
// import Parallax from 'react-rellax'


const sections = () => {
  return ( 
    <Fragment>
      <div className="background-home">
        {/* <Parallax speed={1} data-scroll>
          <img src={visage} alt="visage" className="visage"/>
        </Parallax> */}
      <Home />
    </div> 
    <Footer />
    </Fragment>
  );
};
export default sections;