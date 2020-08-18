import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import apiCall from '../../../apiCall/Products_Api'
import moment from 'moment'
import { Container } from 'react-bootstrap';

import { addtoCart } from '../../../lib/actions'
import secureImg from '../../../assets/img/payment-secu.jpg'
import ControlledCarousel from './carousel'




const ShopProductView = props => {
   console.log('props', props)

   const [data, setData] = useState({})
   const itemsCart = useSelector(state => state.items)
   const [imgs, setImgs] = useState([])
   
   // Redux
   const dispatch = useDispatch()                        // Appel pour utiliser dispatch et envoyer a redux
   const [qty, setQty] = useState(1) 
   const add = (item, quantity) => {
      dispatch(addtoCart(item, quantity))
   }
   // Filtre add() si déja dans le panier
   const searchIdProduct = itemsCart.map(e => e.details._id)
   const findId = searchIdProduct.includes(data._id)


   useEffect(() => {
      const id = props.match.params.id
      apiCall.getProductById(id).then(res => {
         // console.log('res', res.data.data)
         setData(res.data.data)
         setImgs(res.data.data.imgCollection)   // SetImgs car dans data.imgCollection problème affichage
       })

   }, [props.match.params.id])

   return(
      <>
         <div id="product-shop" className="">

            <section className="product-shop-0">
               <article className="row align-items-center no-gutters">

                  <div className="col-md-8 product-shop-left-0 text-center">
                     {/* {<ControlledCarousel images={imgs} />} */}
                     <img src={imgs[0]} alt="img0" className="img-0 img-fluid" />
                  </div>

                  <div className="col-md-4 product-shop-right-0">
                     <div className="infos-body">

                        <h2 className="title">{data.titleProduct}</h2>
                        <p className="avis">avis(0)</p>
                        <p className="description">{data.descriptionProduct}</p>
                        <hr />
                        <div className='price'>  <b>€ {data.priceProduct}</b> <p>En stock : {data.quantityProduct}</p> </div>
                        <hr />
                        {data.quantityProduct > 1 ? 	// Affichage à la volée avec opérateur ternaire
                        <>
                           {!findId ?
                              <div className="addToCart">
                                 <div className="btn-qty-cart"
                                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}		// tant que qty est supp a 1 ? qty -1 sinon return 1
                                 >-</div>

                                 <span className="btn btn-light qty">{qty}</span>

                                 <div className="btn-qty-cart"
                                    onClick={() => setQty(data.quantityProduct > qty ? qty + 1 : qty)}
                                 >+</div>

                                 <MdAddShoppingCart size="2em" className="ml-3" style={{ cursor: "pointer" }}
                                    onClick={() => add(data, qty)} />

                              </div>
                           : <p>Dans votre panier !</p>}
                        </> : <p>Rupture !</p>}
                        <div className="payment-secur">
                           <img src={secureImg} alt="payment-method" className="payment-secure" style={{height: "100px"}} />
                        </div>
                     </div>
                  </div>
               </article>
            </section>
               
            <section className="product-shop-1">
               <article className="row align-items-center no-gutters">

                  <div className="col-md-4 product-right-1">
                        <h3>Du text ici ...</h3>
                  </div>
                  <div className="col-md-8 product-left-1">
                     <img src={imgs[1]} alt="imgs1" className="img-1 img-fluid" />
                  </div>

               </article>
            </section>



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
export default ShopProductView