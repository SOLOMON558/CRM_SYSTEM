export async function easyDev() {
  try {
    let response = await fetch("https://easydev.club/api/v2/todos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error("Ошибка получения файлов", error);
  }
}

export async function easyDevPost(data) {
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

export async function easyDevPut(number, bool) {
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

export async function easyDevEdit(number, value) {
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

export async function easyDevDelete(number) {
  try {
    await fetch(`https://easydev.club/api/v2/todos/${number}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ошибка удаления данных", error);
  }
}
