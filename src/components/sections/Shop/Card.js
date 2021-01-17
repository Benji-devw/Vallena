import React, {useState} from 'react';
import { Link } from 'react-router-dom'
// import formatCurrency from '../../../utils/utils';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Comments from './components/comments'
import QuickView from '../GeneralComponents/Quick_View'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
         marginTop: theme.spacing(1),
      },
   },
}));




const Card = props => {
   const classes = useStyles();
   const product = props.product
   const display = props.display

   const [hov, setHov] = useState('')
   const firstImg = product.imgCollection[0]
   const secondImg = product.imgCollection[1]

   const formatDescription = (str) => {
      if (str) {
         return (
            str.slice(0, 120).split("<br />").map(function (test, id) {
               return (
                  <p key={id} className="description p-0 m-0"> {test} <br /> </p>
               )
            })
         )
      }
   }


      return (
         <Fade in={true}>
         <div className="row justify-content-center product-item no-gutters">

            <div className={`product-images align-items-center ${display === 'list-display' ? 'col-md-4 text-center' : ''}`}>
        
                  <Link to={`/product/${product._id}`} >
                     <img src={secondImg} alt={product.titleProduct} 
                        className={` second-image`}
                     />
                     <img src={firstImg} alt={product.titleProduct} 
                        className={`align-self-center first-image ${hov === "hov" ? "fadeOut" : ""}`}
                        onMouseEnter={() => setHov('hov')}
                        onMouseLeave={() => setHov('')}
                        // style={{position:"absolute", left:".5rem", width:"93%"}}
                     />  
                     {/* <img src={hov === "hov" ? firstImg : secondImg} alt={product.titleProduct} 
                        className={`align-self-center first-image ${hov === "hov" ? "" : ""}`}
                        onMouseEnter={() => setHov('hov')}
                        onMouseLeave={() => setHov('')}
                        // style={{position:"absolute", left:".5rem", width:"93%"}}
                     />   */}
                  </Link>
               {product.promotionProduct && <div className="promotion">Promo</div> }
               {product.novelty && <div className="novelty">New</div> }
            </div>

            

            {display === 'grid-display col-lg-4 col-md-6 col-sm-6' ? (
               <>
                  <div className='col-12'>
                     <p className="tags">{product.tags}</p>
                  </div>
                  
                  <div className='col-12'>
                  <h3>{product.titleProduct}</h3>
                  </div>
                  <h5>{product.priceProduct} €  {product.promotionProduct && <span className="promo-price">{product.oldPriceProduct} €</span>}  </h5>
                    {product.quantityProduct <= 0 && <Alert severity="error" className="rupture">Rupture !</Alert> } 
                  <div className='col-12'>
                  <div className={classes.root}>
                     {<Comments product={product}/>}
                  </div>
                  </div>
               </>
            ) : (
               <>
                  {/* <div className={`product-details ${display === 'list-display' && 'col-md-5'}`}> */}
                  <div className={`product-details ${'col-md-5'}`}>
                  <p className="tags">{product.tags}</p> 
                  <h3>{product.titleProduct}</h3>

                  {/* <h5>{product.priceProduct} €  {product.promotionProduct && <span className="promo-price">{product.oldPriceProduct} €</span>}  </h5> */}
                  {/* <p className="description">{product.descriptionProduct}</p> */}
                  {formatDescription(product.descriptionProduct)} 
                  <p className="mt-2">
                     <b>Taile :</b> {product.sizeProduct} <br />
                     <b>Poids :</b> {product.weightProduct} <br />
                     <b>Matière :</b> {product.matter} <br />
                  </p>

                  {product.quantityProduct < 1 && <Alert severity="error" className="rupture">Rupture</Alert>}
               </div>

                  <div className={`product-details ${'col-md-3'}`}>
                     <div className="row">
                        <div className="col-12">
                           <h5>{product.priceProduct} €  {product.promotionProduct && <span className="promo-price">{product.oldPriceProduct} €</span>}  </h5>
                        </div>
                        <div className="col-12">
                           <div className={classes.root}>
                              {/* Risque probleme Performances (call comments depuis le parent) */}
                              {<Comments  product={product}/>}
                           </div>
                        </div>
                        <div className='col-6 mt-3 text-center' style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                           <QuickView data={product} />
                        </div>
                        <div className='col-6 mt-3 text-center'>
                           <FavoriteBorderIcon style={{color:"rgba(0, 0, 0, 0.5)"}}/>
                        </div>
                        <div className="col p-2 page-view text-center mx-auto">
                            <Link to={`/product/${product._id}`} style={{height:"40px"}}>
                              Voir la page ...
                            </Link>
                          </div>
                     </div>
                  </div>
               </>
            )}
            


         </div>
         </Fade>
      );
   
}
export default Card