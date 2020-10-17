// Creation des actions (valeurs: item ,quantity, product ) que l'on passe a reducers en payload
// Action (objet) est appelée par un  container dont la mission sera de mettre à jour l'interface en utilisant les actions et en récupérant les states
/*
 * action types
 * type est obligatoire pour chaque  action
 */
export const actions = {
   ADD_TO_CART: "ADD_TO_CART",
   UPDATE_CART: "UPDATE_CART",
   REMOVE_FROM_CART: "REMOVE_FROM_CART",
   SAVE_CART: "SAVE_CART",
   RESET_CART: "RESET_CART",

   ADD_FILTERS: "ADD_FILTERS",
   UPDATE_FILTERS: "UPDATE_FILTERS",
   SAVE_FILTERS: "SAVE_FILTERS",

}

/*
 * Action creator
 */

 // Add in Redux
const uid = () => Math.random().toString(34).slice(2)
export function addtoCart (item, quantity) {
   return {
      type: actions.ADD_TO_CART,
         // payload == action que l'on transfere
      payload: {id: uid(), quantity: quantity, details: item}
   }
}

export function updateCart (id, quantity) {
   return {
      type: actions.UPDATE_CART,
      payload: {id: id, quantity: quantity}
   }
}

export function removeFromCart (id) {
   return {
      type: actions.REMOVE_FROM_CART,
      payload: id
   }
}

// Save in  localStorage
export function saveCart (items) {
   return {
      type: actions.SAVE_CART,
      payload: {items: items}
   }
}

export function resetCart () {
   return {
      type: actions.RESET_CART,
   }
}


export function addFilters(cat, matter, color, collection, promotion, novelty) {
   return {
      type: actions.ADD_FILTERS,
      payload: { 
         cat: cat,
         matter: matter,
         color: color,
         collection: collection,
         promotion: promotion,
         novelty: novelty,
      }
   }
}
export function updateFilters(cat, matter, color, collection, promotion, novelty) {
   return {
      type: actions.UPDATE_FILTERS,
      payload: { 
         cat: cat,
         matter: matter,
         color: color,
         collection: collection,
         promotion: promotion,
         novelty: novelty,
      }
   }
}


export function saveFilter(filters) {
   return {
      type: actions.SAVE_FILTERS,
      payload: { filters: filters}
   }
}