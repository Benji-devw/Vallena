import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap'

import apiCallStripe from '../../apiCall/Orders_Api'


export const ListOrder = props => {

   const [order, setOrder ] = useState(props.commandes)
   

   const [ inProgressCheck, setInProgress] = useState(true)
   const [ finishCheck, setFinish] = useState(false)

   const handleCheckboxChangeProgress = (e) => {
      const checkbOne = e.target.checked
      setInProgress ( checkbOne )
   }
   const handleCheckboxChangeFinish = (e) => {
      const checkbTwo = e.target.checked
      setFinish ( checkbTwo )
   }

   const valid = () => {
      setOrder(order => ({...order, status: {
         inProgress: inProgressCheck,
         finish: finishCheck
      }}))
   }
   const update = async () => {
      const id = order._id
      await apiCallStripe.updateOrderById(id, order).then(res => {
      })
      window.alert(`Status changé !`)
      window.location.reload(false)
   }

   return (

         <Card key={order._id} className={order.status.finish ? "border-success m-5" : "border-primary m-5" } id="card-cmd" >

            <Row style={{ marginTop: "-21px", marginBottom: '0px' }} className='text-right'>
               <Col>
                  Préparation : {order.status.inProgress}
                  <input type="checkbox" className="mr-3"
                     defaultChecked={order.status.inProgress}
                     onChange={handleCheckboxChangeProgress}
               
                  />
                  Envoyé : {order.status.finish}
                  <input type="checkbox"
                     defaultChecked={order.status.finish}
                     onChange={handleCheckboxChangeFinish}

                  />
                  <Button onClick={() =>  valid} className="btn-sm p-1 ml-3" style={{fontSize:".8em", marginTop:"-15px"}}>Confirm</Button>
                  
                  <Button onClick={update} className="btn-sm p-1 ml-3" style={{fontSize:".8em", marginTop:"-15px"}}>Save</Button>
               </Col>
            </Row>
            <Card.Header className={order.status.finish != true ? '' : 'bg-success'}>
               <Row>
                  <Col md={6} className="text-left">
                     Client : <span className="text-primary"><b> {order.client.nomClient} {order.client.prenomClient} </b></span> <br />
                     Contact : <span className="text-primary"> {order.client.emailClient} </span> <br />
                     Adresses : <span className="text-primary"> {order.client.adresseClient} - {order.client.cpClient} - {order.client.villeClient} </span>
                  </Col>
                  <Col md={6} className="text-left">
                     Date cmd : <b>{order.createdAt}</b> <br />
                     Nbr d'article : <b>{order.items.length}</b> <br />
                     FraisP : <b>{order.totalCmd.shipping}</b> € -- TOTAL : <b>{order.totalCmd.total}</b> €
                  </Col>
                  {/* <Col md={2}>
                     
                  </Col> */}
               </Row>

            </Card.Header>

            {order.items.map(item =>
               <Card.Body key={item.id} className="p-0">
                  <Card.Title></Card.Title>

                  <Row className="justify-content-center text-dark" >

                     <Col md={2} className="text-danger"> ID : {item.details._id}</Col>
                     <Col md={2}> <h4><b>{item.details.titleProduct}</b></h4></Col>
                     <Col md={2}>
                        Quantité : <b>{item.quantity}</b>
                     </Col>
                     <Col md={2}>
                        Catégorie : <b>{item.details.categoryProduct}</b>
                     </Col>
                     <Col md={2}>
                        Dimension : <b>{item.details.sizeProduct}</b> cm
                     </Col>
                     <Col md={2}>
                        poids : <b>{item.details.weightProduct}</b> k/g
                     </Col>
                     {/* <Col md={4}>
                        <img src={img} className="img-fluid" alt="img" />
                     </Col> */}

                  </Row>
                  <hr />

               </Card.Body>
            )}
         </Card>



   );
   }
