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
      let buildingsList = buildings.map(building => {
        return (
          <tr
            key={`buildings-${building.id}`}
          >
            <td>{building.direccion}</td>
            <td>{building.colonia}</td>
            <td>{building.estado}</td>
            <td>{building.notas}</td>
          </tr>
        )
      })
      table = (
        <div>
          <table className='table is-striped is-fullwidth'>
            <thead>
              <tr>
                <th>Direccion</th>
                <th>Colonia</th>
                <th>Estado</th>
                <th>Notas</th>
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
