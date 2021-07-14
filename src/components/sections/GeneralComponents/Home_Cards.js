import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiCallProdcuts from '../../../apiCall/Call_Api'
import Alert from '@material-ui/lab/Alert';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import ScrollAnimation from 'react-animate-on-scroll'

import QuickView from './Quick_View'

import Arrow from '../../../scss/img/icons/arrow.svg'
import Slider from "react-slick";


function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <img src={Arrow} alt="next"
      className={''}
      style={{
        ...style,
        position: "absolute",
        top: "40%",
        right: "-2rem",
        height: "1.6em",
        cursor: "pointer",
        transform:"rotate(180deg)"
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <img src={Arrow} alt="prev"
      className={''}
      style={{
        ...style,
        position: "absolute",
        top: "40%",
        left: "-2rem",
        zIndex: 100,
        height: "1.6em",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
  );
}





const HomeCards = (props) => {

  const [productsDb, setProductsDb] = useState([])
  const [ind, setInd] = useState('')

  useEffect(() => {
    // apiCallProdcuts.getProductsPost({ filters: {categoryProduct: props.cat} }).then(product => {
    apiCallProdcuts.getProductsPost({ filters: { notes: JSON.stringify(props.val) } }).then(product => {
      setProductsDb(product.data.products)
    })
  }, [props.val]);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          initialSlide: 0,
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 468,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }]
  };

  return (
    <div className="col slick-home fadeIn">
      <div className="container slick-content-home">
        <Slider {...settings}>

          {productsDb.map((item, index) =>
            <div key={index}>

              <div className="hover-view m-2">
                <img src={item.imgCollection[0]} alt={item._id} className="img-fluid" onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)} />

                  <div className={`mt-3 after-img ${ind === index ? "fadeIn" : 'fadeOut'}`}>
                    <div onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)}>
                      <QuickView data={item}/>
                    </div>
                    <Link to={`/product/${item._id}`}
                      onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)}
                    >
                      <span>Découvrir</span>
                    </Link>
                  </div>
              </div>

              <div className={`slick-dets text-center`}>
                <p className="tags">{item.tags}</p>
                <h3>{item.titleProduct}</h3>
                <h5>{item.priceProduct}€ {item.promotionProduct && <span className="promo-price"> {item.oldPriceProduct}€ </span>}  </h5>
                {item.quantityProduct < 1 && <Alert severity="error" className="rupture mx-auto p-1" style={{ width: "110px", }}>Rupture</Alert>}

                {/* {item.promotionProduct && <div className="promotion">Promo</div>}
                {item.novelty && <div className="novelty">New</div>} */}
              </div>
              
            </div>
          )}

        </Slider>
      </div>
    </div>

  );
};
export default HomeCards