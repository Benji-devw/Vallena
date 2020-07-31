import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'

import LinkScroll from './Links/Link_Scroll';
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

        <Link to='/' className='navbar-brand'> <span>Root</span> </Link>

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
            
            <li className='nav-item'>
              <LinkScroll target='/home' offset={-120} classes='nav-link'> Home </LinkScroll>
            </li>
            <li className='nav-item'>
              <LinkScroll target='/blog' classes='nav-link'> Blog </LinkScroll>
            </li>
            <li className='nav-item'>
              <LinkScroll target='about' classes='nav-link'> About </LinkScroll>
            </li>
            <li className='nav-item'>
              <LinkScroll target='contact' classes='nav-link'>  Contact  </LinkScroll>
            </li>


            <li>
              <Link to="/cart">
                <RiShoppingCart2Line size="1.7em"/>
                <span className="badge badge-pill badge-success">1</span>
              </Link>
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