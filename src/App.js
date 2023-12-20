import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const [color,setColor]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [completedTodos,setCompletedTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");

  const handleAdd=()=>{
    let newArr={
      title:newTitle,
      description:newDescription
    }
    let updatedArr=[...allTodos];
    updatedArr.push(newArr);
    setTodos(updatedArr);
    localStorage.setItem('todolist',JSON.stringify(updatedArr));
    setNewTitle('');
    setNewDescription('');
  }

  useEffect(()=>{
    let savedTodos=JSON.parse(localStorage.getItem('todolist'));
    if(savedTodos){
      setTodos(savedTodos);
    }

    let compTodos=JSON.parse(localStorage.getItem('CompletedTodo'));
    if(compTodos){
      setCompletedTodos(compTodos);
    }
  },[])

  const handleDelete=(index)=>{
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index,1);
    setTodos(reducedTodos);
    localStorage.setItem('todolist',JSON.stringify(reducedTodos));
  }

  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth();
    let mmm=now.getUTCMonth();
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let CoptOn= dd + '-' + mmm + '-' + yyyy + ' On ' + h + ':' + m + ':' + s;
    let filteredTodos={
      ...allTodos[index],
      completedOn:CoptOn
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredTodos);
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('CompletedTodo',JSON.stringify(updatedCompletedArr));

    handleDelete(index);
  }

  const handleDeleteComplete=(index)=>{
    let filteredComplete=[...completedTodos];
    filteredComplete.splice(index,1);
    setCompletedTodos(filteredComplete);
    localStorage.setItem('CompletedTodo',JSON.stringify(filteredComplete));
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='cont'>
        <div className='inpt-cont'>
          <div className='inp1'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
          </div>
          <div className='inp2'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}/>
          </div>
          <div className='inp3'>
            <button className='addbtn' onClick={handleAdd}>Add</button>
          </div>
        </div>
        <div className='list-cont'>
          <div className='viewbtn'>
            <button className={`${color===false&&'Active'}`} onClick={()=>setColor(false)}>Todo</button>
            <button className={`${color===true&&'Active'}`} onClick={()=>setColor(true)}>Completed</button>
          </div>
            
            {color===false && allTodos.map((item,index)=>{
              return(
                <div key={index} className='todo-list'>
                  <div className='todo-list-cont'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className='icons'>
                    <MdDeleteOutline className='del-icon' onClick={()=>{handleDelete(index)}}/>
                    <FaCheck className='check-icon' onClick={()=>handleComplete(index)}/>
                  </div>
                </div>
              )
            })}

            {color===true && completedTodos.map((item,index)=>{
              return(
                <div key={index} className='todo-list'>
                  <div className='todo-list-cont'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className='on'>Completed On {item.completedOn}</p>
                  </div>
                  <div className='icons'>
                    <MdDeleteOutline className='del-icon' onClick={()=>handleDeleteComplete(index)}/>
                  </div>
                </div>
              )
            })}
          
        </div>
      </div>
    </div>
  );
}

export default App;
