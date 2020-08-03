import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap'

import { ClientProfileContext } from '../../lib/ClientProfileContext'
import Section from '../../HOC/Section';


const InfosClient = () => {
   const [isValid, setValid] = useState(false)

   const value = useContext(ClientProfileContext);
   const {
      nom,
      prenom,
      email,
      adresse,
      cp,
      ville,
     setClientProfileContext
   } = value

   const validate = () => {
      let errors = []
      const inputs = document.querySelectorAll(".form-control-input")
      // console.log('inputs', inputs)
      inputs.forEach(input => {
         !input.value ? errors.push(input) : errors.length && errors.pop()
      })
      // console.log(errors)
      setValid(!errors.length)
      console.log('errors.length', errors.length)
   }

   useEffect(() => {
      validate()
   })

   return (
      <Fragment>
         <Section>
            <Container id="infosClient">

               <Row className="infosClient-header">
                  <Col>
                     <div className='intro text-center'>
                        <h1 className='title'> Vos informations </h1>
                     </div>
                  </Col>
               </Row>

               <Row>
                  <Col md={6} className="mx-auto p-3">
                  <Form>
                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                           <Form.Control placeholder="Nom" className="form-control-input"
                              name="nom"
                              defaultValue={nom}
                              onChange={e => {
                                 setClientProfileContext ({ [e.target.name]: e.target.value} )
                              }} 
                           />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFirstName">
                           <Form.Control placeholder="Prénom" className="form-control-input"
                              name="prenom"
                              defaultValue={prenom}
                              onChange={e => {
                                 setClientProfileContext({ [e.target.name]: e.target.value } )
                              }} 
                           />
                        </Form.Group>
                     </Form.Row>

                     <Form.Row>
                           <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control placeholder="Email" className="form-control-input"
                                 name="email"
                                 defaultValue={email}
                                 onChange={e => {
                                    setClientProfileContext({ [e.target.name]: e.target.value} )
                                 }} 
                              />
                           </Form.Group>
                     </Form.Row>
                     <br />
                     <Form.Group controlId="formGridAddress1">
                        <Form.Control placeholder="Adresse de livraison" className="form-control-input"
                           name="adresse"
                           defaultValue={adresse}
                           onChange={e => {
                              setClientProfileContext({ [e.target.name]: e.target.value })
                           }}
                        />

                     </Form.Group>

                     <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                           <Form.Control placeholder="Code Postal" className="form-control-input"
                              name="cp"
                              defaultValue={cp}
                              onChange={e => {
                                 setClientProfileContext({ [e.target.name]: e.target.value })
                              }}
                           />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                           <Form.Control placeholder="Ville" className="form-control-input"
                              name="ville"
                              defaultValue={ville}
                              onChange={e => {
                                 setClientProfileContext({ [e.target.name]: e.target.value })
                              }}
                           />
                        </Form.Group>
                     </Form.Row>

                     <Link to="/payment" className={`${ !isValid && 'disabled' } btn btn-outline-success float-right`}
                        
                     >
                        Confirmer
                     </Link>
                  </Form>
                  </Col>
               </Row>

            </Container>
         </Section>
      </Fragment>
   )
}
export default InfosClient