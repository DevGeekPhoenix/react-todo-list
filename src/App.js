import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      ToDoList: [],
      InputValue: "",
      SearchInputValue: "",
    };
  }
  handleClick() {
    const value = this.state.InputValue;
    if (!value) return;
    const newarr = [...this.state.ToDoList];
    newarr.push({
      id: new Date().toISOString(),
      text: value,
      done: false,
    });
    console.log(newarr);
    this.setState({ ToDoList: newarr, InputValue: "" });
  }
  DoneItem(id) {
    console.log(id);
    const todos = [...this.state.ToDoList].map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    this.setState({ ToDoList: todos });
  }
  DeleteItem(id) {
    const del = [...this.state.ToDoList].filter((todo) => todo.id != id);

    this.setState({ ToDoList: del });
  }
  render() {
    return (
      <div className="App">
        <input
          onKeyUp={(event) => {
            if (event.key === "Enter") this.handleClick();
          }}
          value={this.state.InputValue}
          onChange={(event) => {
            this.setState({ InputValue: event.target.value });
          }}
        />
        <button onClick={() => this.handleClick()}>Add</button>
        <br />
        <input
          value={this.state.SearchInputValue}
          onChange={(event) => {
            this.setState({ SearchInputValue: event.target.value });
          }}
        />
        {this.state.ToDoList.filter((todo) => {
          return todo.text
            .toLowerCase()
            .includes(this.state.SearchInputValue.toLowerCase());
        }).map((item, i) => {
          return (
            <>
              <div className="item">
                <h4 className={item.done ? "done" : ""}>{item.text}</h4>
                <p className="donetxt" onClick={() => this.DoneItem(item.id)}>
                  {" "}
                  Done{" "}
                </p>
                <p
                  className="deletetxt"
                  onClick={() => this.DeleteItem(item.id)}
                >
                  Delete{" "}
                </p>
              </div>
            </>
          );
        })}
      </div>
    );
  }
}
export default App;
