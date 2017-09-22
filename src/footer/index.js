import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Footer = props => {
  return (
    <div className='section'>
      <div className='content'>
        <p className='has-text-centered'>
          ¿Quieres contribuir?
          <p>
            <a href='https://github.com/dyegolara/sismo-frontend' target='_blank'>
              <code>Frontend en React</code>
            </a>
            &nbsp;&nbsp;
            <a href='https://github.com/LuisOsnet/sismo-api-rails' target='_blank'>
              <code>Backend en Ruby on Rails</code>
            </a>
          </p>
        </p>
        <p className='has-text-centered'>
          Hackeado por <a href='https://twitter.com/jmz7v' target='_blank'>Julio</a>, <a href='https://twitter.com/dyegolara' target='_blank'>Diego</a>, <a href='https://twitter.com/abuzzany' target='_blank'>Angel</a> y <a href='https://twitter.com/LuisOsnet' target='_blank'>Luis</a> .
        </p>
      </div>
    </div>
  )
}

export default Footer