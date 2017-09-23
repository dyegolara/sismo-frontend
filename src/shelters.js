import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'
import classNames from 'classnames'

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
      espacios: 0,
      necesidades: '',
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

  onChangeSpaces (e) {
    this.setState({espacios: e.target.value})
  }

  onChangeNeeds (e) {
    this.setState({necesidades: e.target.value})
  }

  toggleModal () {
    this.setState({modalOpen: !this.state.modalOpen}, this.resetState)
  }

  resetState () {
    this.setState({
      direccion: this.data.direccion,
      nombre: this.data.nombre,
      espacios: this.data.espacios,
      necesidades: this.data.necesidades,
      id: this.data.id
    })
  }

  setShelter (shelter) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      direccion: shelter.direccion,
      nombre: shelter.nombre,
      espacios: shelter.espacios,
      necesidades: shelter.necesidades,
      id: shelter.id
    })
  }

  onSubmit (id = '') {
    let { direccion, nombre, espacios, necesidades, shelters } = this.state
    let data = {
      albergues: {
        direccion,
        nombre,
        espacios,
        necesidades
      }
    }
    if (id) {
      API.Shelters.Update(id, data)
        .then(response => {
          let updatedShelter = response.albergues
          shelters = shelters.map(shelter => shelter.id === updatedShelter.id ? updatedShelter : shelter)
          this.setState({shelters}, this.resetState)
        })
    } else {
      API.Shelters.SendNewds(data)
        .then(response => {
          shelters.push(response.albergue)
          this.setState({shelters})
        })
    }
    this.toggleModal()
  }

  // Get clients
  loadData () {
    let {filters} = this.state
    let _filters = _pickBy(filters, filter => filter.length > 0)
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
    let {shelters, reqInProg} = this.state
    if (reqInProg) return <div>Cargando...</div>
    let table = <div>No hay resultados...</div>
    if (shelters.length > 0) {
      let sheltersList = shelters.map((shelter, index) => {
        return (
          <tr
            key={`shelters-${index}`}
            onClick={this.setShelter.bind(this, shelter)}
            className={classNames({'is-hidden': shelter.direccion === 'Duplicado'})}
          >
            <td>{shelter.direccion}</td>
            <td>{shelter.nombre}</td>
            <td>{shelter.espacios}</td>
            <td>{shelter.necesidades}</td>
          </tr>
        )
      })
      table = (
        <div>
          <table className='table is-striped is-fullwidth'>
            <thead>
              <tr>
                <th>Dirección</th>
                <th>Contacto</th>
                <th>Espacios disponibles</th>
                <th>Necesidades</th>
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
        title='Nuevo Reporte de Albergue'
        isActive={this.state.modalOpen}
        toggleModal={this.toggleModal.bind(this)}
        onSubmit={this.onSubmit.bind(this, this.state.id)}
      >
        <div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Dirección'
                value={this.state.direccion}
                onChange={this.onChangeAddress.bind(this)}
              />
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Contacto'
                value={this.state.nombre}
                onChange={this.onChangeName.bind(this)}
              />
            </div>
            <div className='column'>
              <TextField
                label='Cupo'
                value={this.state.espacios}
                onChange={this.onChangeSpaces.bind(this)}
                type='number'
              />
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Necesidades'
                value={this.state.necesidades}
                onChange={this.onChangeNeeds.bind(this)}
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
