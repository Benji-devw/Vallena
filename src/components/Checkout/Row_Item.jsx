import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { updateCart, removeFromCart } from '../../lib/actions'



const RowItem = props => {
   const { id, quantity, details } = props.item
   const item = details
   const [qty, setQty] = useState(quantity)

   const dispatch = useDispatch()

   /***** Redux *****/
   /*****/
   const update = (action) => {
      if (action === 'increment') { 
         setQty(item.quantityProduct > qty ? qty + 1 : qty) 
      }
      if (action === 'decrement') { setQty(qty - 1) }
   }

   useEffect(() => {
      dispatch(updateCart(id, qty))
   }, [dispatch, id, qty])

   const remove = id => {
      dispatch(removeFromCart(id))
   }


   return (
      <>
      {item ? (
         <>

         <div className="row align-items-center no-gutters">
            <div className="col">
            <h3>{item.titleProduct}</h3>
            </div>
         </div>

         <div className="row mb-5 row-item align-items-center no-gutters">
            <div className="col-md-4 text-center">
            <Link to={`/product/${item._id}`}>
            <img 
               onClick={() => props.onCloseModal(false)}
               src={item.imgCollection[0]}
               alt="none"
            />
            </Link>
         </div>

         <div className="col-md-6">
            <div className="row no-gutters">

               <div className="col-sm-6 cart-qty align-self-center text-center" style={{userSelect:"none"}}>
                  <div className="qty-content">
                     <button className="btn-cart-qty" type="button"
                     onClick={() => {
                        if (qty > 1) {
                           update('decrement')
                        }
                     }} > <b>-</b>
                     </button>

                     <span className="qty">{qty}</span>

                     <button className="btn-cart-qty" type="button"
                        onClick={() => {
                           update('increment')
                        }} > <b>+</b>
                     </button>
                     <span style={{ border: "none" }}>{item.priceProduct}€/u</span> 
                  </div>
               </div>
               
               <div className="col-sm-6 pt-2 cart-price text-right">
                  <h3>{qty * item.priceProduct} €</h3>
                  <IconButton aria-label="delete" className="btn-cart-remove"
                     onClick={() => {
                        if (window.confirm("Etes vous sur de vouloir supprimer le produit ?"))
                           remove(id)
                     }}
                  >
                     <DeleteIcon />
                  </IconButton>
               </div>

            </div>
            
         <hr />
         </div>
         </div>
         </>
         ) : ( <div><h2>VIDE</h2></div> )}
         </>
   );
}
export default RowItem






