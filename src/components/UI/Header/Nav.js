import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import LinkScroll from './Links/Link_Scroll';
import LinksAdmin from './Links/LinksAdmin';
import CartModal from '../../Cart/Cart_Modal'
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import ScrollingMenu from './Shop_Menu'

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';





const useStyles = makeStyles((theme) => ({
  search: {
    // position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    zIndex: "100",
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: "5px",
    bottom: "3px",
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: "100%",
    color: 'inherit',
  },
  inputInput: {
    border: "1px solid rgba(0,0,0, .3);",
    padding: theme.spacing(1, 1, 1, 0),
    height: ".8rem",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(.4em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
      // width: '100%',
      // '&:focus': {
      //   width: '30ch',
      // },
    // },
  },

  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

}));


/***** Small Menu *****/
/*****************/
function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to='/shop' className='nav-link'>
          <li classes=''> Boutique </li>
        </Link>
        <li className='nav-item'>
          <LinkScroll target='contact' classes='nav-link'>  Contact  </LinkScroll>
        </li>

        <li>
          <LinksAdmin />
        </li>
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{
            outline: 'none',
            borderBottom: '1px solid #f50057',
            marginLeft: '3rem',
            borderRadius: "1px"
          }} 
            className="btn-toggle-nav" 
            onClick={toggleDrawer(anchor, true)}
          >{'Menu'}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}



const Nav = props => {
  const [navClass, setNavClass] = useState('');
  const [toggeledNav, settoggeledNav] = useState(false);
  const classes = useStyles();

  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let navClass = '';
      if (window.scrollY >= 300) {
        navClass = 'scrolled';
      }
      setNavClass(navClass);
    });
  }, []);



  return (
    <nav className={`navbar navbar-expand-md no-gutters  ${navClass}`}>
      <div className='container'>
        <div className="row justify-content-center align-items-center" style={{ width: "100%" }}>

        <div className="col-12 mt-1 pt-1 pb-1">
        <div className="row">
          
          <div className="col-4 nav-title">
            <Link to='/' className='navbar-brand text-center'>Vallena</Link>
          </div>

          <div className="col-4 search-bar">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Rechercher..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>

          <div className="col-4">
            <div className={`navbar-toggler mx-auto`}
              onClick={toggleNav}
            >
              <div className="row">
                <div className="col-8">
                  <ul className='navbar-nav ml-auto align-items-center'>

                    <li className="nav-icons-small last">
                      <span className={`badge-icons badge-pill`}>0</span>
                      <FavoriteBorderIcon />
                    </li>

                    <li className="nav-icons-small">
                      <CartModal />
                    </li>

                  </ul>
                </div>
                <div className="col-2 ml-5">
                  {TemporaryDrawer()}
                </div>
              </div>
            </div>

            <div className={`collapse navbar-collapse `}>
              <ul className='navbar-nav ml-auto align-items-center'>

                <li className="nav-icons">
                  <span className={`badge-icons badge-pill`}>0</span>
                  <FavoriteBorderIcon />
                </li>
                <li className="nav-icons mr-2">
                  <CartModal />
                </li>
                <li className='nav-item'>
                  <LinkScroll target='contact' classes='nav-link'>  Contact  </LinkScroll>
                </li>
                <li>
                  <LinksAdmin />
                </li>
              </ul>
            </div>
          </div>

        </div>
        </div>

        <div className="col-12 nav-items">
              <ScrollingMenu />
        </div>      

        </div>
      </div>
    </nav>
  );
};

export default Nav;