import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import LinkScroll from './Links/Link_Scroll';
import LinksAdmin from './Links/LinksAdmin';
import CartModal from '../../Cart/Cart_Modal'
// import { RiWindowsLine } from 'react-icons/ri';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    zIndex: "100",
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(.8em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));






const Nav = props => {
  // console.log('props', props)
// console.log(window.location);
  // console.log(`${window.location.origin}/product/`);
  // const history = useHistory()

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
    <nav className={`navbar navbar-expand-md no-gutters p-0 ${navClass}`}>
      <div className='container'>

        <div className="row align-items-center" style={{width:"100%"}}>


          <div className="col-4 search-bar">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase 
                  placeholder="Rechercher ..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
          </div>





          <div className="col-4 text-center">
             <Link to='/' className='navbar-brand mx-auto'> Valelana.fr </Link>
          </div>



          <div className="col-4">



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

              <ul className='navbar-nav ml-auto align-items-center'>

                {/* {window.location.pathname === "/" ?  ( */}
                  <>
                  <Link to='/shop' className='nav-link'>
                    <li classes=''> Boutique </li>
                  </Link>
                    {/* <li className='nav-item'>
                      <LinkScroll target='home-slide' offset={-120} classes='nav-link'> Home </LinkScroll>
                    </li> */}
                    {/* <li className='nav-item'>
                      <LinkScroll target='home-slide' offset={-120} classes='nav-link'> Home </LinkScroll>
                    </li>
                    <li className='nav-item'>
                      <LinkScroll target='collection' classes='nav-link'> Collections </LinkScroll>
                    </li>
                    <li className='nav-item'>
                      <LinkScroll target='slider-home-promotion' classes='nav-link'> pomotions </LinkScroll>
                    </li> */}
                    <li className='nav-item'>
                      <LinkScroll target='contact' classes='nav-link'>  Contact  </LinkScroll>
                    </li>
                </>
                {/* ) : ( */}
                {/* <> */}
                    {/* <li  className='nav-item backTo'>
                        <div onClick={() => { history.goBack()} }classes='nav-link'>  Boutique  </div>
                    </li> */}
                    {/* <Link to='/shop'  className='nav-item'>
                        <li classes='nav-link'> Boutique </li>
                    </Link> */}
                {/* </> */}
                {/* )} */}
                
                
                <li className="nav-icons">
                  <FavoriteBorderIcon />
                  <span className={`badge-icons badge-pill badge-primary`}>0</span>
                </li>
                <li className="nav-icons ml-2">
                  <CartModal />
                </li>
                <li>
                  <LinksAdmin />
                </li>
                

              </ul>
            </div>

          </div>



        </div>



      </div>
    </nav>
  );
};

export default Nav;