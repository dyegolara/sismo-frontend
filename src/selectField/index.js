import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import uuid from 'uuid/v4'
import _isNull from 'lodash/isNull'

// Error messages
const ERROR_TXT = {
  REQUIRED: 'Este campo es requerido'
}

class SelectField extends Component {
  constructor (props) {
    super(props)
    this.data = {
      value: props.value,
      isValid: true,
      errorText: ''
    }
    this.state = Object.assign({}, this.data)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) this.setState({value: nextProps.value})
  }

  // When the field changes, it updates the value locally and calls the passed callback function
  // so it can also update values on the parent component
  onChange (e) {
    this.setState({value: e.target.value}, this.validate)
    this.props.onChange(e)
  }

  // Validates if selected value is any other but the default.
  // Sets on state the validation result and error message
  // Returns boolean with the validation result.
  validate () {
    let { required } = this.props
    let isValid = !required
    let errorText = ''
    if (required) {
      isValid = !!this.state.value
      errorText = isValid ? '' : ERROR_TXT.REQUIRED
    }

    this.setState({isValid, errorText})
    return isValid
  }

  // Iterates over the passed options collection to generate the option tags
  // It evaluates if the passed collection is an array or an object.
  // Sets them within the select tag and adds the passed default option on top
  renderOptions (opts) {
    let { optionsConfig, className, disabled, onFocus, onBlur, required, placeholder } = this.props
    let { value, isValid } = this.state
    if (_isNull(value)) value = ''
    placeholder = required ? `${placeholder} (requerido)` : placeholder
    let options = opts.map((opt) => {
      return typeof opt === 'object'
        ? <option value={opt[optionsConfig.id]} key={uuid()}>{opt[optionsConfig.label]}</option>
        : <option value={opt} key={uuid()}>{opt}</option>
    })
    return (
      <select
        className={classNames(className, {'is-danger': !isValid})}
        onChange={this.onChange.bind(this)}
        disabled={disabled}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
      >
        <option value='' disabled key={uuid()}>{placeholder}</option>
        {options}
      </select>
    )
  }

  render () {
    let { label, options } = this.props
    let { isValid, errorText } = this.state

    return (
      <div className='control' key={uuid()}>
        {label ? <label className='label'>{label}</label> : null}
        <p>
          <span className='select is-fullwidth'>
            {this.renderOptions(options)}
          </span>
        </p>
        <span className={classNames('help is-danger', {'is-hidden': isValid})}>
          {errorText || ''}
        </span>
      </div>
    )
  }
}

export default SelectField

SelectField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  optionsConfig: PropTypes.object
}

SelectField.defaultProps = {
  options: [],
  className: '',
  placeholder: '',
  value: '',
  disabled: false,
  required: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  optionsConfig: {id: 'id', label: 'label'}
}
