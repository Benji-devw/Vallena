import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

import visage from '../../../scss/img/visage.svg';
// import promo from '../../../scss/img/promo.png';
import round from '../../../scss/img/round.png';
import tab from '../../../scss/packImages/home-full-width-4.png';
import Jetblack from '../../../scss/packImages/Jetblack.png';
import Button from '@material-ui/core/Button';





function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <IoIosArrowForward
      className={'slick-arrow slick-n'}
      style={{ ...style, 
        display: "block", 
        fontSize: "2.5em",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <IoIosArrowBack
      className={'slick-arrow slick-p'}
      style={{
        ...style,
        display: "block",
        fontSize: "2.5em",
      }}
      onClick={onClick}
    />
  );
}




const SlideItems = () => {
  const [productsDb, setProductsDb] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

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
  
  const saveFilterByCat = (cat) => {
    localStorage.setItem('filterByCat', cat)
  }

  // console.log('productsDb', productsDb);

  return (

      <div className="row justify-content-center">
        <div className="col-lg-12 pl-0 pl-lg-3 pr-0 pr-lg-3">

        <Slider {...settings}>
          <div>
          <div className="container">
          <div className="row slick-content content-one align-items-center">

              <div className="col-md-6 test text-center">
                <h2>Vallena.fr</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem consectetur, tincidunt leo vitae, euismod purus.</p>
                    <Link to="/shop">
                      <Button variant="contained" color="secondary">
                        Boutique <MdKeyboardArrowRight className="ml-1" 
                          style={{fontSize:"1.7em"}} 
                          onClick={saveFilterByCat('All')}
                        />
                      </Button>
                    </Link>
              </div>

              <div className="col-md-6 test">
                <img src={visage} alt="visage" className="img-fluid visage" />
                <img src={Jetblack} alt="visage" className="img-fluid mx-auto" />
                
              </div>
    
          </div>
          </div>
          </div>
            {productsDb.map(item => item.promotionProduct === true &&
              <div key={item._id}>
              <div className="container">
              <div className="row slick-content content-two align-items-center">
                <div className="col-md-6">
                  <span className="collection">Collection 2020</span>
                  <h3>{item.titleProduct}</h3>
                  <h4>{item.priceProduct}€</h4>
                  <p>{item.descriptionProduct}</p>
                    <Link to={`/product/${item._id}`}>
                      <Button variant="outlined" color="secondary">
                        Découvrir <MdKeyboardArrowRight className="ml-1" style={{ fontSize: "1.7em" }} />
                      </Button>
                    </Link>
                </div>

                <div className="col-md-6">
                  {/* <img src={round} alt="round" className="round" /> */}
                  <img src={item.imgCollection[2]} alt="visage" className="img-fluid mx-auto" />

                </div>

              </div>
              </div>
              </div>
            )}
         
        

          <div>
          <div className="container">
          <div className="row slick-content content-three align-items-center">

            <div className="col-md-6 test">
              <h2>Bienvenue sur <br /> Vallena.fr</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem consectetur, tincidunt leo vitae, euismod purus.</p>
            </div>

            <div className="col-md-6 test">
              <img src={round} alt="round" className="round" />
              <img src={tab} alt="visage" className="img-fluid mx-auto" />

            </div>

          </div>
          </div>
          </div>

          {/* 
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div> */}
        </Slider>

      </div>
      </div>

  );
};
export default SlideItems