import React, { useEffect, useState } from 'react'
import './App.css'
//import components
import Form from './components/Form'
import TodoList from './components/TodoList';


const App = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos)
        break;
    }

  }
  //when we refresh the page run once
  useEffect(() => {
    getLocalTodos();
  }, [])
  //useEffect
  useEffect(() => {
    filterHandler();
    setLocalTodos();
  },[todos,status])

  const setLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]))
    } else {
      let todosLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todosLocal)
    }
  }

return (
  <div className="App">
    <header>
      <h1>Smriti's Todo List</h1>
    </header>
    <Form setStatus={setStatus} todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} />
    <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} />
  </div>
)
}

export default App

