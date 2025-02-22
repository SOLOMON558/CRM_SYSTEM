
export async function getTasks(status:string): Promise<Record<string, any>> {
  try {
    const response = await fetch(
      `https://easydev.club/api/v2/todos?filter=${status}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Ошибка получения файлов", error);
    throw error
  }
}

export async function postTask(data:object): Promise<void> {
  try {
    await fetch("https://easydev.club/api/v2/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Ошибка портирования данных", error);
  }
}

export async function updateTaskCompleted(number:number, bool:boolean): Promise<void> {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${number}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !bool }),
    });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function updateTaskTitle(number:number, value:string): Promise<void> {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${number}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: value }),
    });
  } catch (error) {
    console.error("Ошибка изменения данных", error);
  }
}

export async function deleteTask(number:number): Promise<void> {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${number}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ошибка удаления данных", error);
  }
}
