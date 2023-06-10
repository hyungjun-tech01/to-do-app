import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

function App() {
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    const userEmail = 'ania@test.com';
    try{
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);  // backtik 
      const json = await response.json();
      setTasks(json);

    }catch(err){
      console.error(err);
   }

  };

  // 화면 시작 시에 구동 
  useEffect(()=>getData, []);

  // sort by date 
  const sortedTasks = tasks?.sort( (a,b) => new Date(a.date) - new Date(b.date));

  console.log(tasks);

  return (
    <div className="app">
      <ListHeader listName={'Holiday Tick list'} />
      {sortedTasks?.map( (task) => <ListItem key={task.id} task={task}/>)}
    </div>
  );
}

export default App;
