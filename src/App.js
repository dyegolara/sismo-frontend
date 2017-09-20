import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'
import './bulma.css'

import People from './people'
import Buildings from './buildings'
import Shelters from './shelters'

const TABS = [
  {
    label: 'Personas',
    slug: '/personas'
  },
  {
    label: 'Edificios',
    slug: '/edificios'
  },
  {
    label: 'Albergues',
    slug: '/albergues'
  }
]

class App extends Component {
  constructor (props) {
    super(props)
    let path = props.location.pathname
    let test = TABS.filter((tab) => { if (path.includes(tab.slug)) return tab })
    this.data = {
      currentTab: (typeof test[0] !== 'undefined') ? test[0].label : TABS[0].label
    }
    this.state = Object.assign({}, this.data)
  }

  // Set current tab to tab
  setTab (tab) {
    this.setState({'currentTab': TABS[tab].label})
    browserHistory.push(`${TABS[tab].slug}`)
  }

  renderTabs () {
    let renderTabs = TABS.map((tab, index) => {
      return (
        <li
          key={index}
          className={classNames({'is-active': tab.label === this.state.currentTab})}
          onClick={this.setTab.bind(this, index)}
        >
          <a>{tab.label}</a>
        </li>
      )
    })
    return (
      <div className='tabs is-centered is-boxed is-medium is-fullwidth'>
        <ul>
          {renderTabs}
        </ul>
      </div>
    )
  }

  renderContent () {
    let content = null

    switch (this.state.currentTab) {
      case TABS[0].label:
        content = (<People {...this.props} />)
        break
      case TABS[1].label:
        content = (<Buildings {...this.props} />)
        break
      case TABS[2].label:
        content = (<Shelters{...this.props} />)
        break
    }

    return content
  }

  // Render menu
  renderMenu () {
    return (
      <section className='hero is-primary'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>
              Ayuda para sismos, inundaciones y demás en México
            </h1>
            <h2 className='subtitle'>
              Sismo del 19 de septiembre de 2017
            </h2>
          </div>
        </div>
      </section>
    )
  }

  // Render footer
  renderFooter () {
    return (
      <div className='section'>
        <div className='content'>
          <p className='has-text-centered'>
                  Hackeado por <a href='https://twitter.com/jmz7v' target='_blank'>Julio</a>, <a href='https://twitter.com/dyegolara' target='_blank'>Diego</a>, <a href='https://twitter.com/cesarslh' target='_blank'>César</a>, <a href='https://twitter.com/abuzzany' target='_blank'>Angel</a> y <a href='https://twitter.com/LuisOsnet' target='_blank'>Luis</a> .
              </p>
        </div>
      </div>
    )
  }

  // Render help numbers
  renderHelpNumbers () {
    return (
      <div className='content'>
        <h2 className='title'>Teléfonos de emergencia</h2>
        <h3 className='subtitle'>Ciudad de México</h3>
        <ul>
            <li>Protección Civil: (55)5683-2222 / (55)5277-4177</li>
            <li>Emergencias: 911</li>
            <li>Sistema de aguas: (55)5654-3210</li>
            <li>Fugas: (55)5654-3210</li>
            <li>Locatel: (55)5658-1111</li>
            <li>Bomberos: 911 / (55)5768-3800 / (55)5768-2532</li>
            <li>Cruz Roja: 911 / 065 / (55)5557-5757</li>
            <li>Reporte fallas CFE: 071</li>
            <li>Información IMSS: 01-800-623-2323</li>
        </ul>
        <h3 className='subtitle'>Estado de México</h3>
        <ul>
            <li>Emergencias: 066</li>
            <li>Cruz roja: 065</li>
            <li>Atención del Gobierno del Estado: 01-800 696-9696</li>
        </ul>
        <h3 className='subtitle'>Morelos</h3>
        <ul>
            <li>Informes Emergencia en Tultepec: 01800 696-9696</li>
            <li>Emergencias: 066</li>
            <li>Seguridad Pública del Estado: (77)7101-1000</li>
            <li>Protección Civil: (77)7100-0515 / (77)7100-0517</li>
            <li>Cruz Roja: (77)7315-3505 / (77)7315-3555</li>
        </ul>
        <h3 className='subtitle'>Puebla</h3>
        <ul>
            <li>Cruz Roja: (22)213-7700</li>
            <li>Locatel: (22)211-7800</li>
            <li>Bomberos: (22)245-8001</li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderMenu()}
        <div className='container'>
          <div className='section'>
            {this.renderTabs()}
            {this.renderContent()}
          </div>
          <hr />
          {this.renderHelpNumbers()}
          <hr />
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default App
