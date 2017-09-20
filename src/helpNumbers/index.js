import React from 'react'

const HelpNumbers = props => {
  return (
    <div className='section'>
      <div className='content'>
        <h2 className='title'>Teléfonos de emergencia</h2>
        <div className='columns'>
          <div className='column'>
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
          </div>
          <div className='column'>
            <h3 className='subtitle'>Estado de México</h3>
            <ul>
              <li>Emergencias: 066</li>
              <li>Cruz roja: 065</li>
              <li>Atención del Gobierno del Estado: 01-800 696-9696</li>
            </ul>
          </div>
          <div className='column'>
            <h3 className='subtitle'>Morelos</h3>
            <ul>
              <li>Informes Emergencia en Tultepec: 01800 696-9696</li>
              <li>Emergencias: 066</li>
              <li>Seguridad Pública del Estado: (77)7101-1000</li>
              <li>Protección Civil: (77)7100-0515 / (77)7100-0517</li>
              <li>Cruz Roja: (77)7315-3505 / (77)7315-3555</li>
            </ul>
          </div>
          <div className='column'>
            <h3 className='subtitle'>Puebla</h3>
            <ul>
              <li>Cruz Roja: (22)213-7700</li>
              <li>Locatel: (22)211-7800</li>
              <li>Bomberos: (22)245-8001</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpNumbers