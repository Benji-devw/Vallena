// Le reducer a pour rôle d'utiliser l'action pour mettre à jour le global state.
// Recupère les valeurs de action.js et les passe a ./containers/index.js
// Effectuer les mises à jour sur le  state

import { actions } from './actions'

// 1 - Savegarde du panier et product dans le navigateur (application)
const saveToLocalStorage = object => {
   localStorage.setItem("items", JSON.stringify(object))
}
const saveProductToLocalStorage = object => {
   localStorage.setItem("product", JSON.stringify(object))
}
// 2 - Initialisation du panier et product localStorage
const initialState = {
   // si ds le navigateur application il y a un item on renvoi l'item sinon un tableau vide
   items: JSON.parse(localStorage.getItem("items")) !== null ? JSON.parse(localStorage.getItem("items")) : [],
   product: JSON.parse(localStorage.getItem("product")) !== null ? JSON.parse(localStorage.getItem("product")) : [],
}

export default function onlineStoreApp(state = initialState, action) {
   switch(action.type) {
         // Créer une copie ds le store av Object.assign(...)
      case actions.ADD_TO_CART : return Object.assign({}, state, { items: [...state.items, action.payload]});

      case actions.SET_VISIBILITY_FILTER : return Object.assign({}, state, { 
         visibility: action.payload
      });

      case actions.UPDATE_CART : return Object.assign({}, state, {
         items: state.items.map(item => {
            return item.id === action.payload.id ?
            Object.assign({}, item, {
               quantity: action.payload.quantity
            }) : item;
         })
      })

      case actions.REMOVE_FROM_CART : return Object.assign({}, state, {
         items: state.items.filter(item => {
            return item.id !== action.payload
         })
      })
      
      // savegarde du panier dans le navigateur
      case actions.SAVE_CART: 
         saveToLocalStorage(action.payload.items)
         return state

      // Save product => ./Shop_Product => recup product au refresh
      case actions.SAVE_PRODUCT:
         saveProductToLocalStorage(action.payload.product)
         return state

      // Reset Cart 
      case actions.RESET_CART:
         saveToLocalStorage([])
         return Object.assign({}, state, {
            items : []
         })


      default : return state
   }
}