import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Main } from '../components/main'
import SearchableBookmarkListContainer from '../containers/searchable-bookmark-list-container'

export const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={SearchableBookmarkListContainer} />
    </Route>
  </Router>
)
