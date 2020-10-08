import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LinkScroll from './Links/Link_Scroll';
import LinksAdmin from './Links/LinksAdmin';
import CartModal from '../../Cart/Cart_Modal'
// import { RiWindowsLine } from 'react-icons/ri';


const Nav = props => {
  // console.log('props', props)
// console.log(window.location);
  // console.log(`${window.location.origin}/product/`);
  // const history = useHistory()

  const [navClass, setNavClass] = useState('');
  const [toggeledNav, settoggeledNav] = useState(false);

  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let navClass = '';
      if (window.scrollY >= 200) {
        navClass = 'scrolled';
      }
      setNavClass(navClass);
    });
  }, []);
  return (
    <nav className={`navbar navbar-expand-md no-gutters p-0 ${navClass}`}>
      <div className='container'>

        <Link to='/' className='navbar-brand'> <span>Valelana.fr</span> </Link>

        <div className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return 'open';
            return '';
          })()}`}
          onClick={toggleNav}
        >
          <span /> <span /> <span />
        </div>

        <div className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return 'show bg-white';
            return '';
          })()}`}
        >

          <ul className='navbar-nav ml-auto'>

            {/* {window.location.pathname === "/" ?  ( */}
              <>
              <Link to='/shop' className='nav-item'>
                <li classes='nav-link'> Boutique </li>
              </Link>
                <li className='nav-item'>
                  <LinkScroll target='home-slide' offset={-120} classes='nav-link'> Home </LinkScroll>
                </li>
                <li className='nav-item'>
                  <LinkScroll target='collection' classes='nav-link'> Collections </LinkScroll>
                </li>
                <li className='nav-item'>
                  <LinkScroll target='slider-home-promotion' classes='nav-link'> pomotions </LinkScroll>
                </li>
                <li className='nav-item'>
                  <LinkScroll target='contact' classes='nav-link'>  Contact  </LinkScroll>
                </li>
            </>
            {/* ) : ( */}
            <>
                {/* <li  className='nav-item backTo'>
                    <div onClick={() => { history.goBack()} }classes='nav-link'>  Boutique  </div>
                </li> */}
                {/* <Link to='/shop'  className='nav-item'>
                    <li classes='nav-link'> Boutique </li>
                </Link> */}
            </>
            {/* )} */}
            
            
            <li>
              <CartModal />
            </li>
            <li>
              <LinksAdmin />
            </li>
            

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;