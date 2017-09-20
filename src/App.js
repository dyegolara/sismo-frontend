import React, { Component } from 'react'
import './bulma.css'

class App extends Component {

  render () {
    return (
      <div className='container'>
        <h1 className='title'>Encontrar gente sismo</h1>
        <div className='tabs is-centered is-boxed is-medium'>
          <ul>
            <li className='is-active'>
              <a>
                <span>Personas</span>
              </a>
            </li>
            <li>
              <a>
                <span>Edificios</span>
              </a>
            </li>
            <li>
              <a>
                <span>Albergues</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default App
