import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { MdKeyboardArrowRight } from "react-icons/md";

import visage from '../../../scss/img/home/img-1.png';
// import deposit from '../../../scss/img/depositphotos_46127747-stock-photo-sewing-tools.png';
import Button from '@material-ui/core/Button';





function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className={'slick-arrow slick-n'}
      style={{ ...style, 
        display: "block", 
        fontSize: "2.5em",
        transform: "rotate(180deg)",
        zIndex: "100"
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
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
    autoplay: true,
    speed: 800,
    fade: true,
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
  
 
  // countapi.visits().then((result) => {
  //   console.log(result.value);
  // });
  // console.log('productsDb', productsDb);


  return (

      <div className="row justify-content-center no-gutters">
        <div className="col-lg-12 pl-0 pl-lg-3 pr-0 pr-lg-3 mt-5">

        <Slider {...settings}>
          <div>
          <div className="container">
          <div className="row slick-content content-one align-items-center">

              <div className="col-md-6 text-center">
                  {/* <img src={Logo} alt="logo" className="logo-vallena" /> */}
                <h1 className="m-0 p-0">Vallena.fr</h1>
                  {/* <p>Les produits sont fabriqués dans un petit atelier de couture d'Ardèche.<br />
                    Ils sont pour la plupart, fait à la main et donc en quantité réduite mais en majorité UNIQUE,...
                    </p> */}
                  <p>ATELIER DE COUTURE<br /> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec convallis justo. Nam finibus lobortis nisl, vel bibendum ex sollicitudin ultrices. Suspendisse potenti. Curabitur quis augue lorem.
                    </p>
                    <Link to="/shop">
                      <Button variant="contained" color="secondary">
                        Boutique <MdKeyboardArrowRight className="ml-1" 
                          style={{fontSize:"1.7em"}} 
                        />
                      </Button>
                    </Link>

              </div>
              <div className="col-md-6 text-center">
                    <img src={visage} alt="123RF"className="text-right" />
              </div>

          </div>
          </div>
          </div>

                    
          {productsDb.map(item => item.yearCollection === 2020 &&
            <div key={item._id}>
            <div className="container">
            <div className="row slick-content content-two align-items-center p-3">
              <div className="col-md-6">
                <span className="collection">Collection 2020</span>
                <h2>{item.titleProduct}</h2> <br />
                <p>{item.descriptionProduct}</p>
                  <h4>{item.priceProduct} €</h4>

                  <Link to={`/product/${item._id}`}>
                    <Button variant="outlined" color="secondary">
                      Découvrir 
                      <MdKeyboardArrowRight className="ml-1" 
                      style={{ fontSize: "1.7em" }} />
                    </Button>
                  </Link>
              </div>

              <div className="col-md-6 p-2">
                {/* <img src={round} alt="round" className="round" /> */}
                <img src={item.imgCollection[0]} alt={item.titleProduct} className="img-fluid mx-auto" />

              </div>

            </div>
            </div>
            </div>
          )}
         
    
        </Slider>

      </div>
      </div>

  );
};
export default SlideItems