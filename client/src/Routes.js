import React, { Component } from "react";
import App from "./App";
import List from './modules/list';
import FormWrapper from './modules/form-wrapper';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route exact path="/user/list" component={List} />
            <Route exact path="/user/form" component={FormWrapper} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Routes;