import React, { PropTypes } from 'react'
import classNames from 'classnames'

const mapLink = 'https://www.google.com/maps/d/viewer?mid=1PwJrCIjz5PNfKAFrY-EX-iEkWH8'
const mapEmbed = 'https://www.google.com/maps/d/embed?mid=1PwJrCIjz5PNfKAFrY-EX-iEkWH8'

const Map = props => {
  return (
    <div className='section'>
      <div className='content'>
        <p>Link directo al mapa <a href='{mapLink}' target='_blank'>{mapLink}</a></p>
        <iframe
          src={mapEmbed}
          width='100%'
          height='500'
        ></iframe>
        <p>Link directo al mapa <a href='{mapLink}' target='_blank'>{mapLink}</a></p>
      </div>
    </div>
  )
}

export default Map