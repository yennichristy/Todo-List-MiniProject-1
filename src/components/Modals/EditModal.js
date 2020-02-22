import React, { Component } from "react";

export default class EditModal extends Component {
  render() {
    if (this.props.edit) {
      return <div>{this.props.children}</div>;
    } else {
      return null;
    }
  }
}
