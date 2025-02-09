export async function easyDev() {
    let response = await fetch ('https://easydev.club/api/v2/todos' ,
    {
    method: 'GET',
    headers:{
    'Content-Type':'application/json'
    }})
    let resData = await response.json();
    return resData
    
  }
export async function easyDevPost (data) {
    await  fetch('https://easydev.club/api/v2/todos', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) 
  })}

export async function easyDevPut (number, bool) {
  await fetch(`https://easydev.club/api/v2/todos/${number}`, 
    { method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone:!bool }),
    })}
    export async function easyDevEdit (number, value) {
      await fetch(`https://easydev.club/api/v2/todos/${number}`, 
      { method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: value }),
      })}
      export async function easyDevDelete (number) {     
      await fetch(`https://easydev.club/api/v2/todos/${number}`, 
        { method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(),
        })}