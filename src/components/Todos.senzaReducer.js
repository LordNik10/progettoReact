import { useState, useReducer, useEffect } from 'react';
import "./Todos.css";

export default function Todos() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const insertTodo = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setTodos(todos => [...todos, {
        text: input,
        date: Date.now(),
        isComplete: false,
      }]);

      setInput("");
    }
  }

  const insertTodoByButton = (event) => {
    setTodos(todos => [...todos, {
      text: input,
      date: Date.now(),
      isComplete: false,
    }]);
    setInput("");
  }

  const completeTodo = (date) => (event) => {
    setTodos(todos => todos.map(
      todo => ({
        ...todo,
        isComplete: todo.date === date ? !todo.isComplete : todo.isComplete
      })
    ))
  }

  const deleteTodo = (date) => (event) => {
    setTodos(todos => todos.filter(
      todo => todo.date !== date
    ))
  }

  const sortTodos = (e) => {
    setTodos(todos => [
      ...todos.sort(
        (a, b) => {
          const textA = a.text.toUpperCase(); // ignore upper and lowercase
          const textB = b.text.toUpperCase(); // ignore upper and lowercase
          if (textA < textB) {
            return -1;
          }
          if (textA > textB) {
            return 1;
          }

          return 0;
        }
        )
      ])
  }

  return (
    <div className="todos">
      <input onKeyDown={insertTodo} value={input} onChange={e => setInput(e.target.value)} />
      <button disabled={input.length === 0} onClick={insertTodoByButton}>inserisci</button>
      <button onClick={sortTodos}>ordinali alfabeticamente</button>
      <ol>{todos.map(
        todo => <li
          key={todo.date}>
          <span
            onClick={completeTodo(todo.date)}
            className={
              todo.isComplete
                ? "complete"
                : ""}>
            {todo.text}
          </span>

          <b onClick={deleteTodo(todo.date)}>
            {"X"}
          </b>
        </li>
      )}</ol>
    </div>
  );
}