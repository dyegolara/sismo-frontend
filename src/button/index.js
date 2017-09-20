import React, { PropTypes } from 'react'

/*
* Enconta house-style Button component
*
* There are several button styles defined in /public/css/src/components/button.scss
* each one with a different use case, in general we will be using only these styles:
*
* primary: for the primary action of a screen e.g. Aceptar, Guardar, Ingresar, Completar, Enviar
* this button has to be in the right side of the buttons section of each form,
* it is encouraged to use type submit algside with this style
*
* info: for secondary actions but still important: Filtrar, Nuevo elemento (this with a plus icon)
*
* danger: for Borrar (alongside a close icon)
* this button has to be in the left side of the buttons section of each form,
*
* dangerInv: for Cancelar
* this button has to be in the left side of the buttons section of each form,
*
* default: for Atrás, Limpiar and other miscelaneous things
*
* To use a style, use the buttonStyle prop
*
* To use the loading style, please also use the loading prop and avoid the className assignation
*
* */

const Button = (props) => {
  let { children, type, disabled, icon, buttonStyle, className, style, onClick, onBlur, loading } = props
  if (loading) {
    if (className.includes('is-fullwidth')) children = ''
    icon = 'loading mdi-spin'
    className = className.concat(' loading')
  }
  return (
    <button
      className={`button is-${buttonStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
      onBlur={onBlur}
      style={style}
      type={type}
    >
      <span>
        {icon ? <i className={`mdi mdi-${icon}`} /> : null}
        {children}
      </span>
    </button>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  buttonStyle: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  icon: '',
  buttonStyle: '',
  className: '',
  size: 'normal',
  style: {},
  loading: false,
  onClick: () => {},
  onBlur: () => {}
}
