import React, { Component, PropTypes } from 'react'
import validator from 'validator'
import classNames from 'classnames'
import _isNull from 'lodash/isNull'

// Error messages
const ERROR_TXT = {
  REQUIRED: 'Este campo es requerido',
  EMAIL: 'Ingrese un e-mail válido'
}

class TextField extends Component {
  constructor (props) {
    super(props)
    this.data = {
      value: props.value,
      isValid: true,
      errorText: '',
      validateOnChange: false
    }
    this.state = Object.assign({}, this.data)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) this.setState({value: nextProps.value})
  }

  onFocus (e) {
    let { selectAllOnFocus, onFocus } = this.props
    selectAllOnFocus && e.target.select()
    onFocus()
  }

  onBlur () {
    this.validate()
    if (!this.state.validateOnChange) this.setState({validateOnChange: true})
    this.props.onBlur()
  }

  _handleKeyDown (e) {
    if (e.key === 'Enter') {
      this.props.onEnter()
    }
  }

  // When the field changes, it updates the value locally and calls the passed callback function
  // so it can also update values on the parent component
  onChange (e) {
    let { type, onChange } = this.props
    let value = type === 'date' ? e : e.target.value
    this.setState({value}, () => {
      if (this.state.validateOnChange) this.validate()
    })
    onChange(e)
  }

  // Validates if selected value matches the requirements.
  // Sets on state the validation result and error message
  // Returns boolean with the validation result.
  validate () {
    let { type, required, minLength } = this.props
    let value = this.state.value
    let isValid = !(required || minLength)
    let errorText = ''
    if (required) {
      isValid = !validator.isEmpty(value)
      errorText = isValid ? '' : ERROR_TXT.REQUIRED
    }
    if (type === 'email') {
      isValid = validator.isEmail(value)
      errorText = errorText || ERROR_TXT.EMAIL
    }
    if (minLength) {
      isValid = validator.isLength(value, {min: minLength})
      errorText = errorText || `El campo debe contener al menos ${minLength} caracteres`
    }

    this.setState({isValid, errorText})
    return isValid
  }

  // If type is date, returns a Datepicker with the passed props
  // Otherwise, returns the default input
  renderInput () {
    let { type, className, placeholder, disabled, required } = this.props
    let { value, isValid } = this.state
    if (_isNull(value)) value = ''
    placeholder = required ? `${placeholder} (requerido)` : placeholder

    return (
      <p>
        <input
          className={classNames('input ' + className, {
            'is-danger': !isValid,
            'has-text-right': type === 'number'
          })}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this._handleKeyDown}
          required={required}
        />
      </p>
    )
  }

  render () {
    let { label } = this.props
    let { isValid, errorText } = this.state

    return (
      <div className='control'>
        {label ? <label className='label'>{label}</label> : null}
        {this.renderInput()}
        <span className={classNames('help is-danger', {'is-hidden': isValid})}>
          {errorText || ''}
        </span>
      </div>
    )
  }
}

export default TextField

TextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  minLength: PropTypes.number,
  required: PropTypes.bool,
  selectAllOnFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

TextField.defaultProps = {
  value: '',
  className: '',
  placeholder: '',
  disabled: false,
  type: 'text',
  required: false,
  selectAllOnFocus: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {}
}
