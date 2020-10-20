import { actions } from './actions'


/***** Save cart in navigateur *****/
/*****/
const saveToLocalStorage = object => {
   localStorage.setItem("items", JSON.stringify(object))
}
const saveFiltering = object => {
   localStorage.setItem("Filters", JSON.stringify(object))
}

/***** Init Cart & filters in localstorage *****/
/*****/
const initialState = {
   // si ds le navigateur application il y a un item on renvoi l'item sinon un tableau vide
   items: JSON.parse(localStorage.getItem("items")) !== null ? JSON.parse(localStorage.getItem("items")) : [],
   filters: JSON.parse(localStorage.getItem("Filters")) !== null ? JSON.parse(localStorage.getItem("Filters")) : [],
}

export default function onlineStoreApp(state = initialState, action) {

   switch (action.type) {

      /***** Cart *****/
      /*****/
      // Créate copy with Object.assign(...)
      case actions.ADD_TO_CART: return Object.assign({}, state, { items: [...state.items, action.payload] });

      case actions.UPDATE_CART: return Object.assign({}, state, {
         items: state.items.map(item => {
            return item.id === action.payload.id ?
               Object.assign({}, item, {
                  quantity: action.payload.quantity
               }) : item;
         })
      })

      case actions.REMOVE_FROM_CART: return Object.assign({}, state, {
         items: state.items.filter(item => {
            return item.id !== action.payload
         })
      })

      // Save cart in nav
      case actions.SAVE_CART:
         saveToLocalStorage(action.payload.items)
         return state

      // Reset Cart 
      case actions.RESET_CART:
         saveToLocalStorage([])
         return Object.assign({}, state, {
            items: []
         })


      /***** Filters *****/
      /*****/
      case actions.ADD_FILTERS: return Object.assign({}, state, { filters: [...state.filters, action.payload] });

      case actions.UPDATE_FILTERS: return Object.assign({}, state, {
         filters: state.filters.map(filter => 
            Object.assign({}, filter, {
               cat: action.payload.cat,
               matter: action.payload.matter,
               color: action.payload.color,
               collection: action.payload.collection,
               promotion: action.payload.promotion,
               novelty: action.payload.novelty,
            })
         )
      })
      case actions.SAVE_FILTERS:
         saveFiltering(action.payload.filters)
         return state

      default: return state
   }
}