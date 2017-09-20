import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'

import API from './api'

export default class Shelters extends Component {
  constructor () {
    super()
    this.data = {
      shelters: [],
      reqInProg: false
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
    this.setState({reqInProg: true})
    API.Shelters.GetList(params)
      .then(response => {
        this.setState({shelters: response.albergues, reqInProg: false})
      })
  }

  renderTable () {
    let { shelters, reqInProg } = this.state
    if (reqInProg) return <div>Cargando...</div>
    let table = <div>No hay resultados...</div>
    if (shelters.length > 0) {
      let sheltersList = shelters.map((shelter, index) => {
        return (
          <tr
            key={`shelters-${index}`}
          >
            <td>{shelter.type}</td>
            <td>{shelter.address}</td>
            {/* <td><a href={shelter.mapsLink}>{shelter.mapsLink}</a></td> */}
          </tr>
        )
      })
      table = (
        <div>
          <table className='table is-striped is-fullwidth'>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              {sheltersList}
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
