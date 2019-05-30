import React, { PureComponent } from 'react';

const VALID = {
  name: /^.{1,30}$/,
  lastname: /^.{1,30}$/,
  phone: /^[0-9]{1,}$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
}

class Form extends PureComponent {
  state = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    disabled: true,
    incomplete_message: false
  }

  handleChange = e => {
    this.props.handleChange(e)
    if (!VALID[e.target.name].test(e.target.value)) this.addError(e.target)
    else this.removeError(e.target)
    if (!this.state.name && !this.state.lastname && !this.state.phone && !this.state.email) {
      this.setState({ disabled: false, incomplete_message: false })
    }
  }

  removeError = (e) => {
    this.setState({ [e.name]: '' })
  }

  addError = (e) => {
    this.setState({ [e.name]: 'form__error' })
  }

  submit = (e, i) => {
    e.preventDefault()
    if (!this.props.data.name
      || !this.props.data.lastname
      || !this.props.data.phone
      || !this.props.data.email) {
      this.setState({ disabled: true, incomplete_message: true })
      return
    }
    this.props.submit(i)
  }

  render() {
    const { data, title } = this.props
    const { name, lastname, email, phone, disabled, incomplete_message } = this.state
    let incomplete
    incomplete_message ? incomplete = "show" : incomplete = "list__display-none"
    return (
      <form className="form" autoComplete="off">
        <div className="form__title">{title}</div>
        <label>Nombre
              <input type="text" name="name"
            className={name}
            value={data.name}
            onChange={this.handleChange}
          />
          <div className="form__error-msg">
            <span className={name}>
              Debe tener menos de 30 caracteres.
              </span>
          </div>
        </label>
        <label>Apellido
              <input type="text" name="lastname" className={lastname}
            value={data.lastname}
            onChange={this.handleChange}
          />
          <div className="form__error-msg">
            <span className={lastname}>
              Debe tener menos de 30 caracteres.
              </span>
          </div>
        </label>
        <label>Teléfono
              <input type="number" name="phone" className={phone}
            value={data.phone}
            onChange={this.handleChange}
          />
          <div className="form__error-msg">
            <span className={phone}>
              Debe estar compuesto sólo por números.
              </span>
          </div>
        </label>
        <label>Email
              <input type="email" name="email" className={email}
            value={data.email}
            onChange={this.handleChange}
          />
          <div className="form__error-msg">
            <span className={email}>Debe ser un email válido.
            </span>
          </div>
        </label>
        <input type="submit" value="Enviar" disabled={disabled} onClick={(e) => this.submit(e, this.props.id)} />
        <div className={incomplete}>Debe completar todos los campos</div>
      </form>
    );
  }
}

export default Form;