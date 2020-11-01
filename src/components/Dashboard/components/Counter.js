import React, {useEffect, useState} from 'react';
import AnimatedNumber from "animated-number-react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


//   const data = [
//   { name: 'jan', visits: 1000},
//   { name: 'fev', visits: 2000},
//   { name: 'mars', visits: 2000},
//   { name: 'avr', visits: 1780},
//   { name: 'mai', visits: 1890},
//   { name: 'juin', visits: 2390},
//   { name: 'juil', visits: 1490},
//   { name: 'aout', visits: 1490},
//   { name: 'sept', visits: 1490},
//   { name: 'oct', visits: undefined},
//   { name: 'nov', visits: undefined},
//   { name: 'dec', visits: undefined},
// ];


export default function Counter() {
  const [sumCounter, setSumCounter] = useState()
  const formatValue = (value) => value.toFixed(0);

  const result = 2402 + sumCounter

  useEffect(() => {
    const sumCounter = async () => {
      const dataCount = await fetch("https://api.countapi.xyz/get/localhost3000/counterVisit")
      const count = await dataCount.json()
      setSumCounter(count.value)
    }
    sumCounter()
  }, [])
  const data = [
    { name: 'jan', visits: 0 },
    { name: 'fev', visits: 0 },
    { name: 'mars', visits: 0 },
    { name: 'avr', visits: 0 },
    { name: 'mai', visits: 277 },
    { name: 'juin', visits: 345 },
    { name: 'juil', visits: 425 },
    { name: 'aout', visits: 524 },
    { name: 'sept', visits: 354 },
    { name: 'oct', visits: 477 },
    { name: 'nov', visits: sumCounter },
    { name: 'dec', visits: undefined },
  ];
  return (
    <React.Fragment>
      <div className="card-dash">

        <div className="icon-dash" style={{background:"#FC9006"}}>
          <VisibilityIcon />
        </div>

        <div className="counter-chart text-right" style={{ width: '110%', height: 180 }}>
        
          <div style={{ color: "#FC9006", fontSize:"1.6em" }}>
            Total <AnimatedNumber value={result.toFixed()} formatValue={formatValue} />
          </div>
   
          <ResponsiveContainer>
            <ComposedChart
              data={data}
              className="mt-4"
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