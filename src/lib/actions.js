// Creation des veleurs item et quantity que l'on passe a reducers en payload

/*
 * action types
 */
export const actions = {
   ADD_TO_CART: "ADD_TO_CART",
   UPDATE_CART: "UPDATE_CART",
   REMOVE_FROM_CART: "REMOVE_FROM_CART",
   SAVE_CART: "SAVE_CART"
}

/*
 * action creators
 */
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

// savegarde du panier dans le navigateur ( localStorage )
export function saveCart (items) {
   return {
      type: actions.SAVE_CART,
      payload: {items: items}
   }
}