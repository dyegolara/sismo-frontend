import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'

import API from './api'

export default class Buildings extends Component {
  constructor () {
    super()
    this.data = {
      buildings: []
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadData()
  }

  // Get clients
  loadData () {
    let { filters, currentPage, sort } = this.state
    let _filters = _pickBy(filters, filter => filter.length > 0)
    // let page = currentPage > 1 ? {page: currentPage} : {}
    let params = Object.assign({}, _filters)
    API.Buildings.GetList(params)
      .then(response => {
        console.log(response)
        this.setState({buildings: response.edificios})
      })
  }

  renderTable () {
    let { buildings } = this.state
    let table = (<div>Cargando...</div>)
    if (buildings.length > 0) {
      let buildingsList = buildings.map((building, index) => {
        return (
          <tr
            key={`buildings-${index}`}
          >
            <td>{building.address}</td>
            <td>{building.colony}</td>
            <td>{building.status}</td>
            <td>{building.mapsLink}</td>
            <td>{building.comments}</td>
          </tr>
        )
      })
      table = (
        <div>
          <table className='table is-striped'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Estado</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {buildingsList}
            </tbody>
          </table>
        </div>
      )
    }
    return table
  }
  render () {
    return (
      <div>
        {this.renderTable()}
      </div>
    )
  }
}
