import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Main } from '../components/main'
import SearchableBookmarkListContainer from '../containers/searchable-bookmark-list-container'

export const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={SearchableBookmarkListContainer} />
      <Route path='tag/:tag' component={SearchableBookmarkListContainer} />
    </Route>
  </Router>
)
