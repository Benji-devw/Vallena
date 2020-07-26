import React, { Component } from "react";
import { Container, Button } from 'react-bootstrap';
import { disconnect } from "../../utils/Logout";
import { ListProducts }from './List_Product'
import { InsertProduct }from './Insert_Product'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export class Dashboard extends Component {

  render() {
    var logout = disconnect;


    return (
      <Container>
        {/* Stop bug paralax /Vanduul */}
        <div className="parallax"></div>

        <div className="Dashboard text-center">
          <Button onClick={logout} type="submit" className="text-end mt-5 ">
            Déconnexion
          </Button>

          <h1 className="display-4 mb-2">Dashboard</h1>

          <Row>
            <Col><ListProducts /></Col>
          </Row>
          <Row>
            <Col><InsertProduct /></Col>
          </Row>
          
        
        </div>

      </Container>
    );
  }
}
export default Dashboard;