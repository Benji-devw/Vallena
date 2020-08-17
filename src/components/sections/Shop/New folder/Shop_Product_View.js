import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import apiCall from '../../../apiCall/Products_Api'
import { saveProduct } from '../../../lib/actions'

import { addtoCart } from '../../../lib/actions'
import ControlledCarousel from './carousel'



const ShopProductView = (props) => {
   console.log('propsView...', props)

   const dispatch = useDispatch()                        // Appel pour utiliser dispatch et envoyer a redux
   const itemsCart = useSelector(state => state.items)
   const [data, setData] = useState(props.location.product)             // ([]) => Au depart le return() aura data vide donc undefined donc au lieu de bloqué il refais un tour prend la var avec les new valeurs
   console.log('data', data)
   
   // Redux
   const [qty, setQty] = useState(1)                     // utilise dispatch pour envoyer item et quantity au store




   // if (data === undefined || data._id === undefined ) { return <Redirect to='/' /> }
  
   // useEffect(() => {
   //    apiCall.getProductById(data._id).then(res => {
   //       console.log('res', res)
   //       const test = dispatch(saveProduct(res.data.data))
   //       console.log('test', test)
   //       if (data) {
   //          setData(test.payload.product)
   //       }
   //    })
   // })




   const add = (item, quantity) => {
      dispatch(addtoCart(item, quantity))
   }
   // Filtre add() si déja dans le panier
   const test = () => {
      const searchIdProduct = itemsCart.map(e => e.details._id)
      return searchIdProduct.includes(data._id)
   }


   return (
      
      <>

         <img src={data.imgCollection[0]} style={{ height: "300px" }} draggable="false" className='img-product img-fluid' alt='imgProduct' />
      {/* {renderRedirect()}
    <button onClick={setRedirect}>Redirect</button> */}


         <div className="p-0 text-center">
            <div md={12} id="img-modal">
               {/* <ControlledCarousel images={data.imgCollection} /> */}
               {/* <img src={data.imgCollection[0]}  alt="none" className="img-fluid" /> */}
            </div>
            <div className="modal-corp" md={12}>
               <h3>{data.titleProduct}</h3>
               <h5>€ {data.priceProduct}</h5>
               <p>{data.quantityProduct} en stock</p>
            </div>

            {data.quantityProduct > 1 ? 	// Affichage à la volée avec opérateur ternaire
               <>
                  {!test ?
                     <div className="addToCart">
                        <div className="btn-qty-modal"
                           onClick={() => setQty(qty > 1 ? qty - 1 : 1)}		// tant que qty est supp a 1 ? qty -1 sinon return 1
                        >-</div>

                        <span className="btn btn-light qty">{qty}</span>

                        <div className="btn-qty-modal"
                           onClick={() => setQty(data.quantityProduct > qty ? qty + 1 : qty)}
                        >+</div>

                        <MdAddShoppingCart size="2em" className="ml-3" style={{ cursor: "pointer" }}
                           onClick={() => add(data, qty)} />

                     </div>
                     : <p>Dans votre panier !</p>}
               </> : <p>Rupture !</p>}
       
         </div>
   


         <div lg="12" className="m-3">
            <div xs="10">
               <p className='section-title text-left'>Posted :
								By : <span>{data ? data.reporterProduct : data.reporterProduct}</span>
             
                  <span>{data ? moment(data.createdAt).startOf().fromNow() : moment(data.createdAt).startOf().fromNow()}</span>
               </p>
            </div>

         </div>
         
      </>
   )
}
export default ShopProductView;