import React, { Component } from "react";

export default class AddModal extends Component {
  render() {
    if (this.props.isOpen) {
      return <div>{this.props.children}</div>;
    } else {
      return null;
    }
  }
}
