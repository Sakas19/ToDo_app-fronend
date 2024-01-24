import { useState,useEffect } from "react";
import axios from 'axios'
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("")

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos")
      .then(res => setTodos(res.data)) 
      .catch(err => setErrors(err.message))
    })
  
  const addTodo = (data) => {
    setTodos([
      ...todos,
      { ...data, id: parseInt(todos[todos.length - 1].id) + 1, status: "Active" },
    ]);
  };

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (e, id, text) => {
    e.preventDefault();
    const todo = todos[id];
    const updatedUser = { ...todo, task: text, status: "Active" };
    setTodos(todos.map((t) => (t.id === todo.id ? updatedUser : t)));
  };

  const completeTodo = (e, id) => {
    if (e.target.checked) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: "Completed" } : todo)));
    } else {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: "Active" } : todo)));
    }
  };

  const filterTodo = (cat_value) => {
    setTodos(todos.filter((todo) => todo.status === cat_value));
  };

  return (
    <div className="todo-container">
      <Search addTodo={addTodo} />
      <Filter filter_todo={filterTodo} />
      <TodoList todos={todos} delTodo={delTodo} update_todo={updateTodo} complete_todo={completeTodo} filter_todo={filterTodo} />
    </div>
  );
}

export default App;

