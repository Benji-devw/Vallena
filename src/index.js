import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';
import { AppContainer } from './views/appContainer'
/***** Redux *****/
/*****/
import { Provider } from 'react-redux'
import { store } from './lib/store'

ReactDOM.render(
   // <Provider /> rend le Redux storedisponible pour tous les composants imbriqués qui ont été encapsulés dans la connect()fonction.
   <Provider store={store}>      
      <AppContainer />
   </Provider>
, document.getElementById('root'));