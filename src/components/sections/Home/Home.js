import React from 'react';
import SlideItems from './Home_View_Top'
import HomeCollection from './Home_Collection'
import HomePromotion from './Home_Promotion'
import HomePromoNews from './Home_Promo_News'

import Parallax from 'react-rellax'

// import areca from '../../../scss/img/areca.png';


const Home = () => {


  return (
    <section id='home'>

      {/* <img src={areca} alt="areca" className="areca img-fluid" draggable="false"/> */}
        <Parallax speed={1} data-scroll>
      <div className="slider-home-one">
        <SlideItems />
      </div></Parallax>

      <div className="home-promo-novelty">
        <HomePromoNews />
      </div>

      <div className="collection-home">
        <HomeCollection />
      </div>

      <div className="slider-home-promotion">
        <HomePromotion />
      </div>


    </section>
  );
};

export default Home;
