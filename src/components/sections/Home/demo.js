import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




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
  
  const saveFilterByCat = (cat) => {
    localStorage.setItem('filterByCat', cat)
  }

  console.log('productsDb', productsDb);

  return (

      <div className="row justify-content-center">
        <div className="col-lg-12 pl-0 pl-lg-3 pr-0 pr-lg-3">


      </div>
      </div>

  );
};
export default HomeCollection