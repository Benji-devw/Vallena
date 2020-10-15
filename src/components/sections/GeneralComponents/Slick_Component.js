import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import apiCall from '../../../apiCall/Products_Api'





function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <IoIosArrowForward
      className={''}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        right: 0,
        fontSize: "2.5em",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <IoIosArrowBack
      className={''}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        left: 0,
        zIndex: 100,
        fontSize: "2.5em",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
  );
}




const SlickComponent = (props) => {

  const [productsDb, setProductsDb] = useState([])

  useEffect(() => {
    apiCall.getProducts().then(product => {
      setProductsDb(product.data.products)
    })
  }, []);

  var settings = {
    // dots: true,
    infinite: false,
    // speed: 500,
    // autoplay: true,
    // autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 468,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    }]
  };

  return (

    <div className="col slick-component">
      <div className="container slick-content">
        <Slider {...settings}>

          {productsDb.map((item, index) => 
          (item.categoryProduct === props.cat &&
            <div key={index}>
              {/* {console.log('item.categoryProduct', props.cat)} */}
              <div className="m-2">
                <Link to={`/product/${item._id}`}>
                  <img src={item.imgCollection[0]} alt={item._id} className="img-fluid" />
                </Link>
              </div>
              <div className={`text-center slick-dets`}>
                <h2>{item.titleProduct}</h2>
                <h5>€ {item.priceProduct}  {item.promotionProduct && <span className="promo-price">€ {item.oldPriceProduct} </span>}  </h5>
              </div>
            </div>
          ))}

        </Slider>
      </div>
    </div>


  );
};
export default SlickComponent