import {useState} from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";

function ListItem({task, getData}) {
    const [showModal, setShowModal] = useState(false);
    const deleteItem = async () => {
      try{
        const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
          method: "DELETE"
         }); 
         if(response.status === 200){  // 성공했을때 
          console.log('delete worked');
          // 다시 쿼리 -> getData를 불러 주면됨.
          getData();
         }
      }catch(err){
        console.error(err);
      }
    };
    return (
      <div className="list-item">
        <div className = "info-container">
          <TickIcon />
            <p className = "task-title">{task.title}</p>
          <ProgressBar/>
        </div>
        <div className = "button-container">
          <button className="edit" onClick = {()=>setShowModal(true)}>Edit</button>
          <button className="delete" onClick = {deleteItem}>Delete</button>
        </div>
        {showModal&&<Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
      </div>
    );
  }
  
  export default ListItem;
  