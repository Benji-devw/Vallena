import React, { Fragment } from "react";

// import Header from '../components/UI/Header/Header';
import Sections from '../../components/sections/Sections';
import Footer from '../../components/UI/Footer/Footer';

const Layout = props => {

  return (
    <Fragment>

      <main>
        <Sections />
      </main>
      
      <Footer />
    </Fragment>
  );
}
export default Layout;
