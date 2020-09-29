import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";






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
    // IndexDB getAll
    setTimeout(() => {    // setTimeout sinon ce rend avant App/IndexDbInit()
      var request = indexedDB.open('customers', 2);
      request.onsuccess = function (event) {
        const db = event.target.result
        db.transaction('product').objectStore('product')
          .getAll().onsuccess = function (event) {
            setProductsDb(event.target.result);
          }
      }
    }, 300);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [

      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 468,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }

    ]
  };

  return (
    <div className="row slick-component no-gutters align-items-center">
      <div className="col-lg-12">
        <div className={`container slick-content`}>
          <Slider {...settings}>
            {productsDb.map((item, index) => 
            (item.categoryProduct === props.cat &&
              <div key={index}>
                {console.log('item.categoryProduct', props.cat)}
                <div className="m-2">
                  <Link to={`/product/${item._id}`}>
                    <img src={item.imgCollection[0]} alt={item._id} className="img-fluid" />
                  </Link>
                </div>
                <div className={`text-center slick-dets`}>
                  <h2>{item.titleProduct}</h2>
                  <h5>{item.priceProduct}€ - <span>58€</span></h5>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>

  );
};
export default SlickComponent