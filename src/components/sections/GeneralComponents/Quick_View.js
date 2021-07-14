import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import apiCallProdcuts from '../../../apiCall/Call_Api'
import Alert from '@material-ui/lab/Alert';
import { MdAddShoppingCart } from 'react-icons/md';
import CenterMode from '../Shop/components/carousel'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
// import { RiShoppingCart2Line } from 'react-icons/ri'
// import VisibilityIcon from '@material-ui/icons/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import { addtoCart } from '../../../lib/actions'
import Comments from '../Shop/components/comments'
import SeeIcon from '../../../scss/img/icons/SeePreview.svg'
import Tooltip from '@material-ui/core/Tooltip';
import WishBtn from './../../Wishlist/WishBtn';




const QuickView = (props) => {

  const [data, setData] = useState([])
  const [imgs, setImgs] = useState([])
  const [show, setShow] = useState(false);

  // const [open, setOpen] = useState(false);
  // const handleClick = () => {
  //   setOpen(false)
  // };
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // Redux
  const itemsCart = useSelector(state => state.items)

  const dispatch = useDispatch()                        // Call dispatch to send redux
  const [qty, setQty] = useState(1)
  const add = (item, quantity) => {
    dispatch(addtoCart(item, quantity))
  }
  // Filtre add() si déja dans le panier
  const searchIdProduct = itemsCart.map(e => e.details._id)
  const findId = searchIdProduct.includes(data._id)


  useEffect(() => {
    setData(props.data)
    setImgs(props.data.imgCollection)
  }, [props.cat, props.data]);

  
  const btnViewPage = (id) => {
    return (
      <Link to={`/product/${id}`} style={{ height: "40px" }}>
        Voir la page ...
      </Link>
    )
  }

  const formatDescription = (str) => {
    if (str) {
      return (
        str.split("<br />").map(function (desc, id) {
          return (
            <p key={id} className="description p-0 m-0">
              {desc}
              <br />
            </p>
          )
        })
      )
    }
  }

  return (
    <>
      <div className="preview" onClick={() => setShow(true)}>
        <Tooltip title="Aperçu" placement="left-start">
          <img src={SeeIcon} alt="seeIcon" className="img-fluid" />
        </Tooltip>
      </div>

    <Modal
        show={show}
        onHide={() => setShow(false)}
        className="quick-view"
        centered
      >
        <div className="col-12 text-right close-modal">
          <Button onClick={() => setShow(false)}
          ><CloseSharpIcon />
          </Button>
        </div>

        <Modal.Body className="quick-view-body">
          <div className="row no-gutters">

            <div className="col-lg-6 align-self-center quick-view-body-left">
              {<CenterMode images={imgs} />}
            </div>     


            <div className="col-lg-6 quick-view-body-right">

              <div className="col-12 title-product p-0 m-0">
                <h2 className="title">{data.titleProduct}</h2>
              </div>

                <Comments product={data}/>

              <div className="row">
                <div className="col-4">
                  <h3>{data.priceProduct} € {data.promotionProduct && <span className="promo-price"> {data.oldPriceProduct} €</span>}</h3>
                </div>
                <div className="col-4 mb-3">
                  {data.promotionProduct && <div className="promotion-product">Promo</div>}
                  {data.novelty && <div className="novelty-product">New</div>}
                </div>
              </div>
                {formatDescription(data.descriptionProduct)} 
                <p>
                  <b>Taile :</b> {data.sizeProduct} <br />
                  <b>Matière :</b> {data.matter} <br />
                  <b>Tags :</b> {data.tags}
                </p>

              {data.quantityProduct > 0 ?
                <div className="add-cart-content">
                  {!findId ?
                    <>
                      <div className="row btn-content mt-2 mb-2">
                        {/* <div className="col-2 mt-2 mb-1">
                                    <span className="qty-text">QTY:</span>
                                 </div> */}
                        <div className="col-sm-6">
                          <div className="qty mx-auto mt-2">
                            <div className="btn-qty-cart text-center"
                              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                            >-</div>

                            <span className="btn btn-light">{qty}</span>

                            <div className="btn-qty-cart text-center"
                              onClick={() => setQty(data.quantityProduct > qty ? qty + 1 : qty)}
                            >+</div>
                          </div>

                        </div>
                        <div className="col-sm-6">
                          <Alert severity="info" className="mx-auto">
                            <span>{data.quantityProduct} en stock</span>
                          </Alert>
                        </div>

                      </div>

                      <div className="row justify-content-center">
                        <div className="col-md-5 p-2 m-2 add-to-cart text-center"
                            onClick={() => {
                                add(data, qty)
                                // handleClick()
                              }}
                              >
                            <MdAddShoppingCart size="1em" className="mr-2"/>
                            Ajouter au panier
                          </div>
                          <div className="col-md-5 p-2 m-2 page-view text-center">
                            {btnViewPage(data._id)}
                          </div>
                        </div>

                        
                    </>
                    :
                      <div className="row justify-content-center">
                        <div className="col-md-5 p-2 m-2 text-center">
                          <Alert severity="success" className="fadeIn mx-auto" style={{ width: "190px", height: "45px", marginTop:"-10px" }}>Dans votre panier !</Alert>
                        </div>
                        <div className="col-md-5 m-2 p-2 page-view text-center" style={{height:"40px"}}>
                          {btnViewPage(data._id)}
                        </div>
                      </div>
                  }
                  
                  <WishBtn />


                </div> : 
                  <div className="row justify-content-center">
                    <div className="col-md-5 p-2 m-2 text-center">
                        <Alert severity="error" className="fadeIn mx-auto" style={{width: "190px", height: "45px", marginTop:"-10px"  }}>Rupture !</Alert>
                      </div>
                      <div className="col-md-5 m-2 p-2 page-view text-center" style={{height:"40px"}}>
                        {btnViewPage(data._id)}
                      </div>
                    </div>
                }
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};
export default QuickView