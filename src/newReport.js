import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'
import './bulma.css'

import API from './api'
import Button from './button'
import TextField from './textField'
import SelectField from './selectField'

// Estáticos
import HelpNumbers from './helpNumbers'
import Footer from './footer'
import Header from './header'
import WhatWeKnow from './whatWeKnow'

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

class App extends Component {
  constructor () {
    super()
    this.data = {
      name: '',
      gender: 'o',
      age: '',
      status: 'Desaparecido',
      notes: '',
      id: '',
      modalOpen: false,
    }
    this.state = Object.assign({}, this.data)
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

  toggleModal () {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  onSubmit () {
    let { name, age, gender, status, notes } = this.state
    let data = {
      nombre: name,
      edad: age,
      sexo: gender,
      estado: status,
      notas: notes
    }
    API.People.SendNewds(data)
      .then(() => {
        browserHistory.push('/personas')
      })
    this.toggleModal()
  }

  renderContent () {
    return (
      <div>
        <h2 className='title'>Nuevo reporte de persona</h2>
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

        <div className='columns'>
          <div className='control column is-3'>
            <Button
              buttonStyle='danger is-outlined'
              className='is-fullwidth'
              onClick={this.toggleModal}
            >Cancelar</Button>
          </div>
          <div className='control column is-3 is-offset-6'>
            <Button
              buttonStyle='primary'
              className='is-fullwidth'
              onClick={this.onSubmit}
              icon='check'
            >Aceptar</Button>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='section'>
            {this.renderContent()}
          </div>
          <hr />
          <HelpNumbers />
          <hr />
          <WhatWeKnow />
          <hr />
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
