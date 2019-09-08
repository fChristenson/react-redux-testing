import React from "react";

export class LoginPage extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.props.onSubmit}>
          <input name="username" />
          <input type="password" name="password" />
          <input type="submit" />
        </form>
        {this.props.showError && <p>Login failed</p>}
      </div>
    );
  }
}
