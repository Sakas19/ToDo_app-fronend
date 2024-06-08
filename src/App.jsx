import { useState, useEffect } from "react";
import axios from 'axios';
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios.get("https://todo-app-2-bqzt.onrender.com/todos")
      .then(res => setTodos(res.data)) 
      .catch(err => setErrors(err.message));
  }, []);

  const addTodo = (data) => {
    const newId = todos.length > 0 ? parseInt(todos[todos.length - 1].id) + 1 : 1;
    setTodos([
      ...todos,
      { ...data, id: newId, status: "Active" },
    ]);
  };

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (e, id, text) => {
    e.preventDefault();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const updatedTodo = { ...todos[todoIndex], task: text, status: "Active" };
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = updatedTodo;
      setTodos(updatedTodos);
    }
  };

  const completeTodo = (e, id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, status: e.target.checked ? "Completed" : "Active" } : todo
    ));
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


