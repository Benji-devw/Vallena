import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal'
import { Row, Col, Button } from 'react-bootstrap'
import moment from 'moment'

import { MdAddShoppingCart } from 'react-icons/md';

import { addtoCart } from '../../../lib/actions'
import ControlledCarousel from './carousel'


const HomeModalProducts = ({ item }) => {
	const itemsCart = useSelector(state => state.items)
	// console.log('item', item._id)
	// console.log('itemsCart', itemsCart)

	// Show Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Redux
	const [qty, setQty] = useState(1)
	const dispatch = useDispatch()				// Dispatch l'item du store localement pr le lire
	// utilise dispatch pour envoyer item et quantity au store
	
	const add = (item, quantity) => {
		dispatch(addtoCart(item, quantity))
	}

	// Filtre add() si déja dans le panier
	const searchIdProduct = itemsCart.map(e => e.details._id)
	const foundId = searchIdProduct.includes(item._id)


	return (
		<div className="modal-home">
			<img onClick={handleShow} src={item.imgCollection[0]} className='img-product img-fluid' alt='imgProduct' />

			<Modal show={show} onHide={handleClose} size="lg" animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
				
				<Modal.Body style={{padding: "0"}}>
					<Row className="p-0">
						<Col md={12} id="img-modal">
							<ControlledCarousel images={item.imgCollection} />
							{/* <img src={item.imgCollection[0]}  alt="none" className="img-fluid" /> */}
						</Col>
						<Col className="modal-corp" md={12}>
							<h3>{item.titleProduct}</h3>
							<h5>€ {item.priceProduct}</h5>
							<p>{item.quantityProduct} en stock</p>
						</Col>
						<Col>
							{item.quantityProduct > 1 ? 	// Affichage à la volée avec opérateur ternaire
							<>
								{!foundId ? 
										<div className="addToCart">
											<div className="btn-qty-modal"
												onClick={() => setQty(qty > 1 ? qty -1 : 1)}		// tant que qty est supp a 1 ? qty -1 sinon return 1
											>-</div>

											<span className="btn btn-light qty">{qty}</span>

											<div className="btn-qty-modal"
												onClick={() => setQty(item.quantityProduct > qty ? qty + 1 : qty)}
											>+</div>

											<MdAddShoppingCart size="2em" className="ml-3" style={{cursor: "pointer"}}
												onClick={() => add(item, qty)} />

										</div>
									: <p>Est déjà dans votre panier !</p> }
							</> : <p>Rupture !</p>}

						</Col>
					</Row>
					<br />
				</Modal.Body>

					<Row lg="12" className="m-3">
						<Col xs="10">
							<p className='section-title text-left'>Posted : 
								By : <span>{item.reporterProduct}</span>
								<br />
								<span>{moment(item.createdAt).startOf().fromNow()}</span> 
							</p>
						</Col>
						<Col xs="2">
							<Button variant="outline-dark mx-right" size="sm" onClick={handleClose}> Close </Button>
						</Col>
					</Row>
			
			</Modal>
		</div>
	);
}
export default HomeModalProducts