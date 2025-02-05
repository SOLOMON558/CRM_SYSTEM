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

