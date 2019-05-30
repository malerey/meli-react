import React, { PureComponent } from 'react';

class UserList extends PureComponent {

  remove = i => {
    this.props.remove(i)
  }

  edit = (u, i) => {
    this.props.edit(u, i)
  }

  handleChange = e => {
    this.props.filter(e)
  };

  render() {
    return (
      <div className="list__main">
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Filtrar"
        />
        <div className="list__body">
          <table>
            <tbody>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
              {this.props.data.map((u, i) => {
                return <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.lastname}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td className="list__body--actions">
                    <i className="far fa-edit"
                      onClick={() => this.edit(u, i)} />
                    <i className="far fa-trash-alt"
                      onClick={() => this.remove(i)} />
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserList;