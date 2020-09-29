import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis,CartesianGrid,Legend,Tooltip, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
// https://recharts.org/en-US/examples/SynchronizedLineChart

// Generate Sales Data
// function createData(month, sale) {
//   return { month, sale };
// }

const data = [
  // createData('jan', 0),
  { name: 'jan', uv: 1000, vente: 0, amt: 2400, },
  { name: 'fev', uv: 2000, vente: 8398, amt: 2210, },
  { name: 'mars', uv: 5000, vente: 2800, amt: 2290, },
  { name: 'avr', uv: 2780, vente: 3908, amt: 2000, },
  { name: 'mai', uv: 1890, vente: 4800, amt: 2181, },
  { name: 'juin', uv: 2390, vente: 3800, amt: 2500, },
  { name: 'juil', uv: 3490, vente: 5300, amt: 2100, },  
  { name: 'aout', uv: 3490, vente: 6300, amt: 2100, },
  { name: 'sept', uv: 3490, vente: 7300, amt: 2100, },
  { name: 'oct', uv: 3490, vente: undefined, amt: 2100, },
  { name: 'nov', uv: 3490, vente: undefined, amt: 2100, },
  { name: 'dec', uv: 3490, vente: undefined, amt: 2100, },
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Vente 2020</Title>
      <ResponsiveContainer>
        <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
          >
            Sales ($)
            </Label>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="vente" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}