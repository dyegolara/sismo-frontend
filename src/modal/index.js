import React, { PropTypes } from 'react'
import classNames from 'classnames'

import Button from '../button'

const Modal = props => {
  return (
    <div className={classNames('modal', {'is-active': props.isActive})}>
      <div className='modal-background' onClick={props.toggleModal} />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{props.title}</p>
          <button
            className='delete'
            onClick={props.toggleModal}
          />
        </header>
        <section className='modal-card-body'>
          {props.children}
        </section>
        <footer className='modal-card-foot columns'>
          <div className='control column is-3'>
            <Button
              buttonStyle='danger is-outlined'
              className='is-fullwidth'
              onClick={props.toggleModal}
            >Cancelar</Button>
          </div>
          <div className='control column is-3 is-offset-6'>
            <Button
              buttonStyle='primary'
              className='is-fullwidth'
              onClick={props.onSubmit}
              icon='check'
            >Aceptar</Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Modal

Modal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string
}

Modal.defaultProps = {
  isActive: false,
  onSubmit: () => {},
  title: ''
}
