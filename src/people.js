import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import _pickBy from 'lodash/pickBy'
import _sortBy from 'lodash/sortBy'

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
  {id: 'f', label: 'Mujer'},
  {id: 'o', label: 'Otro / No especificado'}
]

export default class People extends Component {
  constructor () {
    super()
    this.data = {
      people: [],
      filters: {
        nombre: '',
        sexo: '',
        edad: '',
        estado: ''
      },
      modalOpen: false,
      reqInProg: false,
      name: '',
      gender: 'o',
      age: '',
      status: 'Desaparecido',
      notes: '',
      id: ''
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadData()
  }

  onChangeFiltersName (e) {
    this.setState({filters: update(this.state.filters, {nombre: {$set: e.target.value}})})
  }

  onChangeFiltersGender (e) {
    this.setState({filters: update(this.state.filters, {sexo: {$set: e.target.value}})})
  }

  onChangeFiltersAge (e) {
    this.setState({filters: update(this.state.filters, {edad: {$set: e.target.value}})})
  }

  onChangeFiltersStatus (e) {
    this.setState({filters: update(this.state.filters, {estado: {$set: e.target.value}})})
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
    this.setState({modalOpen: !this.state.modalOpen}, this.resetState)
  }

  onFilter () {
    browserHistory.push('/personas')
    this.loadData()
  }

  resetState () {
    this.setState({
      id: this.data.id,
      name: this.data.name,
      gender: this.data.gender,
      age: this.data.age,
      status: this.data.status,
      notes: this.data.notes
    })
  }

  setPerson (person) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      name: person.nombre,
      age: person.edad,
      gender: person.sexo,
      status: person.estado,
      notes: person.notas,
      id: person.id
    })
  }

  onSubmit (id = '') {
    let { name, age, gender, status, notes, people } = this.state
    let data = {
      nombre: name,
      edad: age,
      sexo: gender,
      estado: status,
      notas: notes
    }
    if (id) {
      API.People.Update(id, data)
        .then(response => {
          let updatedPerson = response.persona
          people = people.map(person => person.id === updatedPerson.id ? updatedPerson : person)
          this.setState({ people }, this.resetState)
        })
    } else {
      API.People.SendNewds(data)
        .then(response => {
          people.push(response.persona)
          this.setState({ people })
        })
    }
    this.toggleModal()
  }

  // Get clients
  loadData () {
    let { filters } = this.state
    let _filters = _pickBy(filters, filter => filter.length > 0)
    let params = Object.assign({}, _filters)
    this.setState({reqInProg: true})
    API.People.GetList(params)
      .then(response => {
        this.setState({people: _sortBy(response.personas, ['nombre']), reqInProg: false})
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
          Nuevo Reporte de Persona
        </Button>
      </div>
    )
  }

  renderFilters () {
    return (
      <div className='columns filters'>
        <div className='column'>
          <TextField
            onChange={this.onChangeFiltersName.bind(this)}
            placeholder='Nombre'
            value={this.state.filters.nombre}
            onEnter={this.onFilter.bind(this)}
            required
          />
        </div>
        <div className='column'>
          <SelectField
            options={GENDER}
            onChange={this.onChangeFiltersGender.bind(this)}
            placeholder='Sexo'
            value={this.state.filters.sexo}
          />
        </div>
        <div className='column'>
          <TextField
            onChange={this.onChangeFiltersAge.bind(this)}
            placeholder='Edad'
            value={this.state.filters.edad}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <SelectField
            onChange={this.onChangeFiltersStatus.bind(this)}
            placeholder='Estado'
            value={this.state.filters.estado}
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
                onClick={this.onFilter.bind(this)}
                icon='magnify'
              >Filtrar</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTable () {
    let { people, reqInProg } = this.state
    if (reqInProg) return <div>Cargando...</div>
    let table = <div>No hay resultados...</div>
    if (people.length > 0) {
      let peopleList = people.map(person => {
        let gender = 'Otro / no especificado'
        if (person.sexo === 'm') gender = 'Hombre'
        if (person.sexo === 'f') gender = 'Mujer'
        return (
          <tr
            key={`people-${person.id}`}
            onClick={this.setPerson.bind(this, person)}
          >
            <td>{person.nombre}</td>
            <td>{person.edad}</td>
            <td>{gender}</td>
            <td>{person.estado}</td>
            <td className='truncateCell'>{person.notas}</td>
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
                <th className='truncateCell'>Notas</th>
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
        title='Nuevo Reporte de Persona'
        isActive={this.state.modalOpen}
        toggleModal={this.toggleModal.bind(this)}
        onSubmit={this.onSubmit.bind(this, this.state.id)}
      >
        <div>
          <div className='columns'>
            <div className='column'>
              <TextField
                label='Nombre'
                value={this.state.name}
                onChange={this.onChangeName.bind(this)}
                required
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
