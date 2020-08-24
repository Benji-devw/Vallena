import React, { Fragment, useState } from "react";
import Sections from '../components/sections/Sections';
import Footer from '../components/UI/Footer/Footer';
import { Row, Col } from 'react-bootstrap';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import CartHome from '../components/Cart/Cart_Home'

const Layout = () => {

  const [sidebarToggle, setSidebarOpen] = useState(false)
  const items = useSelector(state => state.items)

  const closeSidebar = () => {
    setSidebarOpen(false)
  }
  const openSidebar = () => {
    setSidebarOpen(true)
  }


  return (
    <Fragment>
      <main>
        <Row className="no-gutters">
          <Col md={12}>
            <Sections/>
          </Col>

          <aside className={sidebarToggle ? 'sidebar sidebarOpen' : 'sidebar sidebarClosed'}>
            <div className={sidebarToggle ? "cart-btn mt-5 push-in" : "cart-btn mt-5 push-out" }
                onClick={sidebarToggle ? closeSidebar : openSidebar}
              >
                <div className="bounceInRight">
                  <RiShoppingCart2Line className="cart-home" size="2.5em" />
                  {/* <span className="badge-primary">{items.length > 0 && items.length}</span> */}
                <span className={`badge-cart badge-pill ${items.length > 0 && 'badge-primary'}`}>{items.length > 0 && items.length}</span>
                </div>

            </div>
 
            <CartHome />
            
          </aside>
        </Row>
      </main>
      <Footer />
    </Fragment>
  );
}
export default Layout;
