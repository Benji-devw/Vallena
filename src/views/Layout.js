import React, { Fragment } from "react";
import Sections from '../components/sections/Sections';
import Footer from '../components/UI/Footer/Footer';

const Layout = () => {
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
