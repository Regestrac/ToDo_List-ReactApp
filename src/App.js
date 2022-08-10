
import { useState } from 'react';
import './App.css';

function App() {
  const [toDo, setToDo] = useState('')
  const [toDos, setToDos] = useState([])

  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = dayNames[today.getDay()];
  const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = today.getHours();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12;
  const hour12 = (hours % 12 && hour === 0 ? hour === 12 : hour);
  const date = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
  const dayShort = dayList[today.getDay()];
  const time = hour12.toString() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' + amOrPm;
  const createdTime = time + ' ' + dayShort + ' ' + date;

  const handleUserInput = ((e) => {
    setToDo(e.target.value)
  })
  const handleInput = ((e) => {
    e.preventDefault();
    if (toDo) {
      setToDos([...toDos, {
        id: Date.now(),
        text: toDo,
        time: createdTime,
        statusDone: false,
        statusRemoved: false,
        statusDrop: false,
        statusErase: false,
        statusRetreve: false
      }]);
      // setToDo('');
    }
  })
  const clearInput = () => {
    setToDo('');
  }

  return (
    <div className="app">
      <div className='inputSection'>
        <div className='headings'>
          <div className='mainHeading'>
            <h1>ToDo List</h1>
          </div>
          <div className='subHeading'>
            <h2>Hey its {day}.</h2>
          </div>
        </div>
        <form onSubmit={handleInput}>
          <div className='inputOptions'>
            <div className='left'>
              <input value={toDo} onChange={handleUserInput} type="text" placeholder='🖋️ Plan Something...'></input>
            </div>
            <div className='middle erase'>
              <i onClick={clearInput} className="fas fa-eraser" title="Clear"></i>
            </div>
            <div className='right add'>
              <i type='submit' onClick={handleInput} className="fa-solid fa-circle-plus" title="Add"></i>
            </div>
          </div>
        </form>
      </div>

      <div className='list-sec'>
        <div className='container done'>
          <h3>Completed</h3>
          {toDos && toDos.map((obj) => {
            if (obj.statusDone && !obj.statusRemoved) {
              return (
                <div ket={obj.id} className='toDo'>
                  <div className='left'></div>
                  <div className='top'>
                    <p>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{obj.time}</p>
                  </div>
                  <div className='right bin'>
                    <i onClick={(e) => {
                      let isdelete = window.confirm("Delete ToDo Permenetly!")
                      if (isdelete) {
                        e.target.value = true;
                      }
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusRemoved = e.target.value;
                        }
                        return obj2
                      }))
                    }} value={obj.statusRemoved} className="fas fa-trash-alt" title='Remove'></i>
                  </div>
                </div>
              )
            }
          })
          }
        </div>


        <div className="container onGoing">
          <h3>Active</h3>
          {toDos && toDos.map((obj) => {
            if (!obj.statusDone && !obj.statusDrop) {
              return (
                <div key={obj.id} className="toDo">
                  <div className="left tick">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDone = e.target.value;
                        }
                        return obj2;
                      }))
                    }} value={obj.statusDone} className='fas fa-check' title='Done'></i>
                  </div>
                  <div className='top'>
                    <p>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{obj.time}</p>
                  </div>
                  <div className="right close">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDrop = e.target.value;
                        }
                        return obj2
                      }))
                    }} value={obj.statusDrop} className="fas fa-times" title='Drop'></i>
                  </div>
                </div>
              )
            } else if (obj.statusRetreve && !obj.statusDone) {
              return (
                <div key={obj.id} className='toDo'>
                  <div className='left tick'>
                    <i onClick={(e) => {
                      e.target.value = true;
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDone = e.target.value
                        }
                        return obj2;
                      }))
                    }} value={obj.statusDone} className='fas fa-check' title='Done'></i>
                  </div>
                  <div className='top'>
                    <p>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{obj.time}</p>
                  </div>
                  <div className='right close'>
                    <i onClick={(e) => {
                      e.target.value = true;
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDrop = e.target.value;
                          obj.statusRetreve = !e.target.value
                        }
                        return obj2
                      }))
                    }} value={obj.statusDrop} className='fas fa-times' title='Drop'></i>
                  </div>
                </div>
              )
            }
          })
          }
        </div>


        <div className='container dropped'>
          <h3>Cancelled</h3>
          {toDo && toDos.map((obj) => {
            if (obj.statusDrop && !obj.statusRetreve && !obj.statusRemoved) {
              return (
                <div key={obj.id} className='toDo'>
                  <div className='left recycle'>
                    <i onClick={(e) => {
                      e.target.value = true
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusRetreve = e.target.value
                        }
                        return obj2
                      }))
                    }} value={obj.statusRetreve} className='fas fa-redo-alt' title='Retreve'></i>
                  </div>
                  <div className='top'>
                    <p className=''>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{obj.time}</p>
                  </div>
                  <div className='right binm'>
                    <i onClick={(e) => {
                      let isdelete = window.confirm("Delete toDo Permanently ?")
                      if (isdelete) {
                        e.target.value = true
                      }
                      setToDos(toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusRemoved = e.target.value
                        }
                        return obj2
                      }))
                    }} value={obj.statusRemoved} className='fas fa-trash-alt' title='Remove'></i>
                  </div>
                </div>
              )
            }
          })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
