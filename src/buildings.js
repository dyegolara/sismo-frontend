import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'

import API from './api'
import TextField from './textField'
import SelectField from './selectField'
import Modal from './modal'
import Button from './button'

const STATUS = [
  {id: 'Desaparecido', label: 'Desaparecido'},
  {id: 'Encontrado', label: 'Encontrado'},
  {id: 'Fallecido', label: 'Fallecido'}
]

export default class Buildings extends Component {
  constructor () {
    super()
    this.data = {
      buildings: [],
      modalOpen: false,
      direccion: '',
      colonia: '',
      estado: '',
      link: '',
      notas: ''
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadData()
  }

  onChangeAddress (e) {
    this.setState({direccion: e.target.value})
  }

  onChangeColony (e) {
    this.setState({colonia: e.target.value})
  }

  onChangeStatus (e) {
    this.setState({estado: e.target.value})
  }

  onChangeLink (e) {
    this.setState({link: e.target.value})
  }

  onChangeNotes (e) {
    this.setState({notas: e.target.value})
  }

  toggleModal () {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  onSubmit () {
    let { direccion, colonia, estado, link, notas, buildings } = this.state
    let data = {
      direccion,
      colonia,
      estado,
      link,
      notas
    }
    API.Buildings.SendNewds(data)
      .then(response => {
        buildings.push(response.edificio)
        this.setState({ buildings })
      })
    this.toggleModal()
  }

  // Get clients
  loadData () {
    let { filters, currentPage, sort } = this.state
    let _filters = _pickBy(filters, filter => filter.length > 0)
    // let page = currentPage > 1 ? {page: currentPage} : {}
    let params = Object.assign({}, _filters)
    API.Buildings.GetList(params)
      .then(response => {
        this.setState({buildings: response.edificios})
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
          Nuevo Reporte
        </Button>
      </div>
    )
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
            <td><a href={building.link}>{building.link}</a></td>
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
                <th>Link al mapa</th>
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

  renderModal () {
    return (
      <Modal
        title='Nuevo Reporte'
        isActive={this.state.modalOpen}
        toggleModal={this.toggleModal.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
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
                label='Colonia'
                value={this.state.colonia}
                onChange={this.onChangeColony.bind(this)}
              />
            </div>
            <div className='column'>
              <TextField
                label='Estado'
                value={this.state.estado}
                onChange={this.onChangeStatus.bind(this)}
              />
            </div>
            <div className='column'>
              <TextField
                label='Link del mapa'
                value={this.state.link}
                onChange={this.onChangeLink.bind(this)}
              />
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Notas'
                value={this.state.notas}
                onChange={this.onChangeNotes.bind(this)}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  render () {
    return (
      <div className='flex-column'>
        {this.renderNewButton()}
        {this.renderTable()}
        {this.renderModal()}
      </div>
    )
  }
}
