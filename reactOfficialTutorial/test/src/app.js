import React from "react";
import todoData from "./data";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      completed: this.props.completed,
    };
  }
  render() {
    return (
      <div className="todo">
        <h5>Task: {this.state.name}</h5>
        <input
          onChange={() => this.props.handleChange(this.props.id)}
          type="checkbox"
          checked={this.props.completed}
        />
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todoData,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    this.setState(prevState => {
        const updatedTodos = prevState.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        return {
            todos: updatedTodos
        }
    })
  }

  render() {
    const todoComponents = this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
        handleChange={this.handleChange}
      />
    ));
    return <div className="todoBox">{todoComponents}</div>;
  }
}

export default App;
