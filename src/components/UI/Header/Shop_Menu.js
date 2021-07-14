import React, {useEffect} from 'react';
import apis from '../../../apiCall/Call_Api'
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


export default function ScrollingMenu() {

  const [products, setProducts] = React.useState([]);
  const [catList, setCatList] = React.useState([]);
  
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
  }, [forMom])



  return (
    <ul className="scrolling-menu"> 

      <li>
        <Link to={`/shop`} className={`nav-link-out`} >
          Boutique 
          <NavigateNextIcon style={{ fontSize: "1.1em", color: "#191919c4" }} />
        </Link>
      </li>
      
      {catList.map((cat, id) =>
        <NavDropdown key={id} title={<div>{cat} <KeyboardArrowDownIcon style={{ fontSize: "1.1em", color: "#191919c4" }} /></div>} id="dropdown1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

          {products.map((product, id) => product.categoryProduct === cat &&
            <OverlayTrigger
              key={id}
              placement={'right'}
              delay={{ show: 250, hide: 100 }}
              overlay={
                <Tooltip id="tooltip-right">
                  <img src={product.imgCollection[0]} alt={id} style={{height:"100px"}}/>
                </Tooltip>
              }
            >
            <LinkContainer to={`/product/${product._id}`}>
              <NavDropdown.Item className="pl-2 pr-2 pb-1">
                {product.titleProduct}
              </NavDropdown.Item>
            </LinkContainer>

            </OverlayTrigger>
          )}

        </NavDropdown>
      )}

    </ul>
  );
}