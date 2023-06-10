import Modal from "./Modal";
import {useState} from "react";

function ListHeader({listName}) {
    const [showModal, setShowModal] = useState(null);
    const signOut = ()=>{
        console.log("sign out");
    }

    return (
      <div className = "list-header">
        <h1>{listName}</h1>
        <div className = "button-container">
            <button className="create" onClick={()=> setShowModal(true)}>ADD NEW</button>
            <button className="signout" onClick={signOut}>SIGN OUT</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal}/>}
      </div>
    );
  }
  
  export default ListHeader;
  