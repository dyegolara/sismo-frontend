import React, { Component } from 'react'
import _pickBy from 'lodash/pickBy'

import API from './api'
import TextField from './textField'
import SelectField from './selectField'
import Modal from './modal'
import Button from './button'

const STATUS = [
  {id: 'Derrumbe (Edificio)', label: 'Derrumbe (Edificio)'},
  {id: 'Derrumbe (Barda)', label: 'Derrumbe (Barda)'},
  {id: 'Derrumbe (Escuela)', label: 'Derrumbe (Escuela)'},
  {id: 'Otro', label: 'Otro'}
]

export default class Buildings extends Component {
  constructor (props) {
    super(props)
    this.data = {
      buildings: props.buildings,
      modalOpen: false,
      reqInProg: props.reqInProg,
      direccion: '',
      colonia: '',
      estado: '',
      link: '',
      notas: '',
      id: ''
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.props.loadData()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      buildings: nextProps.buildings,
      reqInProg: nextProps.reqInProg
    })
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
    this.setState({modalOpen: !this.state.modalOpen}, this.resetState)
  }

  resetState () {
    this.setState({
      direccion: this.data.direccion,
      colonia: this.data.colonia,
      estado: this.data.estado,
      link: this.data.link,
      notas: this.data.notas,
      id: this.data.id
    })
  }

  setBuilding (building) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      direccion: building.direccion,
      colonia: building.colonia,
      estado: building.estado,
      link: building.link,
      notas: building.notas,
      id: building.id
    })
  }

  onSubmit (id = '') {
    let { direccion, colonia, estado, link, notas, buildings } = this.state
    let data = {
      direccion,
      colonia,
      estado,
      link,
      notas
    }
    if (id) {
      API.Buildings.Update(id, data)
        .then(response => {
          let updatedBuilding = response.edificio
          buildings = buildings.map(building => building.id === updatedBuilding.id ? updatedBuilding : building)
          this.setState({ buildings }, this.resetState)
        })
    } else {
      API.Buildings.SendNewds(data)
        .then(response => {
          buildings.push(response.edificio)
          this.setState({buildings})
        })
    }
    this.toggleModal()
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
          Nuevo Reporte de Edificio
        </Button>
      </div>
    )
  }

  renderTable () {
    let { buildings, reqInProg } = this.state
    if (reqInProg && buildings.length === 0) return <div>Cargando...</div>
    let table = <div>No hay resultados...</div>
    if (buildings.length > 0) {
      let buildingsList = buildings.map(building => {
        return (
          <tr
            key={`buildings-${building.id}`}
            onClick={this.setBuilding.bind(this, building)}
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
        title='Nuevo Reporte de Edificio'
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
                label='Colonia'
                value={this.state.colonia}
                onChange={this.onChangeColony.bind(this)}
              />
            </div>
            <div className='column'>
              <SelectField
                placeholder='Estado'
                options={STATUS}
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
