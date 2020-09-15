import React, { useEffect, useState } from 'react';
// import Parallax from 'react-rellax'
// import soleil from '../../../scss/img/soleil.png';
import Parallax from 'react-rellax'
import areca from '../../../scss/img/areca.png';
import Viewpager from './Home_View_Top'



const Home = () => {

  const [productsDb, setProductsDb] = useState([])

  useEffect(() => {

    // IndexDB GETALL PRODUCT
    var request = indexedDB.open('customers', 2);
    request.onsuccess = function (event) {
      const db = event.target.result
      db.transaction('product').objectStore('product')
        .getAll().onsuccess = function (event) {
          setProductsDb(event.target.result )
        }
    }

  }, [])

  console.log(productsDb);
  return (
    <section id='home'>

      <img src={areca} alt="areca" className="areca img-fluid" draggable="false"/>
    
      <div className='row home-content justify-content-center align-items-center home-content no-gutters'>

          <div className='col p-2 section-header-dark home-intro text-center'>
            {/* <Viewpager /> */}
          </div>

  
        
        </div>

    </section>
  );
};

export default Home;
