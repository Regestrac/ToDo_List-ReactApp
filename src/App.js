
import { useState } from 'react';
import './App.css';

function App() {

  return (
    <div className="app">
      <div className='mainHeading'>
        <h1>ToDo List</h1>
      </div>
      <div className='subHeading'>
        <h2>Hello there, Have a nice day!</h2>
      </div>
      <div className='input'>
        <input  type="text" placeholder='🖋️ Add item...'></input>
        <i  className="fas fa-plus"></i>
      </div>
    </div>
  );
}

export default App;
