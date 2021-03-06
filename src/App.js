import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'

import API from './api'
import People from './people'
import Buildings from './buildings'
import Shelters from './shelters'
import Donations from './donations'
import Map from './map'

// Estáticos
import HelpNumbers from './helpNumbers'
import Footer from './footer'
import Header from './header'
import WhatWeKnow from './whatWeKnow'

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
    label: 'Mapa',
    slug: '/mapa'
  },
  {
    label: 'Albergues',
    slug: '/albergues'
  },
  {
    label: 'Donaciones',
    slug: '/donaciones'
  }
]

const MAP_LINK = 'https://google.org/crisismap/google.com/puebla-mexico-earthquake-es?hl=es-MX'

class App extends Component {
  constructor (props) {
    super(props)
    let path = props.location.pathname
    let test = TABS.filter((tab) => { if (path.includes(tab.slug)) return tab })
    this.data = {
      currentTab: (typeof test[0] !== 'undefined') ? test[0].label : TABS[0].label,
      buildings: [],
      reqInProg: false,
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadBuildingsData()
    this.loadMapData()
  }

  // Get buildings
  loadBuildingsData () {
    this.setState({reqInProg: true})
    API.Buildings.GetList()
      .then(response => {
        this.setState({buildings: response.edificios, reqInProg: false})
      })
  }

  loadMapData () {
    let embeddedMap = <iframe
      width='100%'
      height='500'
      src={`${MAP_LINK}&embedded=true`}
      style={{border: '1px solid #ccc'}} />
    this.setState({ embeddedMap })
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
      <div className='tabs is-centered is-boxed responsive is-fullwidth'>
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
        content = (<Buildings
          reqInProg={this.state.reqInProg}
          buildings={this.state.buildings}
          loadData={this.loadBuildingsData.bind(this)}
        />)
        break
      case TABS[2].label:
        content = (<Map
          mapLink={MAP_LINK}
          embeddedMap={this.state.embeddedMap}
        />)
        break
      case TABS[3].label:
        content = (<Shelters {...this.props} />)
        break
      case TABS[4].label:
        content = (<Donations {...this.props} />)
        break
    }

    return content
  }

  render () {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='section'>
            <div className='notification is-info'>Lo que más están solicitando en éste momento son: impermeables, baterías, diesel, plantas de luz y maquinaria/herramientas para remover escombros. Acércate a tu centro de acopio más cercano para ayudar.</div>
            {this.renderTabs()}
            {this.renderContent()}
          </div>
          <hr />
          <HelpNumbers />
          <hr />
          <WhatWeKnow />
          <hr />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
