import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LinkScroll from './Links/Link_Scroll';
import LinksAdmin from './Links/LinksAdmin';
import CartModal from '../../Cart/Cart_Modal'
// import { RiWindowsLine } from 'react-icons/ri';


const Nav = props => {
  // console.log('props', props)
// console.log(window.location);
  // console.log(`${window.location.origin}/product/`);
  const history = useHistory()

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
    <nav className={`navbar navbar-expand-md ${navClass}`}>
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
            if (toggeledNav) return 'show';
            return '';
          })()}`}
        >

          <ul className='navbar-nav ml-auto'>

            {window.location.pathname === "/" ?  (
              <>
                <li className='nav-item'>
                  <LinkScroll target='home' offset={-120} classes='nav-link'> Home </LinkScroll>
                </li>
                <li className='nav-item'>
                  <LinkScroll target='shop-display' classes='nav-link'> Shop </LinkScroll>
                </li>
                <li className='nav-item'>
                  <LinkScroll target='about' classes='nav-link'> About </LinkScroll>
                </li>
                <li className='nav-item'>
                  <LinkScroll target='contact' classes='nav-link'>  Contact  </LinkScroll>
                </li>
            </>
            ) : (
            <>
                <li  className='nav-item backTo'>
                    <div onClick={() => { history.goBack()} }classes='nav-link'>  Boutique  </div>
                </li>
            </>
            )}
            
            
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