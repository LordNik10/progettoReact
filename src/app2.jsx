import './App.css';

import { useState } from 'react';

function App() {

const [todos,setTodos] = useState([]);
const spanStyle = {
  marginLeft: "2%",
  cursor: "pointer"
};


function insertTask (){
  setTodos(prevTodos=> prevTodos.concat(document.querySelector('input').value));
}

function deleteTask(index){
  console.log('dentro delete');
  setTodos(prevTodos => prevTodos.filter((e,id)=> id!==index));
}

  return (
    <>
      <h1>Todo List</h1> 
      <input type='text'/>
      <button onClick={insertTask}>Inserisci</button>
      <ul>
        {todos.map((todo,index)=><li key={index}>{todo}<span style={spanStyle} onClick={()=>{deleteTask(index)}}>X</span></li>)}
        
      </ul>
        
    </>
  );
}

export default App;
