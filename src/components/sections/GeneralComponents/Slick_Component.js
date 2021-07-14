import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Arrow from '../../../scss/img/icons/arrow.svg'

import apiCallProdcuts from '../../../apiCall/Call_Api'
import Alert from '@material-ui/lab/Alert';
import QuickView from './Quick_View'



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
        transform: "rotate(180deg)"
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




const SlickComponent = (props) => {
  // console.log(props.currentId);
  const [productsDb, setProductsDb] = useState([])
  const [ind, setInd] = useState('')

  useEffect(() => {
    apiCallProdcuts.getProductsPost({ filters: {categoryProduct: props.cat} }).then(product => {
      const filterCurrentIdex = product.data.products.filter(filtering => filtering._id !== props.currentId)
      setProductsDb(filterCurrentIdex)
    })
  }, [props.cat, props.currentId]);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 4,
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

    <div className="col slick-component">
      <div className="container slick-content">
        <Slider {...settings}>

          {productsDb.map((item, index) => 
            <div key={index}>
              <div className="m-2">
                
                <img src={item.imgCollection[0]} alt={item._id} className="img-fluid" onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)} />
                
                <div className={`after-img ${ind === index ? "fadeIn" : 'fadeOut'}`}>
                  <div onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)}>
                    <QuickView data={item} />
                  </div>
                  <Link to={`/product/${item._id}`}
                    onMouseEnter={() => setInd(index)} onMouseLeave={() => setInd(null)}
                  >
                    <span>Découvrir</span>
                  </Link>
                </div>
              </div>
              <div className={`pl-2 slick-dets text-center`}>
                <p className="tags">{item.tags}</p> 
                <h3>{item.titleProduct}</h3>
                <h5>€ {item.priceProduct}  {item.promotionProduct && <span className="promo-price">€ {item.oldPriceProduct} </span>}  </h5>
                {item.quantityProduct < 1 && <Alert severity="error" className="rupture mx-auto p-1" style={{width:"110px",}}>Rupture</Alert>}
                
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
export default SlickComponent