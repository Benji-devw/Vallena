import React, { useEffect, useState}  from 'react';
import apiCallOrders from '../../../apiCall/Orders_Api'

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EuroRoundedIcon from '@material-ui/icons/EuroRounded';
import Button from '@material-ui/core/Button';

// import moment from 'moment'
// const Moment = require('moment')



const OrdersComponent2 = (props) => {

  const [order, setOrder] = useState([])
  console.log('order', order)
  // console.log('order', order)

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Statut
  const [inProgress, setInProgress] = useState(true)
  const [finish, setFinish] = useState(false)

  const handleCheckboxChangeProgress = (e) => { setInProgress(e.target.checked) }
  const handleCheckboxChangeFinish = (e) => { setFinish(e.target.checked) }

  const confirm = () => {
    setOrder(order => ({ ...order, statut: {
        inProgress: inProgress,
        finish: finish
      }
    }))
  }
  const update = async () => {
    const id = order._id
    await apiCallOrders.updateOrderById(id, order).then(res => {
      console.log('res', res)
    })
    window.alert(`Status changé !`)
    // window.location.reload(false)
  }

  useEffect(() => {
    setOrder(props.order)
  }, [props.order])


  return (
    <React.Fragment>
      <Accordion expanded={expanded === order._id} onChange={handleChange(order._id)} className={`order-items ${expanded === order._id ? 'order-items-style' : ''}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
           
          >
            {order.client.map((client, id) => (
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
                    <b><DateRangeOutlinedIcon /> </b> {client.payments.captures.map(e => e.create_time)} 
                    <br />
                    <b><EuroRoundedIcon /> </b> {client.amount.value} {client.amount.currency_code} 
                  </p>
                </div>
              </div>
            ))}
                <div className="col-md-2">
                  <div className={`statut ${order.statut.inProgress ? 'statut-inprogress' : ''}`}></div>
                  <div className={`statut ${order.statut.finish ? 'statut-finish' : ''}`}></div>
                </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row no-gutters" style={{ width: "100%" }}>

            <div className="col-12 statut-order text-right">
              <label htmlFor={`prep-${order._id}`}>Préparation</label>
              <input type="checkbox" className="mr-4" id={`prep-${order._id}`}
                defaultChecked={order.statut.inProgress}
                onChange={handleCheckboxChangeProgress}
              />
              <label htmlFor={`send-${order._id}`}>Envoyé</label>
              <input type="checkbox" id={`send-${order._id}`} className="mr-4"
                defaultChecked={order.statut.finish}
                onChange={handleCheckboxChangeFinish}
              />
              <Button onClick={confirm} variant="outlined" >Confirm</Button>
              <Button onClick={update} variant="outlined" color="primary">Envoyer</Button>
            </div>



            
              {order.items.map((item, id) => (
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
export default OrdersComponent2