import React, { useState } from 'react';
import './App.css';

function AddTodoForm ({addTodo}){
  const [text, setText] = useState("");

  const submitTodo = (ev)=>{
    ev.preventDefault();

    if(text){
      addTodo(text);
      setText("");
    }else{
      alert("A value is required");
    }
  }

  return(
    <form onSubmit={submitTodo}>
      <label>Add a Todo</label>
      <div>
        <input
          className="todo-input"
          placeholder="Start typing"
          onChange={(ev)=>{
            setText(ev.target.value);
          }}
          value={text}
        />
        <button>Submit</button>
      </div>
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([{
    text:"buy groceries",
    isDone: false
  },{
    text:'clean dishes',
    isDone: false
  },{
    text:'become a millionaire',
    isDone: false
  }]);

  const addTodo = (text)=>{
    setTodos([...todos, {text}]);
  }

  const toggleTodoStatus = (payload)=>{
    const { status, index } = payload;
    const myNewTodos = [...todos];
    myNewTodos[index].isDone = status;
    setTodos(myNewTodos);
  }

  return (
    <div className="app">
    <h1>Todo list</h1>


    <AddTodoForm addTodo={addTodo}/>

    {
      todos.map((todo, index)=> {
        const { text, isDone} = todo;
        const btnText = isDone ? "Undo" : "Done";

        return(
          <div key={index} className="list-item">
            <span className={isDone ? "strike-through" : ""}>{text}</span>
            <button className={'status-btn ${isDone ? "done" : ""}'} onClick={()=>toggleTodoStatus({status:!isDone, index})}>{btnText}</button>
          </div>
        )
      })
    }
    </div>
  );
}

export default App;
