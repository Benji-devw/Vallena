import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Success from './views/Success'
// import ClientProfileContext from './lib/ClientProfileContext'
// import IndexDbInit from './lib/IndexBdInit'

/***** Views *****/
/*****/
import Shop from './views/Shop'
import Layout from './views/Layout'
import Checkout from './views/checkout'
import ProductView from './components/sections/Shop/Shop_Product_View'
/***** UI *****/
/*****/
import Header from './components/UI/Header/Header';
import SignIn from './components/Users/Login/Login'
import SignUp from './components/Users/Signup/Signup'
import { PrivateRoute } from "./components/PrivateRoute";
import { ProductUpdate } from './components/Dashboard/Update_Product'
/***** Dashboard *****/
/*****/
import Admin from './components/Dashboard'
import ListItemsView from './components/Dashboard/views/ListItems/ListItemsView'
import Orders from './components/Dashboard/views/Orders/Orders'
import Users from './components/Dashboard/views/Users/Users'
/***** Redux *****/
/*****/
import { addFilters } from './lib/actions'
import { useDispatch } from 'react-redux';
import SetCookie from './utils/Cookie_Counter'


const App = props => {
  const { items, saveLocalStorage, filters, saveFilters } = props

  const dispatch = useDispatch()
  if (localStorage.getItem('Filters') === null) {
    localStorage.setItem('Filters', JSON.stringify([{ "cat": [], "matter": [], "color": [], "collection": [], "promotion": [], "novelty": [] }]))
    dispatch(addFilters([], [], [], [], [], []))
  }

  useEffect(() => {
    saveLocalStorage(items)
    saveFilters(filters)
  }, [saveLocalStorage, items, saveFilters, filters, dispatch])

  return (
    <>
      <Router>
        {/* <ClientProfileContext> */}

        <Header />

        <Switch>

          <Route exact path="/shop" component={Shop} />
          <Route exact path="/product/:id" component={ProductView} />
          <Route path="/" exact={true} component={Layout}/>
          <Route exact path="/payment" component={Checkout} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/Signup" component={SignUp} />
          <Route exact path="/update/:id" component={ProductUpdate} />

          <PrivateRoute path="/dashboard" component={Admin} />
          <PrivateRoute path="/dashboard/listitems" component={ListItemsView} />
          <PrivateRoute path="/dashboard/orders" component={Orders} />
          <PrivateRoute path="/dashboard/users" component={Users} />

          <Route component={() => <div className="mt-5 pt-5 text-center"><h1>404</h1></div>} />
        </Switch>

        {/* </ClientProfileContext> */}
      </Router>
        {SetCookie()}

    </>
    );
}
export default App;