import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiCall from '../../../apiCall/Products_Api'
import { useSelector, useDispatch } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';
import Alert from '@material-ui/lab/Alert';
import ControlledCarousel from './components/carousel'
import Footer from '../../UI/Footer/Footer'
import ScrollableTabsButtonForce from './components/Tabs_Product_View'

import { addtoCart } from '../../../lib/actions'
// import secureImg from '../../../assets/img/payment-secu.jpg'



const ProductView = props => {

   const [data, setData] = useState([])   // [] car a l'arrivé sur la page data est vide et react provoque une erreur
   const itemsCart = useSelector(state => state.items)
   const [imgs, setImgs] = useState([])

   // Redux
   const dispatch = useDispatch()                        // Call dispatch to send redux
   const [qty, setQty] = useState(1)
   const add = (item, quantity) => {
      dispatch(addtoCart(item, quantity))
   }
   // Filtre add() si déja dans le panier
   const searchIdProduct = itemsCart.map(e => e.details._id)
   const findId = searchIdProduct.includes(data._id)

   const history = useHistory()

   useEffect(() => {
      apiCall.getProductById(props.match.params.id).then(res => {
         // console.log(res)
         setData(res.data.data)
         setImgs(res.data.data.imgCollection)   // SetImgs car dans data.imgCollection problème affichage (tab vide)
      })
      window.scrollTo({ top: 0 });
   }, [props.match.params.id]);

   return (
      <>
         <div id="shop-view-product">

            <section className="row no-gutters shop-view-top">
               <article className="container">
                  <div className="col-12  text-center">
                  </div>

               </article>
            </section>

            <section className="container">
            <article className="row shop-view-0 align-items-center no-gutters">

               <div className="col-lg-8 align-self-center shop-view-left text-center">
                  {<ControlledCarousel images={imgs} />}
                  {/* <img src={imgs[0]} alt="img0" className="img-0 img-fluid" /> */}
               </div>

               <div className="col-lg-4 align-self-center shop-view-right">
                  <div className="shop-view-right-infos">
                     <div className="">
                        <h2 className="title">{data.titleProduct}</h2>
                        <p className="avis">avis(0)</p>
                        <p className="description">{data.descriptionProduct}</p>
                     </div>
                     <hr />
                  
                        <h5>{data.priceProduct} €</h5>
                
                     <hr />
                     {data.quantityProduct > 1 ? 	// Affichage à la volée avec opérateur ternaire
                     <div className="add-cart-content flipInX">
                        {!findId ?
                           <div className="addToCart">
                                 <Alert severity="info"> {data.quantityProduct} en stock
                              <div className="btn-qty-cart"
                                 onClick={() => setQty(qty > 1 ? qty - 1 : 1)}		// tant que qty est supp a 1 ? qty -1 sinon return 1
                              >-</div>

                              <span className="btn btn-light qty">{qty}</span>

                              <div className="btn-qty-cart"
                                 onClick={() => setQty(data.quantityProduct > qty ? qty + 1 : qty)}
                              >+</div>

                              <MdAddShoppingCart size="2em" className="ml-3" style={{ cursor: "pointer" }}
                                 onClick={() => {
                                 add(data, qty)
                                 }
                                 } />
                           
                           </Alert>
                           </div>
                           : 
                              <Alert onClick={() => { history.goBack() }} severity="success">Dans votre panier !</Alert>
                           }
                     </div> : <Alert onClick={() => { history.goBack() }} severity="error" className="flipInX">Rupture !</Alert>}
                  
                     <p className="m-2">
                        <b>Catégories :</b> {data.categoryProduct}
                        <br />
                        <b>Tags :</b> mot-clé, sdb, rangement
                     </p>
              
                  </div>
               </div>
            </article>
            </section>

            <section className="shop-view-1">
               <article className="row shop-view-content-1 align-items-center justify-content-center p-0 m-0">
              
                        <div className="col-md-12 text-center p-0 m-0">
                           {/* <img src={imgs[1]} alt="imgs1" className="img-1 img-fluid" /> */}
                              {/* <div className="motion-carousel">
                                 {imgs.map(url => <img src={url} alt='test' className="motion-img-slide" onClick={() => pushpush(url)} /> )}
                              </div> */}
                           <ScrollableTabsButtonForce data={data} images={imgs}/>
                      
                        </div>

            


               </article>
            </section>





            {/* <div lg="12" className="m-3">
               <div xs="10">
                  <p className='section-title text-left'>Posted :
                     By : <span>{data ? data.reporterProduct : data.reporterProduct}</span>
                     <span>{data ? moment(data.createdAt).startOf().fromNow() : moment(data.createdAt).startOf().fromNow()}</span>
                  </p>
               </div>
            </div> */}

         
      </div>
      <Footer />
      </>
   )
}
export default ProductView