import React from 'react';
import { Link } from 'react-scroll';

const LinkScroll = props => {

  return (
    <Link
      className={props.classes}
      style={{ cursor: 'pointer' }}
      activeClass='active'
      to={props.target}
      spy={true}
      smooth={true}
      offset={props.offset || -40}
      duration={500}
    >
      {props.children}
    </Link>
  );
};

export default LinkScroll;
