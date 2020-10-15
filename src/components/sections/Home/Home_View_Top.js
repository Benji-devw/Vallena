import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

import visage from '../../../scss/img/visage.svg';
// import promo from '../../../scss/img/promo.png';
// import round from '../../../scss/img/round.png';
import Logo from '../../../scss/img/Logo-Vallena.svg';
import deposit from '../../../scss/img/depositphotos_46127747-stock-photo-sewing-tools.png';
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




const SlideItems = props => {
  const [productsDb, setProductsDb] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    // autoplay: true,
    speed: 800,
    // fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    setProductsDb(props.data)
  }, [props.data]);
  
  const saveFilterByCat = (cat) => {
    localStorage.setItem('filterByCat', cat)
  }
  // countapi.visits().then((result) => {
  //   console.log(result.value);
  // });
  // console.log('productsDb', productsDb);


  return (

      <div className="row justify-content-center">
        <div className="col-lg-12 pl-0 pl-lg-3 pr-0 pr-lg-3 mt-3">

        <Slider {...settings}>
          <div>
          <div className="container">
          <div className="row slick-content content-one align-items-center">

              <div className="col-md-6 test text-center">

                  {/* <img src={Logo} alt="logo" className="logo-vallena" /> */}
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
                  <img src={deposit} alt="visage" className="img-fluid mx-auto deposit" />
                
              </div>
    
          </div>
          </div>
          </div>
            {productsDb.map(item => item.yearCollection === 2020 &&
              <div key={item._id}>
              <div className="container">
              <div className="row slick-content content-two align-items-center">
                <div className="col-md-6">
                  <span className="collection">Collection 2020</span>
                  <h3>{item.titleProduct}</h3> <br />
                  <p>{item.descriptionProduct}</p>
                    <h4>€ {item.priceProduct}</h4>

                    <Link to={`/product/${item._id}`}>
                      <Button variant="outlined" color="secondary">
                        Découvrir <MdKeyboardArrowRight className="ml-1" style={{ fontSize: "1.7em" }} />
                      </Button>
                    </Link>
                </div>

                <div className="col-md-6">
                  {/* <img src={round} alt="round" className="round" /> */}
                  <img src={item.imgCollection[0]} alt={item.titleProduct} className="img-fluid mx-auto" />

                </div>

              </div>
              </div>
              </div>
            )}
         
        

          {/* <div>
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
          </div> */}

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