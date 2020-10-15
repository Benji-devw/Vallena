import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Success from './views/Success'
// import ClientProfileContext from './lib/ClientProfileContext'
// import IndexDbInit from './lib/IndexBdInit'

import Shop from './views/Shop'
import Layout from './views/Layout'
import Checkout from './views/checkout'

import Header from './components/UI/Header/Header';
import SignIn from './components/Users/Login/Login'
import SignUp from './components/Users/Signup/Signup'
import { PrivateRoute } from "./components/PrivateRoute";
import { ProductUpdate } from './components/Dashboard/Update_Product'

// Dashboard
import Admin from './components/Dashboard'
import ListItemsView from './components/Dashboard/views/ListItems/ListItemsView'
import Orders from './components/Dashboard/views/Orders/Orders'
import Users from './components/Dashboard/views/Users/Users'

import CookieConsent, { Cookies } from "react-cookie-consent";

import ProductView from './components/sections/Shop/Shop_Product_View'

const App = props => {
  // console.log('app', props);
  const { items, saveLocalStorage, filters, saveFilters } = props
  
  // Cookies & CounterAPI
  const updateCounter = async () => {
    const data = await fetch("https://api.countapi.xyz/hit/localhost3000/visits")
    const count = await data.json()
    console.log(data);
    console.log('count', count)
    }
  const checkCookies = Cookies.get("userExp")
  if (!checkCookies) {
    // Si pas de cookies set cookies et +1 counterAPI
    Cookies.set("userExp", "1");
    updateCounter()
  }



  useEffect(() => {     // s'execute quand il y a un changement ds l'etat local des items(Cart) (qty, delete, ...)
    saveLocalStorage(items)   // savegarde du panier dans le navigateur*
    saveFilters(filters)
  }, [saveLocalStorage, items, saveFilters, filters])

  return (
    <>
      <Router>
        {/* <ClientProfileContext> */}

        <Header />

        <Switch>

          <Route path="/shop" component={Shop} />
          <Route path="/product/:id" component={ProductView} />

          <Route path="/" exact={true} component={Layout}/>
          
          <Route path="/payment" component={Checkout} />
          <Route path="/success" component={Success} />

          <Route path="/login" component={SignIn} />
          <Route path="/Signup" component={SignUp} />

          <PrivateRoute path="/dashboard" component={Admin} />
          <PrivateRoute path="/dashboard/listitems" component={ListItemsView} />
          <PrivateRoute path="/dashboard/orders" component={Orders} />
          <PrivateRoute path="/dashboard/users" component={Users} />

          <Route path="/update/:id" component={ProductUpdate} />   {/* Lien => Update_Product.js */}
          

          {/* <Route path="/product/:id" component={ShopProductView} />   Lien => Update_Product.js */}

          <Route path="/" component={() => <div className="mt-5 text-center"><h1>Erreur 404</h1></div>} />

        </Switch>

        {/* </ClientProfileContext> */}
      </Router>
      {!checkCookies &&
        <>
          <CookieConsent
            buttonText="Ok"
            expires={1}
            style={{ background: "rgba(0, 0, 0, 0.7)" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          >
            Ce site Web utilise des cookies pour améliorer l'expérience utilisateur.{" "}
          </CookieConsent>
        </>
      }
    </>
    );
}
export default App;