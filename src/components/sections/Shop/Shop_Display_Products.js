import React from 'react';
// import styled from 'styled-components'

import apiCall from '../../../apiCall/Products_Api'

import ListProducts from './Shop_List_Products';
import FilterTop from './components/Filter';

// import Parallax from 'react-rellax'
// import visage from '../../../scss/img/visage.svg';

// const HomeProds = styled.section` height: 80vh; `

class DisplayProducts extends React.Component {
   constructor(){
      super();
      this.state = {
         products: [],
         catList: [],
         category:'',
         sort:'',
         isloading: false,
         active: '',

         filterByCat: ''
      
      }
   }

   componentDidMount = async () => {
      this.setState({ isLoading: true })

      await apiCall.getProducts().then(product => {
         // console.log('products', product)
         this.setState({
            products: product.data.products,
            catList: product.data.products,
            isLoading: false,
         })
      })
      const filterCat = localStorage.getItem('filterByCat')
      this.filterProductsByCat(filterCat)

   }

   sortProducts = (event) => {
      // console.log('event', event.target.value)
      const sort = event.target.value
      this.setState(state => ({
         sort: sort,
         products: this.state.products.slice()
         .sort((a,b) => 
         sort === "lowest" ?
         a.priceProduct < b.priceProduct ? 1 : -1 
         :
         sort === "highest" ?
         (a.priceProduct > b.priceProduct )? 1 : -1 
         :
         (a._id < b._id )? 1 : -1
         )
      }))
   }

   filterProductsByCat = (event) => {
      // console.log('event', event)
       if (event === "All") {
          this.setState({ products: this.state.catList, filterByCat: event});
      } else {
         this.setState({
            products: this.state.catList.filter(product => product.categoryProduct.indexOf(event) >= 0),
            filterByCat: event
               // filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.
               // indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
         })
      }
   }

   searchBar = (input) => {
      const fullListMap = this.state.catList.map(prod => prod)
      let fullList = fullListMap.flat()
      this.setState({
         products: fullList.filter(product => {
            const name = product.titleProduct.toLowerCase();
            const term = input.toLowerCase()
            return name.indexOf(term) > -1
         })
      })
   }

   addActiveClass = (e) => {
      const clicked = e
      if (this.state.active === clicked) {
         this.setState({active: ''})
      } else {
         this.setState({ active: clicked })
      }
   }

   saveFilterByCat = (cat) => {
      this.setState({ filterByCat: cat })
      localStorage.setItem('filterByCat', cat)
   }


   render() {
      // console.log(this.state.filterByCat);
      
      // Filter cat
      const categorySet = new Set(this.state.catList.map((p) => p.categoryProduct));
      const categories = Array.from(categorySet).sort();

      
      return (
         <section className="shop-display">

            <div className="row">
               <div className="col-12 filter-content-top">
                  <FilterTop
                     // count={this.state.products.length} 
                     category={this.state.category}
                     catList={this.state.catList}


                     // filterProductsByCat={this.filterProductsByCat}
                     searchBar={this.searchBar}
                  />
               </div>
            </div>


            <div className="row">
               <div className="col-lg-2 mt-4 filter-content-left p-0">

                  <h3>
                  {/* <div className="filter-result">Produit {this.state.products.length}</div> */}
                  FILTRES :
                  </h3>
                  <div className="col filter-category">
                     <h4>CATEGORIES</h4>
                     <ul className="category-list" defaultValue={this.state.category} onChange={this.filterProductsByCat}>
                        
                        <li className={`cat-list ${this.state.filterByCat === 'All' ? 'active text-primary' : '' }`}
                           onClick={() => { 
                              // this.addActiveClass('All'); 
                              this.filterProductsByCat('All'); 
                              this.saveFilterByCat('All')
                           }}>All
                        </li>
                        
                        {categories.map((cat, index) => 
                        <li key={index} 
                           className={`cat-list ${this.state.filterByCat === cat ? 'active text-primary' : '' }`}
                           onClick={() => {
                              this.filterProductsByCat(cat);
                              this.saveFilterByCat(cat)
                           }}>{cat}
                        </li> 
                        )}

                     </ul>
                  </div>
               
                  <div className="col filter-category">
                     <h4>MATIERES</h4>
                  </div>
                  <div className="col filter-category">
                     <h4>COULEUR</h4>
                  </div>

               </div>
               
               <div className="col-lg-10 mt-3">
               <ListProducts 
               products={this.state.products}  
               sort={this.state.sort}
               sortProducts={this.sortProducts}
               />
               </div>
         


               {/* <Parallax speed={1} data-scroll>
                  <img src={visage} alt="visage" className="visage img-fluid" />
               </Parallax> */}
         </div>
         </section>
      );
   }
}
export default DisplayProducts;