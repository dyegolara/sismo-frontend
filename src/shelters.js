import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'

import API from './api'
import TextField from './textField'
import Modal from './modal'
import Button from './button'

export default class Shelters extends Component {
  constructor () {
    super()
    this.data = {
      shelters: [],
      reqInProg: false,
      nombre: '',
      direccion: '',
      id: ''
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadData()
  }

  onChangeAddress (e) {
    this.setState({direccion: e.target.value})
  }

  onChangeName (e) {
    this.setState({nombre: e.target.value})
  }

  resetState () {
    this.setState({
      direccion: this.data.direccion,
      nnombre: this.data.nombre,
      id: this.data.id
    })
  }

  toggleModal () {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  setShelter (shelter) {
    this.setState({
      direccion: shelter.direccion,
      nombre: shelter.nombre,
      id: shelter.id
    }, this.toggleModal)
  }

  onSubmit (id = '') {
    let { direccion, nombre, shelters } = this.state
    let data = {
      direccion,
      nombre
    }
    if (id) {
      API.Shelters.Update(id, data)
        .then(response => {
          let updatedShelter = response.albergue
          shelters = shelters.map(shelter => shelter.id === updatedShelter.id ? updatedShelter : shelter)
          this.setState({ shelters }, this.resetState)
        })
    }
    API.Shelters.SendNewds(data)
      .then(response => {
        shelters.push(response.albergue)
        this.setState({ shelters })
      })
    this.toggleModal()
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

  renderNewButton () {
    return (
      <div className='new-element-container'>
        <Button
          className='is-pulled-right'
          buttonStyle='primary'
          onClick={this.toggleModal.bind(this)}
          icon='plus'
        >
          Nuevo Reporte de Albergue
        </Button>
      </div>
    )
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
            onClick={this.setShelter.bind(this, shelter)}
          >
            <td>{shelter.nombre}</td>
            <td>{shelter.direccion}</td>
            {/* <td><a href={shelter.mapsLink}>{shelter.mapsLink}</a></td> */}
          </tr>
        )
      })
      table = (
        <div>
          <table className='table is-striped is-fullwidth'>
            <thead>
              <tr>
                <th>Nombre</th>
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

  renderModal () {
    return (
      <Modal
        title='Nuevo Reporte de Edificio'
        isActive={this.state.modalOpen}
        toggleModal={this.toggleModal.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      >
        <div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Nombre'
                value={this.state.nombre}
                onChange={this.onChangeName.bind(this)}
              />
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Dirección'
                value={this.state.direccion}
                onChange={this.onChangeAddress.bind(this)}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  render () {
    return (
      <div>
        {this.renderNewButton()}
        {this.renderTable()}
        {this.renderModal()}
      </div>
    )
  }
}
