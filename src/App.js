import { useEffect, useState } from "react";
import "./App.css";

import { AiTwotoneDelete} from 'react-icons/ai';
import { AiOutlineCheck} from 'react-icons/ai';
function App() {
  const [isCompleteScreen, seIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const[completedTodos,setCompletedTodos] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }

    let updatedTodoArr =[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  }
 

  // delete method
 const handleDeleteTodo = (index)=>{
  let reducedTodo = [...allTodos];
  reducedTodo.splice(index);

  localStorage.setItem('todolist',JSON.stringify(reducedTodo));
  setTodos(reducedTodo);
 }

 //Completed method
const handleComplete = (index)=>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() +1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h +':' + m +':' + s;

  let filteredItem = {
    ...allTodos[index],
    completedOn:completedOn
  }
  let updatedComletedArr = [...completedTodos];
  updatedComletedArr.push(filteredItem);
  setCompletedTodos(updatedComletedArr)
  handleDeleteTodo(index);
  localStorage.setItem('completedTodos',JSON.stringify(updatedComletedArr));
}
const handleDeleteCompletedTodo = (index)=>{
  let reducedTodo = [...completedTodos];
  reducedTodo.splice(index);

  localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo);
}

  useEffect(() =>{
   let savedTodo = JSON.parse(localStorage.getItem('todolist'))
   let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))
   if(savedTodo){
    setTodos(savedTodo);
   }
   if(savedCompletedTodos){
    setCompletedTodos(savedCompletedTodos);
   }
  },[])


  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's tahe task title?" />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="What's tahe task description?" />
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`seconderyBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>seIsCompleteScreen(false)}>Todo</button>
          <button className={`seconderyBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>seIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">

           { isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
            <AiTwotoneDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
            <AiOutlineCheck className='check-icon' onClick={()=>handleComplete(index)} title="Complete?"/>
            </div>
            
           </div>
            )
           })}

            {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>

            <div>
            <AiTwotoneDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?"/>
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
