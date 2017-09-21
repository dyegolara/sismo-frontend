import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Header = props => {
  return (
    <section className='hero is-dark is-bold'>
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

export default Header