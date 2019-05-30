import React, { PureComponent } from 'react';
import UserList from './userlist';
import Modal from './modal';
import Form from './form'

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filtered: {},
      received: false,
      modal_visible: false
    };
  };

  componentDidMount = () => {
    fetch('http://localhost:3001/user/list')
      .then(data => data.json())
      .then(result => this.setState({
        data: result,
        received: true
      })
      );
  };

  submit = i => {
    fetch(`http://localhost:3001/user/edit/${i}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.modal_data)
    })
      .then(data => data.json()
      ).then(result => {
        this.setState({ data: result })
        this.showModal(false)
      });
  };

  remove = i => {
    fetch(`http://localhost:3001/user/remove/${i}`, {
      method: 'DELETE',
    }).then(data => data.json()
    ).then(result => this.setState({ data: result }))
  };

  filter = e => {
    const query = e.target.value
    const filtered = [...this.state.data.content].filter(e => {
      if (Object.values(e).filter(v => v.toLowerCase().includes(query.toLowerCase())).length) return e
    })
    this.setState({ filtered: filtered })
  }

  showModal = show => {
    this.setState({ modal_visible: show })
  };

  edit = (e, i) => {
    this.setState({ modal_data: e, id: i })
    this.showModal(true);
  };

  handleChange = e => {
    let data = { ...this.state.modal_data }
    data[e.target.name] = e.target.value
    this.setState({ modal_data: data });
  };

  render() {
    const { received, data, modal_data, modal_visible, id, filtered } = this.state;
    let listdata = data.content
    if (Array.isArray(filtered)) listdata = filtered
    return (
      <div className='list__wrapper'>
        {modal_data &&
          modal_visible &&
          <Modal
            showModal={this.showModal}>
            <Form
              title={"Editar usuario"}
              data={modal_data}
              id={id}
              handleChange={this.handleChange}
              submit={this.submit} />
          </Modal>
        }
        {received &&
          <UserList
            data={listdata}
            remove={this.remove}
            edit={this.edit}
            filter={this.filter}
          />
        }
      </div>
    );
  }
}

export default List;