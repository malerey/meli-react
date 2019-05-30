import React, { PureComponent } from 'react';
import Form from './form'

class FormWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        lastname: '',
        phone: '',
        email: '',
      }
    };
  };

  submit = () => {
    fetch(`http://localhost:3001/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.data)
    })
      .then(data => data.json()
      ).then(result => {
        this.props.history.push('/user/list')
      });
  };

  handleChange = e => {
    let data = { ...this.state.data }
    data[e.target.name] = e.target.value
    this.setState({ data });
  };

  render() {
    return (
      <div className='form__wrapper'>
        <Form
          title={"Agregar un usuario nuevo"}
          data={this.state.data}
          handleChange={this.handleChange}
          submit={this.submit} />
      </div>
    );
  }
}

export default FormWrapper;