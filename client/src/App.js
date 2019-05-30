import React, { PureComponent } from 'react';
import './App.scss'
class App extends PureComponent {

  render() {
    return (
      <div className='main'>
        <div className="main__list">
          <a href="./user/list">List</a>
          <a href="./user/form">Form</a>
          <a href="http://localhost:3001/ping">Ping</a>
        </div>
      </div>
    );
  }
}

export default App;

