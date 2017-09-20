import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import './index.css'
import App from './App'

import registerServiceWorker from './registerServiceWorker'

const $app = document.getElementById('root')

const routes = (
  <Route component={App}>
    <Route path='/personas' component={App} />
    <Route path='/edificios' component={App} />
    <Route path='/albergues' component={App} />
    <Route path='/donaciones' component={App} />
    <Route path='/mapa' component={App} />
    <Redirect from='/' to='/personas' />
  </Route>
)

ReactDOM.render(<Router routes={routes} history={browserHistory} />, $app)
registerServiceWorker()
