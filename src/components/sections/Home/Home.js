import React, {useEffect, useState} from 'react';
import SlideItems from './Home_View_Top'
import HomeCollection from './Home_Collection'
import HomeCardsDisplay from './Home_Cards_Display'
import HomePromoNews from './Home_Promo_News'
import apiCall from '../../../apiCall/Products_Api'

// import Parallax from 'react-rellax'



const Home = () => {

  const [datas, setDatas] = useState([])

  useEffect(() => {
    apiCall.getProducts().then(product => {
      setDatas(product.data.products)
    })
  })

  return (
    <section id='home'>

      {/* <Parallax speed={1} data-scroll> */}
        <div id="home-slide" className="slider-home-one">
          <SlideItems data={datas} />
        </div>
      {/* </Parallax> */}

      <div className="home-promo-novelty">
        <HomePromoNews data={datas} />
      </div>

      <div id="collection" className="collection-home">
        <HomeCollection data={datas} />
      </div>     
      
       <div id="home-category" className="category-home">
        {/* <HomeCategory data={datas} /> */}
      </div>

      <div id="home-best-cards" className="home-best-cards">
        <HomeCardsDisplay data={datas} />
      </div>


    </section>
  );
};

export default Home;
