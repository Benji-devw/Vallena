import React, { useState}  from 'react';
// import apiCallOrders from '../../../apiCall/Orders_Api'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EuroRoundedIcon from '@material-ui/icons/EuroRounded';
import moment from 'moment';



const OrdersComponent = (props) => {

  // const [order, setOrder] = useState(props.orders)
  // console.log('order', order)

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <React.Fragment>
        <Accordion expanded={expanded === props.orders._id} onChange={handleChange(props.orders._id)} className={`order-items ${expanded === props.orders._id ? 'order-items-style' : ''}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
           
          >
            {props.orders.client.map((client, id) => (
              <div key={id} className="row no-gutters text-left" style={{width:"100%"}}>
                <div className="col-md-6">
                  <p  className="">
                    <b><PersonOutlineOutlinedIcon /> </b> {client.shipping.name.full_name}
                    <br />
                    <b><LocalShippingIcon /> </b>
                      {client.shipping.address.address_line_1} {client.shipping.address.address_line_2} - {client.shipping.address.admin_area_2}
                      {client.shipping.address.country_code} - {client.shipping.address.postal_code}
                  </p>
                </div> 

                <div className="col-md-4">
                  <p>
                    <b><DateRangeOutlinedIcon /> </b> {client.payments.captures.map(e => moment(e.create_time).format('Do MMMM YYYY'))} 
                    <br />
                    <b><EuroRoundedIcon /> </b> {client.amount.value} {client.amount.currency_code} 
                  </p>
                </div>
              </div>
            ))}
              <div className="col-md-2 status-container">
              <div className={`statut ${props.orders.statut.inProgress ? 'statut-inprogress' : ''}`}></div>
              <div className={`statut ${props.orders.statut.finish ? 'statut-finish' : ''}`}></div>
              </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row no-gutters" style={{ width: "100%" }}>
            
              {props.orders.items.map((item, id) => (
                <div key={id} className="col-sm-6">
                  <div className="row p-3 align-items-center ">
                  <div className="col-sm-4">
                    <img src={item.details.imgCollection[0]} alt={item.details._id} className="img-fluid"/> 
                  </div>
                   <div className="col-sm-8">
                     <h5>{item.details.titleProduct}</h5>
                      <p>
                        {item.details._id} <br />  {item.details.priceProduct}€/u 
                        <br /> poids : <b>{item.details.weightProduct}</b> <br /> 
                        Quantités : <strong style={{fontSize:"1.3em"}}>{item.quantity}</strong>
                      </p>
                   </div>
                  </div>
                 </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
    </React.Fragment>
  );
}
export default OrdersComponent