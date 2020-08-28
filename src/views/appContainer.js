// Le container est connecté aux actions via la fonction connect(), et a pour rôle de mettre à jour l'interface graphique.
import { connect } from 'react-redux'
import  App from '../App'

import { saveCart, saveProduct } from '../lib/actions'

export const AppContainer = connect(
   function  mapStateToProps (state) {
      return { 
         items: state.items, 
         product: state.product 
      }
   },
   function mapDispatchToProps (dispatch) {
      return {
         saveLocalStorage: items => dispatch(saveCart(items)),
         saveProductTolocalStorage: product => dispatch(saveProduct(product))
         // onAddToCart: (item, quantity) => dispatch(addtoCart(item, quantity)),      // plus besoin ici car utilise les hook directement ds le Modal
         // onUpdateCart: (item, quantity) => dispatch(updateCart(item, quantity)),
      }
   }
)(App)