import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import apiCall from '../../../apiCall/Products_Api'
import moment from 'moment'

import { addtoCart } from '../../../lib/actions'

import ControlledCarousel from './carousel'




const ShopProductView = props => {

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
         <div className="p-0 text-center">
            <div md={12} id="img-modal">

               {<ControlledCarousel images={imgs} />}

            </div>
            <div className="modal-corp" md={12}>
               <h3>{data.titleProduct}</h3>
               <h5>€ {data.priceProduct}</h5>
               <p>{data.quantityProduct} en stock</p>
            </div>

            {data.quantityProduct > 1 ? 	// Affichage à la volée avec opérateur ternaire
               <>
                  {!findId ?
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
export default ShopProductView














// export class ShopProductView extends React.Component {
//    constructor(props) {
//       super(props)

//       this.state = {
//          id: this.props.match.params.id,
//          imgCollection: '', imgCollectionCopy: '',
//          titleProduct: '', descriptionProduct: '',
//          priceProduct: '', categoryProduct: '',
//          sizeProduct: '', weightProduct: '',
//          quantityProduct: '', reporterProduct: '',
//          promotionProduct: false, stockProduct: true,
//          visible: true, notes: 0, comments: [],
//       }
//    }


//    componentDidMount = async () => {
//       const { id } = this.state
//       const product = await apiCall.getProductById(id)        // Lien => src/apiCall/index.js
//       console.log('product', product)
//       // 2 - Rempli les input avec les valeurs
//       this.setState({
//          imgCollection: product.data.data.imgCollection,
//          imgCollectionCopy: product.data.data.imgCollection,

//          titleProduct: product.data.data.titleProduct,
//          descriptionProduct: product.data.data.descriptionProduct,
//          priceProduct: product.data.data.priceProduct,
//          categoryProduct: product.data.data.categoryProduct,
//          sizeProduct: product.data.data.sizeProduct,
//          weightProduct: product.data.data.weightProduct,
//          quantityProduct: product.data.data.quantityProduct,
//          stockProduct: product.data.data.stockProduct,
//          promotionProduct: product.data.data.promotionProduct,
//          reporterProduct: product.data.data.reporterProduct,
//          visible: product.data.data.visible,
//       })

//    }



//    render() {
//       console.log(this.props)
//       return (
         
//          <>
//          <p>{this.props.children}</p>
            
//          </>
//       )
//    }
// }
// export default ShopProductView;