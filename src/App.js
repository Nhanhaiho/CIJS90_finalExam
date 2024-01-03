import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todo, setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
    };
    let upadatedTodoArr = [...todo];
    upadatedTodoArr.push(newTodoItem);
    setTodo(upadatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(upadatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...todo];
    reduceTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setTodo(reduceTodo);
  };

  const handleCompletedTodo = (index) => {
    let filterItem = {
      ...todo[index],
    };
    let updateCompletedArr = [...completedTodo];
    updateCompletedArr.push(filterItem);
    setCompletedTodo(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updateCompletedArr));
    // alert(`Your task ${index+1} is completed, pls check in Completed tab!`)
  };
  const handleDeleteCompletedTodo = (index) => {
    let reduceTodo = [...completedTodo];
    reduceTodo.splice(index, 1);

    localStorage.setItem("completedTodolist", JSON.stringify(reduceTodo));
    setCompletedTodo(reduceTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist "));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodo "));
    if (savedTodo) {
      setTodo(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodo(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <header>
        <h1>#TODO</h1>
      </header>

      <div className="todo-wrapper">
        <div className="todo-status">
          <button
            className={`tab-btn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            All
          </button>

          <button
            className={`tab-btn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-input">
          <div className="todo-input-item">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add details"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="add-btn">
              ADD
            </button>
          </div>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            todo.map((item, index) => {
              return (
                <div className="todo-list-task" key={index}>
                  <MdDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <FaCheck
                    className="check-icon"
                    onClick={() => handleCompletedTodo(index)}
                  />

                  <h3>{item.title}</h3>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedTodo.map((item, index) => {
              return (
                <div className="todo-list-task" key={index}>
                  <MdDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(index)}
                  />

                  <h3>{item.title}</h3>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
