import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import PuffLoader from "react-spinners/PuffLoader";

import Title from '../components/Title';

// import ChartPie from '../components/PieChart'
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Counter from '../components/Counter';
import apiCallOrders from '../../../apiCall/Orders_Api'

// import { useFetchAllOrders } from '../../../apiCall/FetchCall'
import OrdersComponent from '../components/OrdersForDash'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://vallena.fr/">
        Vallena.fr
      </Link>{' '} */}
      Vallena.fr
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));




export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const sumOrders = () => {
    if (order.length > 0) {
      let calc = []
      order.map(e => e.client.map(f => calc.push(parseInt(f.amount.value))))
      let sum = calc.reduce((a, b) => {
        return a + b
      }, 0)
      return sum
    } else { return 0 }
  }

  
  useEffect(() => {
    apiCallOrders.getAllOrders().then(order => {
      setOrder(order.data.data.reverse())
      setIsLoading(false)
    })
  }, [])
 

  return (
    <div className={classes.root}>
 
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
        <h1 className="mt-0">Tableau de bord</h1>
          <Grid>

            <div className="row justify-content-end">

              <div className="col-md-4 p-3">
                {/* Counter */}
              <Grid item >
                <Paper className={fixedHeightPaper}>
                  <Counter />
                </Paper>
              </Grid>
              </div>
              
              <div className="col-md-4 p-3">
                 {/* Deposits */}
              <Grid item >
                <Paper className={fixedHeightPaper}>
                  <Deposits order={order} onSumOrder={sumOrders}/>
                </Paper>
              </Grid>
              </div>
            </div>

            {/* Chart */}
            <Grid item xs={12} className="mb-3">
              <Paper className={fixedHeightPaper}>
                <Chart onSumOrder={sumOrders}/>
              </Paper>
            </Grid>
            {/* Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Dernières commandes</Title>
                {!isLoading ? (<> 
                  {order.map((e, id) => <OrdersComponent key={id} orders={e} />).slice(0, 3)}
                </>) : (<PuffLoader size={50} color={"#f50057"} />)}
                <Link to='/dashboard/orders' className="m-2">Voir les commandes</Link>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}