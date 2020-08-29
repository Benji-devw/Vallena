import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';
// Redux
import { Provider } from 'react-redux'
import { store } from './lib/store'
import { AppContainer } from './views/appContainer'

// import App from './App';
// import {openSidebar} from './lib/actions'

// log the initial state
// console.log('Store', store.getState())
// const unsubscribe = store.subscribe(() => console.log(store.getState()))
// store.dispatch(addtoCart({name: 'citron'}, 2 ))
// store.dispatch(addtoCart( {name: 'kiwi'}, 5))
// store.dispatch(openSidebar(openSidebar.SHOW_COMPLETED))
// unsubscribe()


ReactDOM.render(
   // <Provider /> rend le Redux storedisponible pour tous les composants imbriqués qui ont été encapsulés dans la connect()fonction.
   <Provider store={store}>      
      <AppContainer />
   </Provider>
, document.getElementById('root'));