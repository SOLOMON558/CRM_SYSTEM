
export default function ChangeTask ({activeTask,taskClick,tasks})

{return (
<button
className={`buttonTask ${activeTask==='active'? 'activeButt': ''}`} 
onClick={taskClick}>ВСЕ({})
</button>)}