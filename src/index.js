
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Main } from './components/main';
import SearchableBookmarkListContainer from './containers/searchable-bookmark-list-container';

require('file?name=[name].[ext]!../assets/favicon.ico');
require('../assets/octicons/octicons.css');
require('../assets/octicons/octicons.eot');
require('../assets/octicons/octicons.woff');
require('../assets/octicons/octicons.ttf');
require('../assets/octicons/octicons.svg');

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={SearchableBookmarkListContainer} />
      <Route path="tag/:tag" component={SearchableBookmarkListContainer} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
