import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import './index.css'
import App from './App'
import NewReport from './newReport'

import registerServiceWorker from './registerServiceWorker'

const $app = document.getElementById('root')

const routes = (
  <Route>
    <Route path='/personas' component={App} />
    <Route path='/personas/nuevo-reporte' component={NewReport} />
    <Route path='/edificios' component={App} />
    <Route path='/albergues' component={App} />
    <Route path='/donaciones' component={App} />
    <Redirect from='/' to='/personas' />
  </Route>
)

ReactDOM.render(<Router routes={routes} history={browserHistory} />, $app)
registerServiceWorker()
