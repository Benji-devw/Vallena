import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import apiCallProdcuts from '../../../apiCall/Call_Api'
import Alert from '@material-ui/lab/Alert';
import { MdAddShoppingCart } from 'react-icons/md';
// import {AiOutlineShareAlt} from 'react-icons/ai';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import ShareIcon from '@material-ui/icons/Share';
import HomeIcon from '@material-ui/icons/Home';

import CenterMode from './components/carousel'
import Footer from '../../UI/Footer/Footer'
import TabsProductView from './components/Tabs_Product_View'
import { addtoCart } from '../../../lib/actions'
import SlickComponent from '../GeneralComponents/Slick_Component'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Comments from './components/comments'


function AlertToAdd(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const ProductView = props => {
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(true);
   };
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpen(false);
   };

   const [data, setData] = useState([])
   const itemsCart = useSelector(state => state.items)
   const [imgs, setImgs] = useState([])
   // const [datas, setDatas] = useState([])

   // if (data === []) {
   //    window.location = ('/');
   // }

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

      apiCallProdcuts.getProductById(props.match.params.id).then(res => {
         // console.log(res)
         setData(res.data.data)
         setImgs(res.data.data.imgCollection)   // SetImgs car dans data.imgCollection problème affichage (tab vide)
      }).catch((err) => err && (window.location = ('/')))
      window.scrollTo({ top: 0 });
   }, [props.match.params.id]);

   // console.log(window.location.href);
   const formatDescription = (str) => {
      if (str) {
         return (
            str.split("<br />").map(function (test, id) {
               return (
                  <p key={id} className="description p-0 m-0">
                     {test}
                     <br />
                  </p>
               )
            })
         )
      }
   }

   return (
      <>
         <div id="shop-view-product">

            <section className="row no-gutters shop-view-top">
               <article className="container">
                  {/* <div className="col-12 text-center title-product">
                     <h1 className="title">{data.titleProduct}</h1>
                  </div> */}
                  <div className="col-12 mt-4 title-link text-right">
                    <Link to="/"><HomeIcon /> </Link> / <Link to="/shop"> boutique </Link> / <span>{data.titleProduct}</span>
                  </div>

               </article>
            </section>



            <section className="container">
            <article className="row shop-view-product align-items-center no-gutters">

               <div className="col-lg-6 align-self-center shop-view-left text-center">
                  {<CenterMode images={imgs} />}
                  {/* <img src={imgs[0]} alt="img0" className="img-0 img-fluid" /> */}
               </div>

               <div className="col-lg-6 align-self-center shop-view-right">
                  <div className="shop-view-right-infos">
                        <div className="col-12 title-product  p-0 m-0">
                           <h2 className="title">{data.titleProduct}</h2>
                        </div>

                        <Comments product={data}/>

                        <div className="row">
                            <div className="col-sm-4">
                              <h3>{data.priceProduct} € {data.promotionProduct && <span className="promo-price"> {data.oldPriceProduct} €</span>}</h3>
                           </div>
                           <div className="col-sm-4">
                              {data.promotionProduct && <div className="promotion">Promo</div>}
                              {data.novelty && <div className="novelty">New</div>}
                           </div>
                        </div>
                        
                        
                        {/* <br /> */}
                        {/* <p className="description">{data.descriptionProduct}</p> */}
                        {/* {console.log(data)} */}
                           
                         {formatDescription(data.descriptionProduct)}          
                             

                        <p className="mt-3">
                           <b>Taile :</b> {data.sizeProduct} <br />
                           <b>Poids :</b> {data.weightProduct} <br />
                           <b>Matière :</b> {data.matter} <br />
                           <b>Catégories :</b> {data.categoryProduct} <br />
                           <b>Tags :</b> {data.tags}
                        </p>
                  
                     <hr />
                     {/* <div>
                        {data.promotionProduct && <div className="promotion">Promo</div> }
                        {data.novelty &&  <div className="novelty">New</div> }
                     </div> */}
                        

                     {data.quantityProduct > 0 ? 	// Affichage à la volée avec opérateur ternaire
                     <div className="add-cart-content">
                        {!findId ?
                           <div className="">

                              <div className="row btn-content mt-2 mb-2">
                                 <div className="col-2 mt-2 align-items-middle">
                                    <span className="qty-text">QTY:</span>
                                 </div>
                                 <div className="col-6">
                                    <div className="qty mt-2">
                                       <div className="btn-qty-cart text-center"
                                          onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                                       >-</div>

                                       <span className="btn btn-light">{qty}</span>

                                       <div className="btn-qty-cart text-center"
                                          onClick={() => setQty(data.quantityProduct > qty ? qty + 1 : qty)}
                                       >+</div>
                                    </div>

                                 </div>
                                 <div className="col-4 text-left">
                                    <Alert severity="info">
                                       <span>{data.quantityProduct} en stock</span>
                                    </Alert>
                                 </div>

                              </div>

                              <div className="row">
                                 <div className="col-6 p-2 ml-3 mb-2 add-to-cart text-center"
                                    onClick={() => {
                                       add(data, qty)
                                       handleClick()
                                    }}
                                 >
                                 <MdAddShoppingCart size="1em" className="mr-2" />
                                 Ajouter au panier
                              </div>
                           </div>
                         </div>
                           : <Link to="/shop"><Alert onClick={() => { }} severity="success" className="fadeIn" style={{ width: "200px", height: "45px" }}>Dans votre panier !</Alert></Link>
                        }
                     </div> : <Link to="/shop"><Alert onClick={() => { history.goBack() }}  style={{ width: "200px", height: "45px" }} severity="error" className="fadeIn mb-2">Rupture !</Alert></Link>}


                     <div className="share-media">
                        <span><MailOutlineRoundedIcon /> Envoyer à un ami </span> 
                        <br />
                        <span><ShareIcon /> Partager</span> 
                     </div>
              
                  </div>
               </div>
            </article>
            </section>


            <section className="shop-view-details" style={{background:"#F5F5F5"}}>
               <article className="container">
                  <div className=" row shop-view-content-1 align-items-center justify-content-center p-0 m-0">
                  <div className="col-md-12 text-center p-0 m-0">
                     <TabsProductView data={data} images={imgs}/>
                  </div>
                  </div>
               </article>
            </section>


            <section className="container shop-view-same-cat">
               <article className="row align-items-center justify-content-center p-0 m-0">
               <div className="col mt-4">
                  <div className="title-collection">
                     <h2>
                     MEME CATEGORIE
                     </h2>
                  </div>
                  <SlickComponent data={data} currentId={data._id} cat={data.categoryProduct}/>
               </div>
               </article>
            </section>
         
      </div>

         <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <AlertToAdd onClose={handleClose} severity="success">
               Ajouté au panier !
            </AlertToAdd>
         </Snackbar>

      <Footer />
      </>
   )
}
export default ProductView