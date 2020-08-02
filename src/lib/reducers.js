// Recupère les valeurs de action.js et les passe a ./containers/index.js

import { actions } from './actions'

// 1 - savegarde du panier dans le navigateur (application)
const saveToLocalStorage = object => {
   localStorage.setItem("items", JSON.stringify(object))
}
// 2 
const initialState = {
   // si ds le navigateur application il y a un item on renvoi l'item sinon un tableau vide
   items: JSON.parse(localStorage.getItem("items")) !== null ? JSON.parse(localStorage.getItem("items")) : []
}

export default function onlineStoreApp(state = initialState, action) {
   switch(action.type) {
      
      case actions.ADD_TO_CART : return Object.assign({}, state, { items: [...state.items, action.payload]});

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

      default : return state
   }
}