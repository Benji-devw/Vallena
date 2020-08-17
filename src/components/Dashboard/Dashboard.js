import React, { Fragment } from "react";
import { Button } from 'react-bootstrap';
import { disconnect } from "../../utils/Logout";
import { ListProducts }from './List_Product'
import { InsertProduct }from './Insert_Product'


import { ListOrder } from './List_Order'

import Section from '../../HOC/Section'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {useFetchAllOrders} from '../../apiCall/FetchCall'

export const Dashboard = () => {
  const [loading, orders] = useFetchAllOrders()
  
    var logout = disconnect;

    if (loading) {
      return 'Chargement ...'
    }

    return (
      <Fragment>
      <Section calssName="pl-5 pr-5 ml-5 mr-5">

        <h1 className="display-4 mt-5 mb-2 text-center">Dashboard</h1>

        <div className="dashboard ml-5 mr-5 text-center">
          <Button onClick={logout} type="submit" className="text-end mt-3 ">
            Déconnexion
          </Button>

          <Row>

            <Col lg={12}><InsertProduct /></Col>
            
            <Col lg={12}><ListProducts /></Col>
          </Row>

          <Row>
            <Col>
                <h1> Commandes : <b className="text-primary">{orders.length}</b></h1>
                {orders.map(order => <ListOrder key={order._id} commandes={order}/> ) }

            </Col>
          </Row>
          
        </div>


        </Section>
      </Fragment>
    );
  }
export default Dashboard;