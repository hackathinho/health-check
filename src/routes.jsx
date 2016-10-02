import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import AboutPage from './components/info/AboutPage'
import NotFoundPage from './components/info/NotFoundPage'
import DataPage from './components/main/DataPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DataPage} />
    <Route path="data" component={DataPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
