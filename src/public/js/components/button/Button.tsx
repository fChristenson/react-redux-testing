import React from "react";

export class Button extends React.Component {
  render() {
    return <button {...this.props}>{this.props.children}</button>;
  }
}
