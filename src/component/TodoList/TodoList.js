import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import {
  getTodos,
  addTodo,
  removeTodo,
  editTodo,
  completeTodo,
} from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todos: [],
    inputText: "",
  };

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
        status: false,
      };
      addTodo(newTodo).then((todo) => {
        this.setState({
          todos: [...this.state.todos, todo],
          inputText: "",
        });
      });
    }
  };

  handleDelete = (id) => {
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  handleEdit = (id, newTitle) => {
    const cur = this.state.todos.findIndex((todo) => id === todo.id);
    const newStatus = !this.state.todos[cur].status;
    let tempState = this.state.todos[cur];
    tempState.status = newStatus;
    tempState.title = newTitle;
    editTodo(id, newTitle, newStatus).then(() => {
      this.setState({
        todos: [
          ...this.state.todos.slice(0, cur),
          { ...tempState },
          ...this.state.todos.slice(cur + 1),
        ],
      });
    });
  };

  handleComplete = (id) => {
    const cur = this.state.todos.findIndex((todo) => id === todo.id);
    const newCompleted = !this.state.todos[cur].completed;
    let tempState = this.state.todos[cur];
    tempState.completed = newCompleted;
    completeTodo(id, newCompleted).then(() => {
      this.setState({
        todos: [
          ...this.state.todos.slice(0, cur),
          { ...tempState },
          ...this.state.todos.slice(cur + 1),
        ],
      });
    });
  };

  render() {
    return (
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__content">
          {this.state.todos.map(
            (todo) =>
              todo.completed === false && (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                  onComplete={this.handleComplete}
                />
              )
          )}
        </ul>
        <ul className="todolist_completed">
          {this.state.todos.map(
            (todo) =>
              todo.completed === true && (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                  onComplete={this.handleComplete}
                />
              )
          )}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    getTodos().then((data) => {
      this.setState({
        todos: data,
      });
    });
  }
}

export default TodoList;
