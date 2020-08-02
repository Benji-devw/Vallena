import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/UI/Header/Header';
import Layout from './views/components/Layout'
import CartPage from './views/components/Cart'

import { Login } from './components/Users/Login/Login'
import { Signup } from './components/Users/Signup/Signup'
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from './components/Dashboard/Dashboard'
import { ProductUpdate } from './components/Dashboard/Update_Product'


// import Layout from './components/Layout/Layout';
// import Cart from './views/Cart'

const App = props => {
  const { items, saveLocalStorage } = props

  useEffect(() => {     // s'execute quand il y a un changement ds l'etat local des items(Cart) (qty, delete, ...)
      // savegarde du panier dans le navigateur
    saveLocalStorage(items)
  }, [saveLocalStorage, items])

  return (
    <>
      <Router>
        {/* forceRefresh={true}   Effet de rechagement de page */}

        {/* Call HEADER */}
        <Header />

        {/* <Route path="/" component={Layout} /> */}
        {/* <Route path="/cart" component={Cart} /> */}

        <Switch>

          <Route path="/" exact component={() => <Layout

                                                />
                                          }/>
          <Route path="/cart" exact component={CartPage} />

          <Route path="/login" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/newsHome/update/:id" exact component={ProductUpdate} />

          <Route path="/" component={() => <div className="mt-5 text-center"><h1>Erreur 404</h1></div>} />

        </Switch>
      </Router>

      {/* <Layout />          Components */}

    </>
    );
}

export default App;
