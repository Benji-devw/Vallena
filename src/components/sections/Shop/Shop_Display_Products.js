import React, { useEffect, useState} from 'react';
import apiCall from '../../../apiCall/Products_Api'

import ListProducts from './Shop_List_Products';
import FilterTop from './components/Filter_Top';
import FilterLeft from './components/Filter_Left'



const DisplayProducts = () => {
   const [products, setProducts] = useState([])
   // console.log('products', products)
   const [allProducts, setAllProducts] = useState([])
   
   const [sort, setSort] = useState("")
   // const [matterList, setMatterList] = useState("")
   const [filterByCat, setFilterByCat] = useState(["All"])
   const [Filters, setFilters] = useState({
     cat:[], matter: [], color: [], yearCollection: []
   })


   useEffect(() => {
      console.log('test');
      apiCall.getProducts().then(res => {
         // console.log('res', res)
         setProducts(res.data.products)
         setAllProducts(res.data.products)
      })

   }, []);

   const sortProducts = (event) => {
      // console.log('event', event.target.value)
      const sort = event.target.value
      setSort( sort )
      setProducts(
         products.slice()
         .sort((a, b) =>
            sort === "lowest" ?
               a.priceProduct < b.priceProduct ? 1 : -1
               :
               sort === "highest" ?
                  (a.priceProduct > b.priceProduct) ? 1 : -1
                  :
                  (a._id < b._id) ? 1 : -1
         )
      )
   }

   const searchBar = (input) => {
      const fullListMap = allProducts.map(prod => prod)
      let fullList = fullListMap.flat()
      setProducts( fullList.filter(product => {
            const name = product.titleProduct.toLowerCase();
            const term = input.toLowerCase()
            return name.indexOf(term) > -1
         })
      )
   }

   const showFilteredResult = (filters) => {
      let variables = {
         filters: filters,
      }
      console.log('variables', variables)

      apiCall.getProductsPost(variables).then(res => {
         setProducts([...res.data.products])
      })
   }

   const filterProductsByCat = (event) => {

      if (event === "All") {
         setProducts(allProducts);
         setFilterByCat("All")
      }
      else {
         setFilterByCat(event)
      }

   };

   const handleFilters = (value, key) => {
      const newValue = {...Filters}

      newValue[key] = value

      showFilteredResult(newValue)
      setFilters(newValue)

   }


   // Filter cat
   const categorySet = new Set(allProducts.map(p => p.categoryProduct));
   const catList = Array.from(categorySet).sort();
   // Filter Matter
   const matterSet = new Set(allProducts.map(p => p.matter));
   const matterList = Array.from(matterSet).sort();   
   // Filter Color
   const colorSet = new Set(allProducts.map(p => p.color));
   const colorList = Array.from(colorSet).sort();   
   // Filter Collection
   const collectionSet = new Set(allProducts.map(p => p.yearCollection.toString()));
   const collectionList = Array.from(collectionSet).sort();

   // console.log(Filters);
   return (
      <>
         <section className="row no-gutters shop-top">
            <article className="container">
               <div className="col-12 title-product-shop-top">
                  <h1 className="title">Boutique</h1>
               </div>

            </article>
         </section>

         <section id="test" className="container shop-display">

            <div className="row">
               <div className="col-12 filter-content-top">
                  <FilterTop
                     searchBar={searchBar}
                  />
               </div>
            </div>

            <div className="row">
               <div className="col-lg-2 mt-4 filter-content-left p-0">

                  <FilterLeft
                     catList={catList}
                     matterList={matterList}
                     colorList={colorList}
                     collectionList={collectionList}

                     categoryDefault={filterByCat}
                     filterProductsByCat={filterProductsByCat}
                     filterByCat={filterByCat}

                    
                     handleCat={filters => handleFilters(filters, "categoryProduct")}
                     handleMatter={filters => handleFilters(filters, "matter")}
                     handleColor={filters => handleFilters(filters, "color")}
                     handleCollection={filters => handleFilters(filters, "yearCollection")}

                  />

               </div>

               <div className="col-lg-10 mt-3">
                  {/* <p>Filtre actifs : {ActiveFilter} </p> */}
                  <ListProducts
                     products={products}
                     // products={filterByCat === "All" ? products : products.filter(e => e.categoryProduct.indexOf(filterByCat) >= 0)}
                     sort={sort}
                     sortProducts={sortProducts}
                     // cat={filterByCat}
                     // matter={matterList}
                  />
               </div>
            </div>
         </section>
      </>
   )
}

export default DisplayProducts;