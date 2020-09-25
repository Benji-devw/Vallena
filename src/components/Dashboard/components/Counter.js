import React, {useEffect, useState} from 'react';
import AnimatedNumber from "animated-number-react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


  const data = [
  { name: 'jan', visits: 1000},
  { name: 'fev', visits: 2000},
  { name: 'mars', visits: 8000},
  { name: 'avr', visits: 2780},
  { name: 'mai', visits: 1890},
  { name: 'juin', visits: 2390},
  { name: 'juil', visits: 3490},
  { name: 'aout', visits: 3490},
  { name: 'sept', visits: 3490},
  { name: 'oct', visits: undefined},
  { name: 'nov', visits: undefined},
  { name: 'dec', visits: undefined},
];


export default function Counter() {
  const [sumCounter, setSumCounter] = useState()
  const formatValue = (value) => value.toFixed(0);

  useEffect(() => {
    const sumCounter = async () => {
      const data = await fetch("https://api.countapi.xyz/get/localhost3000/visits")
      const count = await data.json()
      setSumCounter(count.value)
    }
    sumCounter()
  })

  return (
    <React.Fragment>
      <div className="card-dash">

        <div className="icon-dash" style={{background:"#FC9006"}}>
          <VisibilityIcon />
        </div>

        <div className="counter-chart text-right" style={{ width: '110%', height: 180 }}>
        
          <div style={{ color: "#FC9006", fontSize:"2em" }}>Total <AnimatedNumber value={sumCounter} formatValue={formatValue} /></div>
   
          <ResponsiveContainer>
            <ComposedChart
              data={data}
      
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" barSize={10} fill="#FC9006" />
              {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
              {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
            </ComposedChart>
          </ResponsiveContainer>
        
        </div>
       
        {/* <div className="date text-left"> */}
          {/* {moment().format('Do MMMM YYYY')} */}
          {/* depuis (mise en ligne)
        </div> */}
      </div>
    </React.Fragment>
  );
}