import React from "react";

export class TodoList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { isTyping: false };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.getTodos();
  }

  onChange(event: any) {
    if (event.target.value.length > 0) {
      this.setState({ isTyping: true });
    } else {
      this.setState({ isTyping: false });
    }
  }

  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {this.props.todos.map((todo: string, i: number) => (
            <li key={i}>{todo}</li>
          ))}
        </ul>
        <form onSubmit={this.props.onSubmit}>
          <input onChange={this.onChange} name="todo" />
        </form>
        {this.state.isTyping && <p>You are typing...</p>}
      </div>
    );
  }
}
