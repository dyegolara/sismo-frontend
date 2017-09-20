import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import update from 'react-addons-update'
import _pickBy from 'lodash/pickBy'

import Button from './button'
import TextField from './textField'
import SelectField from './selectField'

const STATE = [
  {id: 'missing', label: 'Desaparecido'},
  {id: 'found', label: 'Encontrado'},
  {id: 'dead', label: 'Fallecido'}
]

export default class People extends Component {
  constructor () {
    super()
    this.data = {
      filters: {
        name: '',
        gender: '',
        age: '',
        state: ''
      }
    }
    this.state = Object.assign({}, this.data)
  }

  onChangeLegalName (e) {
    this.setState({filters: update(this.state.filters, {legal_name: {$set: e.target.value}})})
  }

  onChangeRFC (e) {
    this.setState({filters: update(this.state.filters, {rfc: {$set: e.target.value}})})
  }

  onChangeFielStatus (e) {
    this.setState({filters: update(this.state.filters, {with_fiel: {$set: e.target.value}})})
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
    let page = currentPage > 1 ? {page: currentPage} : {}
    let params = Object.assign({}, page, _filters, sort, {
      active_client: true, // fixed filter
      active_status: 'active' // fixed filter
    })
    // ClientsStatusFielActions.GetClientsStatusFiel(params)
    //   .then(() => this.setState({filterApplied: filters}))
  }

  renderFilters () {
    return (
      <form
        className='columns filters'
        onSubmit={this.onFilter.bind(this)}
      >
        <div className='column'>
          <TextField
            onChange={this.onChangeLegalName.bind(this)}
            placeholder='Razón Social'
            value={this.state.filters.legal_name}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <TextField
            onChange={this.onChangeRFC.bind(this)}
            placeholder='RFC'
            value={this.state.filters.rfc}
            onEnter={this.onFilter.bind(this)}
          />
        </div>
        <div className='column'>
          <SelectField
            onChange={this.onChangeFielStatus.bind(this)}
            placeholder='Estado'
            value={this.state.filters.with_fiel}
            options={STATE}
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
  render () {
    return (
      <div>
        {this.renderFilters()}
      </div>
    )
  }
}
