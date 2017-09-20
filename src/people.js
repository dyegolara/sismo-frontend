import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import _pickBy from 'lodash/pickBy'

import API from './api'
import Button from './button'
import TextField from './textField'
import SelectField from './selectField'
import Modal from './modal'

const STATUS = [
  {id: 'Desaparecido', label: 'Desaparecido'},
  {id: 'Encontrado', label: 'Encontrado'},
  {id: 'Fallecido', label: 'Fallecido'}
]

const GENDER = [
  {id: 'm', label: 'Hombre'},
  {id: 'f', label: 'Mujer'}
]

export default class People extends Component {
  constructor () {
    super()
    this.data = {
      people: [],
      filters: {
        name: '',
        gender: '',
        age: '',
        status: ''
      },
      modalOpen: false,
      name: '',
      gender: '',
      age: '',
      status: '',
      notes: ''
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadData()
  }

  onChangeFiltersName (e) {
    this.setState({filters: update(this.state.filters, {name: {$set: e.target.value}})})
  }

  onChangeFiltersGender (e) {
    this.setState({filters: update(this.state.filters, {gender: {$set: e.target.value}})})
  }

  onChangeFiltersAge (e) {
    this.setState({filters: update(this.state.filters, {age: {$set: e.target.value}})})
  }

  onChangeFiltersStatus (e) {
    this.setState({filters: update(this.state.filters, {status: {$set: e.target.value}})})
  }

  onChangeName (e) {
    this.setState({name: e.target.value})
  }

  onChangeAge (e) {
    this.setState({age: e.target.value})
  }

  onChangeGender (e) {
    this.setState({gender: e.target.value})
  }

  onChangeStatus (e) {
    this.setState({status: e.target.value})
  }

  onChangeNotes (e) {
    this.setState({notes: e.target.value})
  }

  onCleanFilters () {
    this.setState({filters: this.data.filters}, this.onFilter)
  }

  toggleModal () {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  onSubmit () {
    let { name, age, gender, status, notes, people } = this.state
    let data = {
      nombre: name,
      edad: age,
      sexo: gender,
      estado: status,
      notas: notes
    }
    API.People.SendNewds(data)
      .then(response => {
        people.push(response.persona)
        this.setState({ people })
      })
    this.toggleModal()
  }

  // Resets current page to 0, then calls loadData method
  onFilter () {
    browserHistory.push('/reportes/estatus-fiel/')
    this.loadData()
  }

  // Get clients
  loadData () {
    let { filters, currentPage, sort } = this.state
    let _filters = _pickBy(filters, filter => filter.length > 0)
    // let page = currentPage > 1 ? {page: currentPage} : {}
    let params = Object.assign({}, _filters)
    API.People.GetList(params)
      .then(response => {
        this.setState({people: response.personas})
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

  renderFilters () {
    return (
      <form
        className='columns filters'
        onSubmit={this.onFilter.bind(this)}
      >
        <div className='column'>
          <TextField
            onChange={this.onChangeFiltersName.bind(this)}
            placeholder='Nombre'
            value={this.state.filters.name}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <SelectField
            options={GENDER}
            onChange={this.onChangeFiltersGender.bind(this)}
            placeholder='Sexo'
            value={this.state.filters.gender}
          />
        </div>
        <div className='column'>
          <TextField
            onChange={this.onChangeFiltersAge.bind(this)}
            placeholder='Edad'
            value={this.state.filters.age}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <SelectField
            onChange={this.onChangeFiltersStatus.bind(this)}
            placeholder='Estado'
            value={this.state.filters.status}
            options={STATUS}
          />
        </div>
        <div className='column is-3-desktop'>
          <div className='columns is-mobile'>
            <div className='column'>
              <Button
                className='is-fullwidth'
                onClick={this.onCleanFilters.bind(this)}
                icon='close-circle-outline'
              >Limpiar</Button>
            </div>
            <div className='column'>
              <Button
                className='is-fullwidth'
                buttonStyle='info is-outlined'
                type='submit'
                icon='magnify'
              >Filtrar</Button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  renderTable () {
    let { people } = this.state
    let table = (<div>Cargando...</div>)
    if (people.length > 0) {
      let peopleList = people.map(person => {
        let gender = 'Otro / no especificado'
        if (person.sexo === 'm') gender = 'Hombre'
        if (person.sexo === 'f') gender = 'Mujer'
        return (
          <tr
            key={`people-${person.id}`}
          >
            <td>{person.nombre}</td>
            <td>{person.edad}</td>
            <td>{gender}</td>
            <td>{person.estado}</td>
            <td>{person.notas}</td>
          </tr>
        )
      })
      table = (
        <div>
          <table className='table is-striped is-fullwidth'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Estado</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              {peopleList}
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
                label='Nombre'
                value={this.state.name}
                onChange={this.onChangeName.bind(this)}
              />
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Edad'
                type='number'
                value={this.state.age}
                onChange={this.onChangeAge.bind(this)}
              />
            </div>
            <div className='column'>
              <SelectField
                placeholder='Sexo'
                options={GENDER}
                label='Sexo'
                value={this.state.gender}
                onChange={this.onChangeGender.bind(this)}
              />
            </div>
            <div className='column'>
              <SelectField
                placeholder='Estado'
                options={STATUS}
                label='Estado'
                value={this.state.status}
                onChange={this.onChangeStatus.bind(this)}
              />
            </div>
          </div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Notas'
                value={this.state.notes}
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
        {this.renderFilters()}
        {this.renderTable()}
        {this.renderModal()}
      </div>
    )
  }
}
