import React from 'react'

export default props => {
  return (
    <div className='section'>
      <div className='content'>
        <p>Link directo al mapa <a href={props.mapLink} target='_blank'>{props.mapLink}</a></p>
        <p>Usar la funcionalidad de capas para ver zonas afectadas</p>
        {props.embeddedMap}
        <p>Link directo al mapa <a href={props.mapLink} target='_blank'>{props.mapLink}</a></p>
      </div>
    </div>
  )
}
