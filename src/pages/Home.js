import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import "../styles/home.scss";

import SideBar from '../components/SideBar'

import GetAllsProducts from "../components/Products/Get_all_Products";

export class Home extends Component {
  render() {
    return (
      <div className="back-home">
        {/* Stop bug paralax /Vanduul */}
        <div className="parallax"></div>

        <Container>
          <Row>
            <h1 className="mb-5 mt-5">NEWS</h1>
          </Row>

            <Row>
              <Col sm={3}>
                <SideBar />
              </Col>
            
              <GetAllsProducts />
          </Row>
        </Container>

      </div>
    );
  }
}

export default Home