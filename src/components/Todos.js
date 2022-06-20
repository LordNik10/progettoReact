import { useState, useReducer, useEffect } from 'react';
import "./Todos.css";

export function reducer(state, action) {
  const newState = Object.assign({}, state); // Clona stato in un nuovo oggetto

  if (action.type === "insert") {
    newState.input = "";
    // Concatena il nuovo todo nell'array dei todos
    newState.todos = state.todos.concat({
      text: state.input,
      date: Date.now(),
      isComplete: false,
    });
  }

  if (action.type === "complete") {
    // Mappa mutando solo il todo che deve essere completo
    newState.todos = state.todos.map(
      todo => ({
        ...todo,
        isComplete: todo.date === action.date ? !todo.isComplete : todo.isComplete
      })
    )
  }

  if (action.type === "delete") {
    newState.todos = state.todos.filter(
      todo => todo.date !== action.date
    )
  }

  if (action.type === "sort") {
    newState.todos = [
      ...state.todos.sort(
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
      ]
  }

  if (action.type === "input") {
    // Salva contenuto dell'input
    newState.input = action.input;
  }

  // NB Ritorna un nuovo oggetto
  return newState;
}

function TodosTable() {
  const [{ todos, input }, dispatch] = useReducer(reducer, {
    todos: [], input: ""
  });

  const insertTodo = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "insert" });
    }
  }

  const saveInput = (e) => {
    dispatch({ type: "input", input: e.target.value });
  }

  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Testo</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(
          todo => <tr key={todo.date}>
            <td>{todo.date}</td>
            <td>{todo.text}</td>
          </tr>
        )}
      </tbody>
      </table>
      <input onKeyDown={insertTodo} value={input} onChange={saveInput} />
    </>
  )
}

export default function Todos() {
  const [{ todos, input }, dispatch] = useReducer(reducer, {
    todos: [],
    input: ""
  });

  const insertTodo = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch({ type: "insert" });
    }
  }

  const insertTodoByButton = (event) => {
    dispatch({ type: "insert" });
  }

  const completeTodo = (date) => (event) => {
    dispatch({ type: "complete", date });
  }

  const deleteTodo = (date) => (event) => {
    dispatch({ type: "delete", date });
  }

  const sortTodos = (e) => {
    dispatch({ type: "sort" });
  }

  const saveInput = (e) => {
    dispatch({ type: "input", input: e.target.value });
  }

  return (
    <div className="todos">
      <input onKeyDown={insertTodo} value={input} onChange={saveInput} />
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