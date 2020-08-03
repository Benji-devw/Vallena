import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Section from '../../HOC/Section';


const Confirm = () => {
   return (
      <Fragment>
         <Section>
            <Container id="confirm">
               <Row className="confirm-header">
                  <Col>
                     <div className='intro text-center'>
                        <h1 className='title'> Merci pour votre commande </h1>
                     </div>
                  </Col>
               </Row>

            </Container>
         </Section>
      </Fragment>
   )
}
export default Confirm