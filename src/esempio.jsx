import './App.css';
import { useState } from 'react';

function App() {

  const [toDoText, setToDoText] = useState("");
  const [toDoItem, setToDoItem] = useState([]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log(event.target.value);
      setToDoItem(prevToDoItem => [...prevToDoItem, event.target.value]);
      // setToDoItem(prevToDoItem => prevToDoItem.concat(event.target.value));
      console.log(toDoItem);
      setToDoText("");
      // event.target.value = "";
    }
  }

  const deleteItem = (index) => () => {
    console.log(index);
    setToDoItem(prevToDoItem => prevToDoItem.filter((el, id) => id !== index));
  }

  // Counter
  const [number, setNumber] = useState(0);

  function addNumber() {
    setNumber(prevNumber => ++prevNumber);
  }

  function subtractNumber() {
    if (number > 0) {
      setNumber(prevNumber => prevNumber-1)
    }
  }
  return (
    <div className="App">
      <div>
        <button onClick={addNumber}>+</button> <span>{number}</span> <button onClick={subtractNumber}>-</button>
      </div>
      <input type="text" onKeyDown={handleKeyDown} value={toDoText} onChange={e => setToDoText(e.target.value)} name="inputToDo" id="inputToDo" />
      <ul>
        {toDoItem.map((item, index) => <li key={index}> {item} <span onClick={deleteItem(index)}>X</span></li>)}
      </ul>
    </div>
  );
}

export default App;