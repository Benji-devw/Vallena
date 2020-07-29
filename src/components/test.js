import React from 'react'
import apiCall from '../apiCall/Products_Api'

//    constructor(props) {
//       super(props)
//       this.state = {
//          products: [],
//          isLoading: false,
//       }
//    }
//    componentDidMount = async () => {
//       this.setState({ isLoading: true })

//       await apiCall.getAllProducts().then(products => {
//          this.setState({
//             products: products.data.data,
//             isLoading: false,
//          })
//       })
//    }



//CHAINING MAP AND FILTER WITH REACT PROPS TO RENDER LISTS
class Users extends React.Component {
      constructor(props) {
      super(props)
      this.state = {
         products: [],
         isLoading: false,
      }
   }
   componentDidMount = async () => {
      this.setState({ isLoading: true })

      await apiCall.getAllProducts().then(products => {
         this.setState({
            products: products.data.data,
            isLoading: false,
         })
      })
   }


   render() {
     const produits = this.state.products
      return (
         <div>
            <h3>En stock : </h3>

               {produits.map(t => (
                  <ul>
                  
                     {t.filter(u => u.stockProducts === 'oui').map(u => <li>{console.log(u.titleProducts)}</li>)}
                  </ul>
               ))}


{/* 
            <h3> Enemies </h3>
            <ul>
               {// This is why filtering boolean values can be fun. One character changes everything.
                  this.state.products.filter(u => !u.friend).map(u => <li>{u.name}</li>)}
            </ul> */}
         </div>
      )
   }
}
export default Users