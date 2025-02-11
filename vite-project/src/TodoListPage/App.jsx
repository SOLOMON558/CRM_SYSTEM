import { useState, useEffect } from "react";
import { easyDev } from "../Api/Api.js";
import TaskComp from "../Components/TaskComp.jsx";
import TaskAdd from "../Components/TaskAdd.jsx";
import ChangeTask from "../Components/ChangeTask.jsx";

function App() {
  let [allTodo, setAllTodo] = useState([]);
  let [finishTodo, setFinishTodo] = useState([]);
  let [inWork, setInWork] = useState([]);
  let [activeAll, setActiveAll] = useState("active");
  let [activeWork, setActiveWork] = useState("invis");
  let [activeFinish, setActiveFinish] = useState("invis");
  let [allCount, setAllCount]= useState(null);
  let [workCount, setWorkCount]= useState(null);
  let [finishCount, setFinishCount]= useState(null);
  //ПОДКЛЮЧЕНИЕ И ВЫВОД БЭКЭНДА
  async function Connect() {
    let apiConnect = await easyDev();
    setAllCount(apiConnect.info.all)
    setWorkCount(apiConnect.info.inWork)
    setFinishCount(apiConnect.info.completed)
    let data = apiConnect.data.map((item) => ({
      id: item.id,
      name: item.title,
      checked: item.isDone,
    }));
    setAllTodo(data);
    setInWork(data.filter((item) => item.checked !== true));
    setFinishTodo(data.filter((item) => item.checked !== false));
  }

  useEffect(() => {
    Connect();
    let interval = setInterval(Connect, 4000);
    return () => clearInterval(interval);
  }, []);

  function allClick() {
    setActiveAll("active");
    setActiveWork("invis");
    setActiveFinish("invis");
  }
  function workClick() {
    setActiveAll("invis");
    setActiveWork("active");
    setActiveFinish("invis");
  }
  function finishClick() {
    setActiveAll("invis");
    setActiveWork("invis");
    setActiveFinish("active");
  }

  return (
    <>
      <TaskAdd connect={Connect} />
      <div>
        <ChangeTask
         activeTask={activeAll}
         taskClick={allClick}
         
        >
          ВСЕ({allCount})
        </ChangeTask>
        <ChangeTask
          activeTask={activeWork}
          taskClick={workClick}
          
        >
        В РАБОТЕ({workCount})
        </ChangeTask>
        <ChangeTask
          activeTask={activeFinish}
          taskClick={finishClick}
          
        >
          ГОТОВЫ({finishCount})
        </ChangeTask>
        <TaskComp
          connect={Connect}
          task={allTodo}
          activeTask={activeAll} 
        />
        <TaskComp
         connect={Connect} 
         task={inWork} 
         activeTask={activeWork} 
        />
        <TaskComp
          connect={Connect}
          task={finishTodo}
          activeTask={activeFinish}
        />
      </div>
    </>
  );
}

export default App;
