import React from 'react';
import apiCall from '../../../apiCall/Products_Api'

import ListProducts from './Shop_List_Products';
import FilterTop from './components/Filter_Top';
import FilterLeft from './components/Filter_Left'



class DisplayProducts extends React.Component {
   constructor(){
      super();
      this.state = {
         products: [],
         allProducts: [],
         matterList: [],
         sort:'',
         isloading: false,
         active: '',

         filterByCat: 'All',
         filterByMatter: [],
         ActiveFilter: ''
      
      }
   }

   componentDidMount = async () => {
      this.setState({ isLoading: true })

      await apiCall.getProducts().then(product => {
         // console.log('products', product)
         this.setState({
            products: product.data.products,
            allProducts: product.data.products,
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
          this.setState({ products: this.state.allProducts, filterByCat: "All"});
      } else {
         this.setState({
            products: this.state.allProducts.filter(product => product.categoryProduct.indexOf(event) >= 0),
            filterByCat: event
               // filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.
               // indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
         })
      }
   }

   searchBar = (input) => {
      const fullListMap = this.state.allProducts.map(prod => prod)
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

   FilterProductsByMatter = (matter, cat) => {
      // console.log('matter', matter)

      
   if (matter.length === 1) {
      console.log('plein');
      this.setState({
         products: this.state.products.filter(product => product.matter.indexOf(matter) >= 0),
         ActiveFilter: matter
      })
   }
   else if (matter.length > 1) {

      for (const key in matter) {
         console.log('key', matter[key])

         this.setState({
            products: this.state.products
               .concat(this.state.allProducts.filter(product => product.matter.indexOf(matter[key]) >= 0)
                  .filter(test => test.categoryProduct.indexOf(cat) >= 0)
               )
         })



      }
   }
   else {
      console.log('vide');
      if (this.state.filterByCat !== 'All') {
         this.setState({
            products: this.state.allProducts.filter(product => product.categoryProduct.indexOf(this.state.filterByCat) >= 0),
            ActiveFilter: matter
         })
      } else {
         this.setState({
            products: this.state.allProducts,
            ActiveFilter: matter
         })
      }
   }


   }


   render() {
      // Filter cat
      const categorySet = new Set(this.state.allProducts.map((p) => p.categoryProduct));
      const categories = Array.from(categorySet).sort();
      // Filter Matter
      const matterSet = new Set(this.state.allProducts.map((p) => p.matter));
      const matter = Array.from(matterSet).sort();
      // console.log('matter', matter)

      console.log('filterByMatter', this.state.filterByMatter);
      console.log('products', this.state.products);
      console.log('filterByCat', this.state.filterByCat);
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
                     // count={this.state.products.length} 
                     // filterProductsByCat={this.filterProductsByCat}
                     searchBar={this.searchBar}
                  />
               </div>
            </div>

            <div className="row">
               <div className="col-lg-2 mt-4 filter-content-left p-0">

                  <FilterLeft
                     category={this.state.category}
                     filterProductsByCat={this.filterProductsByCat}
                     filterByCat={this.state.filterByCat}
                     categories={categories}
                     matter={matter}
                     // handleFilters={filters => this.handleFilters(filters)}
                     // handleFilters={filterMatter => this.FilterProductsByMatter(filterMatter)}
                        handleFilters={(filterMatter) => {
                           this.setState({ filterByMatter: filterMatter })
                           // this.setState({ ActiveFilter: filterMatter })
                           this.FilterProductsByMatter(filterMatter, this.state.filterByCat)
                        }}
                  />

               </div>
               
               <div className="col-lg-10 mt-3">
                     <p>Filtre actifs : {this.state.ActiveFilter} </p>
               <ListProducts 
                  products={this.state.products}  
                  sort={this.state.sort}
                  sortProducts={this.sortProducts}
                  cat={this.state.filterByCat}
                  matter={this.state.filterByMatter}
               />
               </div>
            </div>
         </section>
      </>
      );
   }
}
export default DisplayProducts;