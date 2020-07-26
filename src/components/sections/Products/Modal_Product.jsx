import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Row, Col, Button } from 'react-bootstrap'

const ModalProduct = props => {
	// console.log(props)
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="outline-primary" size="sm" onClick={handleShow}>
					More info
			</Button>

			<Modal show={show} onHide={handleClose} size="lg" animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
				
				<Modal.Header>
					<Modal.Title><h2>{props.title}</h2></Modal.Title>
				</Modal.Header>
				
				<Modal.Body className="pt-3">
					<h3 className='section-title'>Category : <span> {props.category}</span> </h3>
					<br />
					<Row>
						<Col>
							<h5 className='card-title'>Message :</h5>
							<p>{props.description}</p>
						</Col>
						<Col><h3 className='section-title'>Screen :</h3>
							<img src={props.img} alt="none" className="img-fluid" />
						</Col>
					</Row>
					<br />
					<h3 className='section-title'>Posted : <span>{props.date}</span> </h3>
					<h3 className='section-title'>By : <span>{props.reporter}</span></h3>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="outline-dark" size="sm" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>

			</Modal>
		</>
	);
}
export default ModalProduct