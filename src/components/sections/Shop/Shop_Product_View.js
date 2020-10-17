import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import { MdAddShoppingCart } from 'react-icons/md';
// import {AiOutlineShareAlt} from 'react-icons/ai';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import ShareIcon from '@material-ui/icons/Share';
import HomeIcon from '@material-ui/icons/Home';

import CenterMode from './components/carousel'
import Footer from '../../UI/Footer/Footer'
import apiCall from '../../../apiCall/Products_Api'
import ScrollableTabsButtonForce from './components/Tabs_Product_View'
import { addtoCart } from '../../../lib/actions'
import SlickComponent from '../GeneralComponents/Slick_Component'




const ProductView = props => {

   const [data, setData] = useState([])   // [] car a l'arrivé sur la page data est vide et react provoque une erreur
   const itemsCart = useSelector(state => state.items)
   const [imgs, setImgs] = useState([])
   // const [datas, setDatas] = useState([])
   // console.log('datas', datas)


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

   // console.log(window.location.href);

   return (
      <>
         <div id="shop-view-product">

            <section className="row no-gutters shop-view-top">
               <article className="container">
                  <div className="col-12 text-center title-product">
                     <h1 className="title">{data.titleProduct}</h1>
                  </div>
                  <div className="col-12 title-link text-right">
                    <Link to="/"><HomeIcon /> </Link> / <Link to="/shop"> boutique </Link> / <span>{data.titleProduct}</span>
                  </div>

               </article>
            </section>



            <section className="container">
            <article className="row shop-view-product align-items-center no-gutters">

               <div className="col-lg-8 align-self-center shop-view-left text-center">
                  {<CenterMode images={imgs} />}
                  {/* <img src={imgs[0]} alt="img0" className="img-0 img-fluid" /> */}
               </div>

               <div className="col-lg-4 align-self-center shop-view-right">
                  <div className="shop-view-right-infos">
                        <p className="description">{data.descriptionProduct}</p>
                        <p className="m-2">
                           <b>Taile :</b> {data.sizeProduct} <br />
                           <b>Poids :</b> {data.weightProduct} <br />
                           <b>Matière :</b> {data.matter} <br />
                           <b>Catégories :</b> {data.categoryProduct} <br />
                           <b>Tags :</b> {data.tags}
                        </p>
                  
                        
                
                     <hr />
                        {data.promotionProduct &&
                           <div className="promotion">Promo</div>
                        }
                        {data.novelty &&
                           <div className="novelty">New</div>
                        }

                        <h2>€ {data.priceProduct}  {data.promotionProduct && <span className="promo-price">€ {data.oldPriceProduct} </span>} <span className="avis">avis(0)</span></h2> 
                     
                     {data.quantityProduct > 0 ? 	// Affichage à la volée avec opérateur ternaire
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


                     <div className="share-media">
                          <span><MailOutlineRoundedIcon /> Envoyer à un ami </span> 
                          <br />
                           <span><ShareIcon /> Partager</span> 

                     </div>
              
                  </div>
               </div>
            </article>
            </section>



            <section className="shop-view-details">
               <article className="row shop-view-content-1 align-items-center justify-content-center p-0 m-0">
                  <div className="col-md-12 text-center p-0 m-0">
                     <ScrollableTabsButtonForce data={data} images={imgs}/>
                  </div>
               </article>
            </section>


            <section className="container shop-view-same-cat">
               <article className="row align-items-center justify-content-center p-0 m-0">
               <div className="col mt-4">
                  <div className="title-collection">
                     <h2>
                     MEME CATEGORIES
                     </h2>
                  </div>

                     <SlickComponent data={data} id={data._id} cat={data.categoryProduct}/>
          
               </div>
               </article>
            </section>
         
      </div>
      <Footer />
      </>
   )
}
export default ProductView