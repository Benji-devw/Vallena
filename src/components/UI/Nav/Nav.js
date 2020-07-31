import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'


import Cart from '../../../views/Cart'

import Link from './Links/Link';
import LinksAdmin from './Links/LinksAdmin'

import { RiShoppingCart2Line } from 'react-icons/ri';

const Nav = () => {
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
    <nav className={`navbar navbar-expand-md bg-light ${navClass}`}>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          <span>Root</span>
          <i className='fas fa-circle ml-1' />
        </a>
        <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return 'open';
            return '';
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return 'show';
            return '';
          })()}`}
        >

          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link target='home' offset={-120} classes='nav-link'>
                Home
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link target='services' classes='nav-link'>
                Services
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link target='blog' classes='nav-link'>
                Blog
              </Link>
            </li>
            <li className='nav-item'>
              <Link target='about' classes='nav-link'>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link target='contact' classes='nav-link'>
                Contact
              </Link>
            </li>
            <li>
              
              {/* <Link path="/cart" target='' classes='nav-link'>
                <div>
                <RiShoppingCart2Line size="2em"/>
                  <span className="badge badge-pill badge-success">1</span>
                </div>
              </Link>*/}
            </li> 

            
            <li className='nav-item'>
              <LinksAdmin />
            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;