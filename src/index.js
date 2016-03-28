
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import MainContainer from './containers/main-container';
import VisibleBookmarksList from './containers/visible-bookmarks-list';

require('file?name=[name].[ext]!../assets/favicon.ico');
require('../assets/octicons/octicons.css');
require('../assets/octicons/octicons.eot');
require('../assets/octicons/octicons.woff');
require('../assets/octicons/octicons.ttf');
require('../assets/octicons/octicons.svg');

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainContainer}>
        <IndexRoute component={VisibleBookmarksList} />
        <Route path="tag/:tag" component={VisibleBookmarksList} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('app'));
