import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import {createStore}  from 'redux';
import { BrowserRouter} from 'react-router-dom';
import reducer from './store/reducers'
import registerServiceWorker from './registerServiceWorker';

import './assets/css/index.css';
import App from './components/App';




const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
