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

  render () {
    return (
      <div>
        {this.renderMenu()}
        <div className='container'>
          <h1 className='title'>Encontrar gente sismo</h1>
          {this.renderTabs()}
          {this.renderContent()}
        </div>
        <hr />
        {this.renderFooter()}
      </div>
    )
  }
}

export default App
