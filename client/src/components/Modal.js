import {useState} from "react";
function Modal({mode, setShowModal, task, getData}) {

  const editMode = mode === "edit" ? true:false;

    const [data, setData] = useState(
    {
      user_email: editMode ? task.user_email : "ania@test.com",
      title : editMode ? task.title : "",
      progress : editMode ? task.progress : "50",
      date: editMode ? task.date : new Date()
    }
  );

  //create new todos 
  const postData = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:8000/todos',{
        method: "POST", 
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
       }); 
       if(response.status === 200){  // 성공했을때 
        console.log('worked');
        // modal 감추고 

        setShowModal(false);
        // 다시 쿼리 -> getData를 불러 주면됨.
        getData();
       }
    }catch(err){
      console.log(err);
    }
  };

  //edit todo 
  const editData = async (e)=>{
    e.preventDefault();
    try{  
      const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
      method: "PUT", 
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
     }); 
     if(response.status === 200){  // 성공했을때 
      console.log('edit worked');
      // modal 감추고 
      setShowModal(false);
      // 다시 쿼리 -> getData를 불러 주면됨.
      getData();
     }
    }catch(err){
      console.error(err);
    }
  };

  const handleChange = (e)=>{
    console.log("changing", e.target);
    const {name, value} = e.target;
    setData(data => ({
      ...data, 
      [name] : value
    }))
  };

    return (
      <div className= "overlay">
          <div className="modal">
            <div className="form-title-container"> 
              <h3>Let's {mode} your task</h3>
              <button onClick={()=>setShowModal(false)}>X</button>
            </div>
            <form>
            <input 
              required 
              maxLength = {30}
              placeholder = "Your task goes here"
              name = "title"
              value = {data.title}
              onChange={handleChange}/>
            <br/>
            <label>Drag to select your current progress</label>
            <input 
              required
              type="range"
              id="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
              />
            <input className={mode} type="submit" onClick={editMode? editData:postData}/>
          </form>
          </div>
      </div>
    );
  }
  
  export default Modal;
  