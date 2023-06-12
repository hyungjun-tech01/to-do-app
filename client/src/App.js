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

  // 화면 시작 시에 구동  --> 뭐든 바뀌면 새로 고침(???) 
  useEffect(()=>getData, []);

  // sort by date 
  const sortedTasks = tasks?.sort( (a,b) => new Date(a.date) - new Date(b.date));

  console.log(tasks);

  return (
    <div className="app">
      <ListHeader listName={'Holiday Tick list'} getData={getData}/>
      {sortedTasks?.map( (task) => <ListItem key={task.id} task={task} getData={getData}/>)}
    </div>
  );
}

export default App;
