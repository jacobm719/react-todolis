const URL = "http://localhost:3000/todos";

const addTodo = (newTodo) => {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const removeTodo = (id) => {
  return fetch(URL + `/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

const getTodos = () => {
  return fetch(URL).then((res) => res.json());
};

const editTodo = (id, title, status) => {
  return fetch(URL + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: title, status: status }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const completeTodo = (id, completed) => {
  return fetch(URL + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ completed: completed }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

export { addTodo, removeTodo, getTodos, editTodo, completeTodo };
