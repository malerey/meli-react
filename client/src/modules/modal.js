import React, { PureComponent } from 'react';

class Modal extends PureComponent {

  handleChange = e => {
    this.props.handleChange(e)
  }

  showModal = show => {
    this.props.showModal(show)
  }

  render() {
    return (
      <div className={"list__modal"}>
        <div className="list__modal--content">
          {this.props.children}
          <div
            className="list__modal--close"
            onClick={() => this.showModal(false)}
          >
            <i className="fas fa-window-close" />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;