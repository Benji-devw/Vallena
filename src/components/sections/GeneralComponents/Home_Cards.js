import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiCallProdcuts from '../../../apiCall/Call_Api'
import Alert from '@material-ui/lab/Alert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ScrollAnimation from 'react-animate-on-scroll'



const HomeCards = (props) => {

  const [productsDb, setProductsDb] = useState([])
  const [ind, setInd] = useState('')

  useEffect(() => {
    // apiCallProdcuts.getProductsPost({ filters: {categoryProduct: props.cat} }).then(product => {
    apiCallProdcuts.getProductsPost({filters: {notes: JSON.stringify(props.val)}}).then(product => {
      setProductsDb(product.data.products)
    })
  }, [props.val]);

 

  return (
    // <ScrollAnimation animateIn='fadeIn'>
    <div className="row fadeIn">


      {productsDb.map((item, index) => 
      <div key={index} className="col-lg-3 col-md-6 col-sm-6 home-card p-0"
        onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)}
      >
          <div className="m-2 home-card-content">
            <Link to={`/product/${item._id}`}>
                  
              <img src={item.imgCollection[0]} alt={item._id} className="card-img" />

              <div className={`p-2 ${ind === index ? "hover-tab " : 'hover-tab-disable'}`}>
                <div className={`hover-tab-content text-center`}>

                  <div className={`hover-tab-quick-view text-left slideInLeft`}>
                    <VisibilityIcon />
                    <br />
                    <FavoriteBorderIcon />
                  </div>

                    <h3 className="fadeIn">Découvrir</h3>

                </div>
              </div>

            </Link>
          </div>


          <div className="text-center home-card-desc">
            <p className="tags">{item.tags}</p>
            <h3>{item.titleProduct}</h3>

            <h5>€ {item.priceProduct}  {item.promotionProduct && <span className="promo-price">€ {item.oldPriceProduct} </span>}  </h5>
            {item.quantityProduct < 1 && <Alert severity="error" className="rupture">Rupture</Alert>}

          </div>

      </div>
      )}

    </div>
    // </ScrollAnimation>

  );
};
export default HomeCards