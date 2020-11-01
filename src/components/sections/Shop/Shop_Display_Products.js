import React, { useEffect, useState } from 'react';
import apiCallProdcuts from '../../../apiCall/Call_Api'
import ListProducts from './Shop_List_Products';
import FilterTop from './components/Filter_Top';
import FilterLeft from './components/Filter_Left'
import { updateFilters } from '../../../lib/actions'
import { useSelector, useDispatch } from 'react-redux';

import ScrollTop from '../GeneralComponents/Scroll_Top_Btn'


const DisplayProducts = () => {
   const [products, setProducts] = useState([])
   const [allProducts, setAllProducts] = useState([])
   const [counting, setCounting] = useState()

   // Redux
   const dispatch = useDispatch()
   const filtersFromRedux = useSelector(state => state.filters)


   const [filterByCat, setFilterByCat] = useState([])
   const [matterCheck, setMatterCheck] = useState([]);
   const [colorCheck, setColorCheck] = useState([]);
   const [collectionCheck, setCollectionCheck] = useState([]);
   const [promotionCheck, setPromotionCheck] = useState();
   const [noveltyCheck, setNoveltyCheck] = useState();

   // For API Products
   // const [allFilters, setAllFilters] = useState({
   //    categoryProduct: [], matter: [], color: [], yearCollection: [],
   //    promotionProduct: [], novelty: [], price: []
   // })



   /***** Send Filters *****/
   /***************************/
   const showFilteredResult = (filters) => {
      let variables = { filters: filters }

      const valForRedux = { ...filters }
      dispatch(updateFilters(valForRedux.categoryProduct, valForRedux.matter, valForRedux.color, valForRedux.yearCollection, valForRedux.promotionProduct, valForRedux.novelty))

      apiCallProdcuts.getProductsPost(variables).then(res => {
         setProducts([...res.data.products])
      })
   }


   /***** Category Filters *****/
   /***************************/
   const filterProductsByCat = (event) => {
      // console.log('event', event)
      if (event.length <= 0) {
         setFilterByCat([])
      }
      else {
         setFilterByCat(event)
      }
   };

   /***** CheckBox Filters *****/
   /***************************/
   const handleChangeMatterBox = (value) => {
      const currentIndex = matterCheck.indexOf(value);
      const newMatterCheck = [...matterCheck];

      if (currentIndex === -1) {
         newMatterCheck.push(value)
      } else {
         newMatterCheck.splice(currentIndex, 1)
      }
      setMatterCheck(newMatterCheck)

   };

   const handleChangeColorBox = (value) => {
      const currentIndex = colorCheck.indexOf(value);
      const newColorCheck = [...colorCheck];

      if (currentIndex === -1) {
         newColorCheck.push(value)
      } else {
         newColorCheck.splice(currentIndex, 1)
      }
      setColorCheck(newColorCheck)
   };

   const handleChangeCollectionBox = (value) => {
      const currentIndex = collectionCheck.indexOf(value);
      const newCollectionCheck = [...collectionCheck];

      if (currentIndex === -1) {
         newCollectionCheck.push(value)
      } else {
         newCollectionCheck.splice(currentIndex, 1)
      }
      setCollectionCheck(newCollectionCheck)
   };

   /***** Sort Filters *****/
   /***************************/
   const handleSort = (event) => {
      switch (event.target.value) {
         case "byDesc":
            break;
         case "byAsc":
            break;
         case "byPromo":
            setPromotionCheck(true)
            setNoveltyCheck(false)
            break;
         case "byNovelty":
            setNoveltyCheck(true)
            setPromotionCheck(false)
            break;
         default:
            setNoveltyCheck(false)
            setPromotionCheck(false)
            break;
      }
   }

   /***** SearchBar Filters *****/
   /***************************/
   const searchBar = (input) => {
      const fullListMap = allProducts.map(prod => prod)
      let fullList = fullListMap.flat()
      setProducts(fullList.filter(product => {
         const name = product.titleProduct.toLowerCase();
         const term = input.toLowerCase()
         return name.indexOf(term) > -1
      })
      )
   }




   const [forMom, setFroMom] = useState(true)
   useEffect(() => {
      if (forMom) {
         setFilterByCat(filtersFromRedux[0].cat)
         setMatterCheck(filtersFromRedux[0].matter)
         setColorCheck(filtersFromRedux[0].color)
         setCollectionCheck(filtersFromRedux[0].collection)
         setPromotionCheck(filtersFromRedux[0].promotion)
         setNoveltyCheck(filtersFromRedux[0].novelty)
         setFroMom(false)
      }

      const newVal = {}
      newVal.categoryProduct = filterByCat
      newVal.matter = matterCheck
      newVal.color = colorCheck
      newVal.yearCollection = collectionCheck
      newVal.promotionProduct = promotionCheck
      newVal.novelty = noveltyCheck
      showFilteredResult(newVal)

      if (allProducts.length <= 0) {
         apiCallProdcuts.getProducts().then(res => { 
            setAllProducts(res.data.products) 
            setCounting(res.data.products.length) 
         });
      }
   }, [forMom, collectionCheck, allProducts.length, colorCheck, filterByCat, matterCheck, noveltyCheck, promotionCheck]);




   // Filter catList
   const categorySet = new Set(allProducts.map(p => p.categoryProduct));
   const catList = Array.from(categorySet).sort();
   // Filter MatterList
   const matterSet = new Set(allProducts.map(p => p.matter));
   const matterList = Array.from(matterSet).sort();
   // Filter ColorList
   const colorSet = new Set(allProducts.map(p => p.color));
   const colorList = Array.from(colorSet).sort();
   // Filter CollectionList
   const collectionSet = new Set(allProducts.map(p => p.yearCollection.toString()));
   const collectionList = Array.from(collectionSet).sort();

   // console.log(bySort);
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
               <div className="col-lg-2 mt-4 filter-content-left">

                  <FilterLeft
                     catList={catList}
                     matterList={matterList}
                     colorList={colorList}
                     collectionList={collectionList}
                     filterProductsByCat={filterProductsByCat}
                     handleChangeMatterBox={handleChangeMatterBox}
                     handleChangeColorBox={handleChangeColorBox}
                     handleChangeCollectionBox={handleChangeCollectionBox}
                  />

               </div>

               <div className="col-lg-10 mt-3">
                  {/* <p>Filtre actifs : {ActiveFilter} </p> */}
                  <ListProducts
                     products={products}
                     handleSort={handleSort}
                     counting={counting}
                     // allFilters={allFilters}
                     sortRedux={filtersFromRedux[0]}
                  />
               </div>
            </div>
         </section>
         <ScrollTop />
      </>
   )
}

export default DisplayProducts;