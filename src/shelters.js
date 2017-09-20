import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'

import API from './api'

export default class Shelters extends Component {
  constructor () {
    super()
    this.data = {
      shelters: []
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
    API.Shelters.GetList(params)
      .then(response => {
        console.log(response)
        this.setState({shelters: response.albergues})
      })
  }

  renderTable () {
    let { shelters } = this.state
    let table = (<div>Cargando...</div>)
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
