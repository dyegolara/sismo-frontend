import React, { PropTypes } from 'react'
import classNames from 'classnames'

const WhatWeKnow = props => {
  return (
    <div className='section'>
      <div className='content'>
        <h2 className='title'>Lo que sabemos sobre el sismo</h2>
        <div className='columns'>
          <div className='column'>
            <h4 className='subtitle'>Datos</h4>
            <p>Magnitud: 7.1</p>
            <p>Ocurrido el martes 19 de septiembre de 2017 a las 13:14:40 horas (tiempo del Centro de México)</p>
          </div>
          <div className='column'>
            <h4 className='subtitle'>Epicentro</h4>
            <p>Latitud: 18.4°, Longitud: -98.72°, Profundidad: 57 km</p>
            <p>12 km al sureste de Axochiapan, Morelos</p>
          </div>
          <div className='column'>
            <h4 className='subtitle'>Réplicas</h4>
            <p>23 (la mayor de magnitud 4.0) hasta las 5 am del 20 de septiembre.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatWeKnow