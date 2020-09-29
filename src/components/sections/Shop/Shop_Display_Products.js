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
         catList: [],
         matterList: [],
         sort:'',
         isloading: false,
         active: '',

         filterByCat: '',
         filter: null
      
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

   FilterProductsByMatter = (filterMatter) => {
      console.log('filterMatter', filterMatter)
      // const fullList = this.state.products.map(product => product.matter)
      // console.log('fullList', fullList)

      // const array = this.state.products.map(product => product.matter)

      
      if (filterMatter.length > 0) {
         
   
         
      } else { 
         this.setState({ products: this.state.catList})
      }

      // this.setState({
      //    products: this.state.catList.filter(product => {
      //       const test = product.matter.indexOf(filterMatter) > -1
      //       console.log('test', test)
      //       return test
      //    })
      // })
   }


   render() {
      // Filter cat
      const categorySet = new Set(this.state.catList.map((p) => p.categoryProduct));
      const categories = Array.from(categorySet).sort();
      // Filter Matter
      const matterSet = new Set(this.state.catList.map((p) => p.matter));
      const matter = Array.from(matterSet).sort();
      // console.log('matter', matter)

      // console.log('matterList', this.state.products.length);
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
                     category={this.state.category}
                     catList={this.state.catList}
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
                     handleFilters={filterMatter => this.FilterProductsByMatter(filterMatter)}
                  />

               </div>
               
               <div className="col-lg-10 mt-3">
               <ListProducts 
                  products={this.state.products}  
                  sort={this.state.sort}
                  sortProducts={this.sortProducts}
                  cat={this.state.filterByCat}
               />
               </div>
            </div>
         </section>
      </>
      );
   }
}
export default DisplayProducts;