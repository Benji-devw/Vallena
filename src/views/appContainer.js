// Le container est connecté aux actions via la fonction connect(), et a pour rôle de mettre à jour l'interface graphique.
import { connect } from 'react-redux'
import  App from '../App'

import { saveCart, saveFilter } from '../lib/actions'

export const AppContainer = connect(
   function  mapStateToProps (state) {
      return { 
         items: state.items,
         filters: state.filters
      }
   },
   function mapDispatchToProps (dispatch) {
      return {
         saveLocalStorage: items => dispatch(saveCart(items)),
         saveFilters: filters => dispatch(saveFilter(filters)),
      }
   }
)(App)