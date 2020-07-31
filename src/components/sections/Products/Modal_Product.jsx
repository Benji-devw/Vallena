import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Row, Col, Button } from 'react-bootstrap'
import moment from 'moment'

import { MdAddShoppingCart } from 'react-icons/md';



const ModalProduct = props => {
	const data = props.datas
	const [show, setShow] = useState(false);
	const [count, setCount] = useState(1)

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="outline-primary" size="sm" onClick={handleShow}>
					More info
			</Button>

			<Modal show={show} onHide={handleClose} size="lg" animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
				
				{/* <Modal.Header>
					<Modal.Title><h2>{data.titleProduct}</h2></Modal.Title>
					<p className='section-title'>Categorie : <span> {data.categoryProduct}</span> </p>
				</Modal.Header> */}
				
				<Modal.Body className="pt-3">
					<br />
					<Row className="text-center mb-5">
						<Col>
							<p>{data.descriptionProduct}</p>
						</Col>
					</Row>
					<Row>
						<Col lg={8}>
							{/* <h5 className='section-title'>Screen :</h5> */}
							<img src={props.img} alt="none" className="img-fluid" />
						</Col>
						<Col lg={4}>
							<h3>{data.titleProduct}</h3>
							<h5>€ {data.priceProduct}</h5>

							<button type="button" className="btn btn-sm btn-secondary"
								onClick={() => setCount(count > 1 ? count -1 : 1)}
							>-</button>

							<span className="btn btn-light qty">{count}</span>

							<button type="button" className="btn btn-sm btn-secondary"
								onClick={() => setCount(count +1) }

								
							>+</button>

							<MdAddShoppingCart size="2em" className="ml-3"
								onClick={handleClose}
							/>

						</Col>
					</Row>
					<br />
				</Modal.Body>

					<Row lg="12" className="m-3">
						<Col xs="10">
							<p className='section-title text-left'>Posted : 
								By : <span>{data.reporterProduct}</span>
								<br />
								<span>{moment(data.createdAt).startOf().fromNow()}</span> 
							</p>
						</Col>
						<Col xs="2">
							<Button variant="outline-dark mx-right" size="sm" onClick={handleClose}> Close </Button>
						</Col>
					</Row>
			
			</Modal>
		</>
	);
}
export default ModalProduct