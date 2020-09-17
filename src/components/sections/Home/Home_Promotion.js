import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'react-rellax'
import Slider from "react-slick";

const HomePromotion = () => {
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
    // console.log('productsDb', productsDb);
    
  // const saveFilterByCat = (cat) => {
  //   localStorage.setItem('filterByCat', cat)
  // }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
      
    ]
  };

  return (
      <div className="container">
      <div className="row no-gutters test align-items-center">
      <div className="col-lg-12">
        
        {/* <Parallax speed={-1} data-scroll> */}
        <div className="title-promotion">
          <h2>
          P R O M O T I O N
          </h2>
        </div>
        {/* </Parallax> */}


        <div>
          <Slider {...settings}>
            {productsDb.map((item, index) => ( item.promotionProduct === true &&
              <div key={index}>
                <div className="promotion-content">
                  <img src={item.imgCollection[0]} alt={item._id} className="img-fluid" />
                  <div className="item-details text-center">
                    <h2>{item.titleProduct}</h2>
                    <h5>{item.priceProduct}€ - <span>58€</span></h5>
                  </div>
                </div>
            </div>
            ))}
          </Slider>
        </div>

</div>
      </div>
      </div>

  );
};
export default HomePromotion