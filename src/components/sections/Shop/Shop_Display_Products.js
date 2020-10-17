import React, { useEffect, useState} from 'react';
import apiCall from '../../../apiCall/Products_Api'

import ListProducts from './Shop_List_Products';
import FilterTop from './components/Filter_Top';
import FilterLeft from './components/Filter_Left'
import { updateFilters } from '../../../lib/actions'
import { useSelector, useDispatch } from 'react-redux';


const DisplayProducts = (props) => {
   // console.log('props', props)
   const [products, setProducts] = useState([])
   const [allProducts, setAllProducts] = useState([])


   // Redux
   const dispatch = useDispatch()
   const filtersFromRedux = useSelector(state => state.filters)
   // console.log('filtersFromRedux', filtersFromRedux)

   // const [bySort, setBySort] = useState(["none"])
   
   const [filterByCat, setFilterByCat] = useState([])
   const [matterCheck, setMatterCheck] = useState([]);
   const [colorCheck, setColorCheck] = useState([]);
   const [collectionCheck, setCollectionCheck] = useState([]);
   // const [promotionCheck, setPromotionCheck] = useState([]);
   // const [noveltyCheck, setNoveltyCheck] = useState([]);

   // For API Products
   const [allFilters, setAllFilters] = useState({
      categoryProduct: [], matter: [], color: [], yearCollection: [],
      promotionProduct: [], novelty: [], price: []
   })


   const handleSort = (event) => {
      const newValue = { ...allFilters }
      switch (event.target.value) {
         case "byDesc":
            newValue.price = true
            newValue.novelty = false
            newValue.promotionProduct = false
            break;
         case "byAsc":
            newValue.price = false
            newValue.novelty = false
            newValue.promotionProduct = false
            break;
         case "byPromo":
            newValue.promotionProduct = true
            newValue.novelty = false
            // setPromotionCheck("Promotion")
            break; 
         case "byNovelty":
            newValue.novelty = true
            newValue.promotionProduct = false
            // setNoveltyCheck("Novelty")
            break;         
            case "none":
            newValue.novelty = false
            newValue.promotionProduct = false
            // setNoveltyCheck("Novelty")
            break;
         default:
            newValue.price = []
            newValue.novelty = []
            newValue.promotionProduct = []
            break;
      }
      
      showFilteredResult(newValue)
      setAllFilters(newValue)
      // localStorage.setItem('BySort', event.target.value);
      dispatch(updateFilters(newValue.categoryProduct, newValue.matter, newValue.color, newValue.yearCollection, newValue.promotionProduct, newValue.novelty))
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
      // console.log('allFilters', allFilters)

      let variables = {
         filters: allFilters,
      }
      // console.log('variables', variables.filters)

      apiCall.getProductsPost(variables).then(res => {
         setProducts([...res.data.products])
      })
   }


   const handleFilters = (value, key) => {
      const newValue = {...allFilters}
      newValue[key] = value
      setAllFilters(newValue)
      dispatch(updateFilters(newValue.categoryProduct, newValue.matter, newValue.color, newValue.yearCollection, newValue.promotionProduct, newValue.novelty))
      showFilteredResult()
   }
 
   const filterProductsByCat = (event) => {
      // console.log('event', event)
      if (event.length <= 0) {
         setFilterByCat([])
         handleFilters(event, 'categoryProduct')
      }
      else {
         setFilterByCat(event)
         handleFilters(event, 'categoryProduct')
      }
   };

   const handleChangeMatterBox = (value) => {
      const currentIndex = matterCheck.indexOf(value);
      const newMatterCheck = [...matterCheck];

      if (currentIndex === -1) {
         newMatterCheck.push(value)
      } else {
         newMatterCheck.splice(currentIndex, 1)
      }
      setMatterCheck(newMatterCheck)
         // setAllFilters({ matter: newMatterCheck })
      handleFilters(newMatterCheck, 'matter')

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
      // setAllFilters({ color: filtersFromRedux[0].color })
      handleFilters(newColorCheck, 'color')
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
      // setAllFilters({ yearCollection: newCollectionCheck })
      handleFilters(newCollectionCheck, 'yearCollection')
   };

   
   
   const [test , setTest] = useState(true)
   useEffect(() => {

      setFilterByCat(filtersFromRedux[0].cat)
      setMatterCheck(filtersFromRedux[0].matter)
      setColorCheck(filtersFromRedux[0].color)
      setCollectionCheck(filtersFromRedux[0].collection)
      setCollectionCheck(filtersFromRedux[0].promotion)
      setCollectionCheck(filtersFromRedux[0].novelty)

      const newVal = { ...allFilters }
      newVal.categoryProduct = filtersFromRedux[0].cat
      newVal.matter = filtersFromRedux[0].matter
      newVal.color = filtersFromRedux[0].color
      newVal.yearCollection = filtersFromRedux[0].collection
      newVal.promotionProduct = filtersFromRedux[0].promotion
      newVal.novelty = filtersFromRedux[0].novelty
      showFilteredResult(newVal)
      if (test) {
         setAllFilters(newVal)
         window.scrollTo({ top: 0 });
         setTest(false)
      }

      // setBySort(localStorage.getItem('BySort'))

      if (allProducts.length <= 0) {
         apiCall.getProducts().then(res => { setAllProducts(res.data.products) });
      }
   }, [filtersFromRedux, allFilters, test, allProducts.length]);




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

                     categoryDefault={filterByCat}
                     filterByCat={filterByCat}

                     filterProductsByCat={filterProductsByCat}
                     handleChangeMatterBox={handleChangeMatterBox}
                     handleChangeColorBox={handleChangeColorBox}
                     handleChangeCollectionBox={handleChangeCollectionBox}

                     matterCheck={matterCheck}
                     colorCheck={colorCheck}
                     collectionCheck={collectionCheck}
                  />

               </div>

               <div className="col-lg-10 mt-3">
                  {/* <p>Filtre actifs : {ActiveFilter} </p> */}
                  <ListProducts
                     products={products}

                     // bySort={bySort}
                     handleSort={handleSort}
                     
                     counting={allProducts.length}

                     allFilters={allFilters}
                     // sortByPromo={promotionCheck}
                     // sortByNovelty={noveltyCheck}
                     sortRedux={filtersFromRedux[0]}
                  />
               </div>
            </div>
         </section>
      </>
   )
}

export default DisplayProducts;