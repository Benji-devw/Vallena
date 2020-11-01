import React, {useEffect} from 'react';
import apis from '../../../apiCall/Call_Api'
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'



export default function ScrollingMenu() {

  const [products, setProducts] = React.useState([]);
  const [showNav, setShowNav] = React.useState(false);
  const [catList, setCatList] = React.useState([]);
  const [catToogle, setCatToogle] = React.useState("Bébé");

  const toogleCat = (event) => {
    setCatToogle(event.currentTarget.dataset.cat);
  };  
  const handleShow = () => {
    setShowNav(true);
  };
  const handleHide = () => {
    setShowNav(false);
  };

  const [forMom, setForMom] = React.useState(true)
  useEffect(() => {
    if (forMom) {
      apis.getProducts().then(res => {
        setProducts(res.data.products)
        // Filter catList
        const categorySet = new Set(res.data.products.map(cat => cat.categoryProduct));
        const catList = Array.from(categorySet).sort();
        setCatList(catList)
      })
      setForMom(false)
    }
  }, [])

  return (
    <div className="scrolling-menu">

      <span
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
      > 
      <Link to={`/shop`} className={`nav-link-scrolling-menu ${showNav ? "nav-link-in" : "nav-link-out"}`} onClick={handleHide}>
        Boutique 
        {/* <KeyboardArrowDownIcon /> */}
      </Link>

        <ul onMouseEnter={handleShow}
          className={`row nav-cat ${showNav ? "show-div fadeIn" : "hide-div"}`}
        >

          {catList.map((cat, id) => 
          <div key={id}>
            <li
              data-cat={cat}
              className={`cat-list ${catToogle === cat ? "hovering" : ""}`}
              onMouseEnter={toogleCat}
            >{cat} <NavigateNextIcon style={{float:"right", fontSize:"1.5em", color:"rgba(0,0,0,.4)"}} /></li>

              <ul className='nav-prod'>
                {products.map((product, id) => product.categoryProduct === catToogle &&
                  <Link key={id} to={`/product/${product._id}`} onClick={handleHide}>
                    
                    <OverlayTrigger
                      placement={'right'}
                      overlay={
                        <Tooltip id="tooltip-right" >
                         <img src={product.imgCollection[0]} alt={id} style={{height:"100px"}} onMouseEnter={handleHide}/>
                        </Tooltip>
                      }
                    > 
                      <li>{product.titleProduct}</li>
                    </OverlayTrigger>
               
                  </Link>
                )}
              </ul>
          </div>
          )}

        </ul>

      </span>

    </div>
  );
}