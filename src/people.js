import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import _pickBy from 'lodash/pickBy'

import API from './api'
import Button from './button'
import TextField from './textField'
import SelectField from './selectField'

const STATUS = [
  {id: 'missing', label: 'Desaparecido'},
  {id: 'found', label: 'Encontrado'},
  {id: 'dead', label: 'Fallecido'}
]

const GENDER = [
  {id: 'male', label: 'Hombre'},
  {id: 'female', label: 'Mujer'}
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
        state: ''
      }
    }
    this.state = Object.assign({}, this.data)
  }

  componentDidMount () {
    this.loadData()
  }

  onChangeName (e) {
    this.setState({filters: update(this.state.filters, {name: {$set: e.target.value}})})
  }

  onChangeGender (e) {
    this.setState({filters: update(this.state.filters, {gender: {$set: e.target.value}})})
  }

  onChangeAge (e) {
    this.setState({filters: update(this.state.filters, {age: {$set: e.target.value}})})
  }

  onChangeStatus (e) {
    this.setState({filters: update(this.state.filters, {status: {$set: e.target.value}})})
  }

  onCleanFilters () {
    this.setState({filters: this.data.filters}, this.onFilter)
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
        console.log(response)
        this.setState({people: response.personas})
      })
  }

  renderFilters () {
    return (
      <form
        className='columns filters'
        onSubmit={this.onFilter.bind(this)}
      >
        <div className='column'>
          <TextField
            onChange={this.onChangeName.bind(this)}
            placeholder='Nombre'
            value={this.state.filters.name}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <SelectField
            options={GENDER}
            onChange={this.onChangeGender.bind(this)}
            placeholder='Sexo'
            value={this.state.filters.gender}
          />
        </div>
        <div className='column'>
          <TextField
            onChange={this.onChangeAge.bind(this)}
            placeholder='Edad'
            value={this.state.filters.age}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <SelectField
            onChange={this.onChangeStatus.bind(this)}
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
      let peopleList = people.map((person, index) => {
        return (
          <tr
            key={`people-${index}`}
          >
            <td>{person.nombre}</td>
            <td>{person.edad}</td>
            <td>{person.sexo}</td>
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
  render () {
    return (
      <div>
        {this.renderFilters()}
        {this.renderTable()}
      </div>
    )
  }
}
