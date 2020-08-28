import React from 'react';
// import styled from 'styled-components'

import apiCall from '../../../apiCall/Products_Api'

import ListProducts from './Shop_List_Products';
import Filter from './components/Filter';

// const HomeProds = styled.section` height: 80vh; `

class DisplayProducts extends React.Component {
   constructor(){
      super();
      this.state = {
         products: [],
         test: [],
         category:"",
         sort:"",
         isloading: false
      }
   }

   componentDidMount = async () => {
      this.setState({ isLoading: true })

      await apiCall.getProducts().then(product => {
         // console.log('products', product)
         this.setState({
            products: product.data.products,
            test: product.data.products,
            isLoading: false,
         })
      })
   }

  sortProducts = (event) => {
    console.log('event', event.target.value)
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

  filterProducts = (event) => {
   //  console.log('event', event.target.value)
    if (event.target.value === "All") {
      this.setState({category: event.target.value, products: this.state.test});
    } else {
      this.setState({
        category: event.target.value,
        products: this.state.test.filter(product => product.categoryProduct.indexOf(event.target.value) >= 0 )
            // filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.
            // indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
      })

    }
  }


   render() {

      return (
         <section className="shop-display">

            <Filter 
               count={this.state.products.length} 
               category={this.state.category}
               catList={this.state.test}

               sort={this.state.sort}
               sortProducts={this.sortProducts}
               filterProducts={this.filterProducts}
            />
            <ListProducts products={this.state.products}  />
 
         </section>
      );
   }
}
export default DisplayProducts;