import React from 'react';
import EuroRoundedIcon from '@material-ui/icons/EuroRounded';
import AnimatedNumber from "animated-number-react";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import moment from 'moment'



export default function Deposits(props) {
  // console.log('props', props)

  // Calcul Quantity
  // const sumOrders = () => {
  //   if (props.order !== []) {
  //     let calc = []
  //     props.order.map(e => e.client.map(f => calc.push(parseInt(f.amount.value))))
  //     let sum = calc.reduce((a, b) => {
  //       return a + b
  //     }, 0) // reduce map sur les montant les add av a et b et increment
  //     return sum
  //   } else { return 0 }
  // }

  const formatValue = (value) => value.toFixed(2);

  return (
    <React.Fragment>
      <div className="card-dash">

        <div className="icon-dash">
          <AssignmentTurnedInIcon />
        </div>

        <div className="info text-right">
          <div style={{ color: "#61B765", fontSize: "1.6em", marginTop:"-1.5rem" }}>
            Montant des ventes <br /><br /><br />
            <span style={{ color: "#191919"}}><EuroRoundedIcon style={{ marginTop: "-.5rem"}}/> <AnimatedNumber value={props.onSumOrder} formatValue={formatValue} /></span> 
          </div>
        </div>
       
        <div className="date text-left">
          {moment().format('Do MMMM YYYY')}
        </div>
      </div>
    </React.Fragment>
  );
}