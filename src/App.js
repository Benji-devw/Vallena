import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ClientProfileContext from './lib/ClientProfileContext'
import Checkout from './views/checkout'
import Payment from './components/Checkout/payment'
import Confirm from './components/Checkout/confirm'

import Layout from './views/Layout'
import CartPage from './views/Cart'

import Header from './components/UI/Header/Header';
import { Login } from './components/Users/Login/Login'
import { Signup } from './components/Users/Signup/Signup'
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from './components/Dashboard/Dashboard'
import { ProductUpdate } from './components/Dashboard/Update_Product'

import ShopProductView from './components/sections/Shop/Shop_Product_View'

const App = props => {
  const { items, saveLocalStorage } = props

  useEffect(() => {     // s'execute quand il y a un changement ds l'etat local des items(Cart) (qty, delete, ...)
      // savegarde du panier dans le navigateur
    saveLocalStorage(items)
  }, [saveLocalStorage, items])

  return (
    <>
      <Router>
        <ClientProfileContext>

        <Header />


        <Switch>

          <Route path="/" exact component={() => <Layout /> }/>
          <Route path="/cart" exact component={CartPage} />
          
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/confirm" exact component={Confirm} />

          <Route path="/login" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/update/:id" exact component={ProductUpdate} />   {/* Lien => Update_Product.js */}

          <Route path="/product/:id" exact component={ShopProductView} />   {/* Lien => Update_Product.js */}

          <Route path="/" component={() => <div className="mt-5 text-center"><h1>Erreur 404</h1></div>} />

        </Switch>

        </ClientProfileContext>
      </Router>
    </>
    );
}
export default App;