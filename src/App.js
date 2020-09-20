import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Success from './views/Success'

import ClientProfileContext from './lib/ClientProfileContext'
import IndexDbInit from './lib/IndexBdInit'
import apiCall from './apiCall/Products_Api'

import Shop from './views/Shop'
import Layout from './views/Layout'
import Checkout from './views/checkout'

import Header from './components/UI/Header/Header';
import { Login } from './components/Users/Login/Login'
import { Signup } from './components/Users/Signup/Signup'
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from './components/Dashboard/Dashboard'
import { ProductUpdate } from './components/Dashboard/Update_Product'


import ProductView from './components/sections/Shop/Shop_Product_View'

const App = props => {
  // console.log('app', props);
  const { items, saveLocalStorage } = props


  useEffect(() => {     // s'execute quand il y a un changement ds l'etat local des items(Cart) (qty, delete, ...)
    saveLocalStorage(items)   // savegarde du panier dans le navigateur

    const test=()=> {
      let indexDBFound = indexedDB.databases();
      // console.log('indexDBFound', indexDBFound)
       indexDBFound.then((value) => {
        if (value.length < 1) {
          console.log('APICALL');
          apiCall.getProducts().then(product => {
            IndexDbInit(product.data.products)
          })
        }
      })
    }
    test()
  }, [saveLocalStorage, items])

  return (
    <>
      <Router>
        <ClientProfileContext>

        <Header />

        <Switch>

          <Route path="/shop" component={Shop} />
          <Route path="/product/:id" component={ProductView} />

          <Route path="/" exact={true} component={Layout}/>
          
          <Route path="/payment" component={Checkout} />

          <Route path="/login" component={Login} />
          <Route path="/Signup" component={Signup} />

          <Route path="/success" component={Success} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/update/:id" component={ProductUpdate} />   {/* Lien => Update_Product.js */}

          {/* <Route path="/product/:id" component={ShopProductView} />   Lien => Update_Product.js */}

          <Route path="/" component={() => <div className="mt-5 text-center"><h1>Erreur 404</h1></div>} />

        </Switch>

        </ClientProfileContext>
      </Router>
    </>
    );
}
export default App;