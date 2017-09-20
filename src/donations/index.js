import React, { PropTypes } from 'react'
import classNames from 'classnames'

const SOURCE = [
  {
    link: 'http://www.topos.mx/',
    label: 'Topos – Brigada de Rescate Topos Tlaltelolco, A.C. (Earthquake help team)'
  },
  {
    link: 'https://www.amazon.com.mx/b?ie=UTF8&node=17290014011',
    label: 'Cruz Rojo Mexico (Red Cross Mexico) - Amazon Wishlist '
  },
  {
    link: 'https://www.donaunicef.org.mx/landing-terremoto/?utm_source=mpr_redes&utm_campaign=tw-terremoto&utm_medium=tw&utm_content=tw-org&utm_term=tw-org',
    label: 'UNICEF Mexico '
  },
  {
    link: 'https://www.globalgiving.org/projects/mexico-earthquake-and-hurricane-relief-fund/',
    label: 'Mexico Earthquake Relief Fund'
  },
  {
    link: 'http://www.elfinanciero.com.mx/nacional/quieres-ayudar-aqui-se-instalaran-los-centros-de-acopio.html',
    label: 'Centros de Acopio en DF/Local Support Center in Mexico City '
  },
  {
    link: 'http://www.projectpaz.org/',
    label: 'Support Mexico Earthquake Relief by Project Paz (New York based non-profit)'
  },
  {
    link: 'https://www.youcaring.com/mexicorecoveryeffort-955816',
    label: 'Unión del Barrio (CA) México Recovery Effort Donation Page'
  },
  {
    link: 'http://comoayudar.mx/',
    label: 'Collection of different donation options/Collecion de varias opcionés para donar a Mx'
  },
  {
    link: 'https://www.gofundme.com/b7uj4b-supporting-mexico',
    label: 'Supporting Mexico'
  },
]

const Donations = props => {
  let donations = SOURCE.map(function (don, index) {
    return (
      <li
        key={index}
      >
        <a
          target='_blank'
          href={don.link}
        >
          {don.label}
        </a>
      </li>
    )
  }.bind(this))
  return (
    <div className='section'>
      <div className='content'>
        <h2 className='title'>Donaciones</h2>
        <ul>
          {donations}
        </ul>
      </div>
    </div>
  )
}

export default Donations