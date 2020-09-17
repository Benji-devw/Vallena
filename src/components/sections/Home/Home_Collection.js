import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'react-rellax'

import collection2020 from '../../../scss/img/home/collection2020.png'
import collection2019 from '../../../scss/img/home/collection2019.png'
import collection2018 from '../../../scss/img/home/collection2018.png'


const HomeCollection = () => {
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


  return (

      <div className="row no-gutters align-items-center">
      <div className="col-lg-12">
        
        <Parallax speed={-1} data-scroll>
        <div className="title-collection">
          <h2>
          C O L L E C T I O N S
          </h2>
        </div>
        </Parallax>

        <div className="container">
          <Parallax speed={1} data-scroll>
        <div className="row collection-content align-items-center justify-content-center">

          <div className="col-md-3 p-1 collection collection-2019 text-center">
            <Link to="/shop">
              <h2 className="collection-nine">Collection 2019</h2>
              <div className="over-f">
                <img src={collection2019} alt="img2029" className="img-fluid" />
              </div>
            </Link>
          </div>

          <div className="col-md-4 p-2 collection collection-2020 text-center">
            <Link to="/shop">
              <h2 className="collection-twelve">Collection 2020</h2>
              <div className="over-f">
                <img src={collection2020} alt="img2020" className="img-fluid" />
              </div>
            </Link>
          </div>
          
          <div className="col-md-3 p-2 collection collection-2018 text-center">
            <Link to="/shop">
              <h2 className="collection-eight">Collection 2018</h2>
              <div className="over-f">
                <img src={collection2018} alt="img2018" className="img-fluid" />
              </div>
            </Link>
          </div>

        </div>
          </Parallax>
        </div>

      </div>
      </div>

  );
};
export default HomeCollection