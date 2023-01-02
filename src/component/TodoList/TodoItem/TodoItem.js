import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {
  state = {
    newTitle: this.props.todo.title,
  };

  onEditTitle = (e) => {
    this.setState({ newTitle: e.target.value });
  };

  render() {
    const { id, title, completed, status } = this.props.todo;
    const { onEdit, onDelete, onComplete } = this.props;
    let textField;
    let buttons;
    if (completed) {
      textField = (
        <strike className="completed">
          <span onClick={() => onComplete(id)}>{title}</span>
        </strike>
      );
      buttons = (
        <button className="btn btn--delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      );
    } else {
      if (!status) {
        textField = <span onClick={() => onComplete(id)}>{title}</span>;
      } else {
        textField = (
          <input
            type="text"
            value={this.state.newTitle}
            onChange={this.onEditTitle}
          />
        );
      }
      buttons = (
        <span>
          <button
            className="btn btn--edit"
            onClick={() => onEdit(id, this.state.newTitle)}
          >
            Edit
          </button>
          <button className="btn btn--delete" onClick={() => onDelete(id)}>
            Delete
          </button>
        </span>
      );
    }
    return (
      <li className="todoitem">
        {textField}
        <span className="todobutton">{buttons}</span>
      </li>
    );
  }
}

// id, title, completed, delete

export default TodoItem;
