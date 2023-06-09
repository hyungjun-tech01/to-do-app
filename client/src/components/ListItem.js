import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";

function ListItem({task}) {
    return (
      <div className="list-item">
        <div className = "info-container">
          <TickIcon />
            <p className = "task-title">{task.title}</p>
          <ProgressBar/>
        </div>
        <div className = "button-container">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      </div>
    );
  }
  
  export default ListItem;
  