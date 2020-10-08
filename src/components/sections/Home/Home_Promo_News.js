import React from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'react-rellax'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import imgPromo from '../../../scss/packImages/nouveau-nés-les-enfants-le.jpg'
import imgNews from '../../../scss/packImages/vêtements-pour-femmes.jpg'




const HomePromoNews = () => {

  // const saveFilterByCat = (cat) => {
  //   localStorage.setItem('filterByCat', cat)
  // }


  return (

      <div className="row no-gutters align-items-center">
      <div className="col-lg-12">

        <div className="container">
          <Parallax speed={2} data-scroll>
        <div className="row home-promo-novelty-content align-items-center justify-content-center">

          <div className="col-md-6 home-promo">
            <div className="home-promo-content">
              <h2 className=" title">Promotion</h2> 
              <Link to="/shop">Decouvrir <ArrowForwardIosIcon /></Link>
              <div className="text-right">
                 <Link to="/shop"> <img src={imgNews} alt="img202" className="" /></Link>
              </div>
           
            </div>
            
          </div>

          <div className="col-md-6 home-novelty">
            <div className="home-novelty-content">
              <h2 className="title">Nouveauté</h2>
            <Link to="/shop">Decouvrir <ArrowForwardIosIcon /></Link> 
              <div className="text-right">
                <Link to="/shop"><img src={imgPromo} alt="img202" className="" /></Link>
              </div>
           
            </div>
          </div>

        </div>
          </Parallax>
        </div>

      </div>
      </div>

  );
};
export default HomePromoNews