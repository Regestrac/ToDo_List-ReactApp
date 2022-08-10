
import { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const today=new Date()
  const dayNum=today.getDay()
  const dayList=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const day=dayList[dayNum]
  const handleInput=((e)=>{
    e.preventDefault();
    if(toDo){
      setToDos([...toDos,{
        id:Date.now(),
        text:toDo,
        statusCompleted:false,
        statusRemoved:false,
        statusDrop:false,
        statusErase:false,
        statusRetreve:false
      }]);
      setToDo('');
    }
  })
  const clearInput=()=>{
    setToDo('');
  }

  return (
    <div className="app">
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
            <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder='🖋️ Plan Something...'></input>
          </div>
          <div className='middle'>
            <i onClick={clearInput} className="fas fa-eraser" title="Clear"></i>
          </div>
          <div className='right'>
            <i type='submit' onClick={handleInput} className="fa-solid fa-circle-plus" title="Add"></i>
            {/* onClick={() => setToDos([...toDos, {id:Date.now(),text:toDo, status:false}])} */}
          </div>
          </div>
        </form>

      <div className="container onGoing">
        <h3>Active</h3>
        {toDos && toDos.map((obj) => {
          if (obj.statusCompleted && !obj.statusDrop) {
            return (
              <div key={obj.id} className="toDo">
                <div className="left tick">
                  <i onClick={(e) => {
                    e.target.value = true;
                    setToDos(toDo.filter((obj2) => {
                      if (obj2.id === obj.id) {
                        obj2.statusCompleted = e.target.value;
                      }
                      return obj2;
                    }))
                  }} value={obj.statusCompleted} className='fas fa-check' title='Done'></i>
                  <div className='top'>
                    <p>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p>{obj.toDoTime}</p>
                  </div>
                  <div className="right">
                    <i onClick={(e) => {
                      e.target.value = true;
                      setToDos(toDo.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.statusDrop = e.target.value;
                        }
                        return obj2
                      }))
                    }} value={obj.statusDrop} className="fas fa-times" title='Drop'></i>
                  </div>
                </div>
              </div>
            )
          }
        })
        }
      </div>

      <div className='container done'>
        <h3>Completed</h3>
        {
          toDos && toDos.map((obj)=>{
            if(obj.statusCompleted && !obj.statusRemoved){
              return(
                <div className='toDo'>
                  <div className='top'>
                    <p>{obj.text}</p>
                  </div>
                  <div className='bottom'>
                    <p></p>
                  </div>
                  <div className='right bin'>
                    <i onClick={(e)=>{
                      let isdelete = window.confirm("Delete ToDo Permenetly!")
                      if(isdelete){
                        e.target.value=true;
                      }
                      setToDos(toDos.filter((obj2)=>{
                        if(obj2.id === obj.id){
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

        <div className='container dropped'>
          <h3>Cancelled</h3>
          { toDo && toDos.map((obj)=>{
            if(obj.statusDrop && !obj.statusRetreve && !obj.statusRemoved){
              return(
                <div className='toDo'>
                  <div className='left recycle'>
                    <i onClick={(e)=>{
                      let isdelete = window.confirm("Retreve cancelled todo")
                      if(isdelete){
                        e.target.value=true
                      }
                      setToDos(toDos.filter((obj2)=>{
                        if(obj2.id ===  obj.id){
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
                      <p>{}</p>
                    </div>
                    <div className='right binm'>
                      <i onClick={(e)=>{
                        let isdelete= window.confirm("Delete toDo Permenetly")
                        if(isdelete){
                          e.target.value = true
                        }
                        setToDos(toDos.filter((obj2)=>{
                          if(obj2.id === obj.id){
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
  );
}

export default App;
