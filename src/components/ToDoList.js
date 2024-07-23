import "./ToDoList.css";
import { useState, useEffect } from "react";

export const ToDoList = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  const getList = () => {
    fetch("https://playground.4geeks.com/todo/users/devMarco", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setList(data.todos))
      .catch((error) => alert(error));
  };
  useEffect(() => {
    getList();
  }, []);
  const postList = (task) => {
    const newTask = { label: task, is_done: false };
    setList([...list, newTask]);
    fetch("https://playground.4geeks.com/todo/todos/devMarco", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .catch((error) => {
        alert(error);
        setList(list.filter((item) => item !== newTask));
      })
      .finally(() => getList());
  };
  const deleteList = (id) => {
    setList(list.filter((item) => item.id !== id));
    fetch("https://playground.4geeks.com/todo/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      alert(error);
      getList();
    });
  };

  const deleteAll = () => {
    setList([]);
    fetch("https://playground.4geeks.com/todo/users/devMarco/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((error) => {
        alert(error);
        getList();
      })
      .finally(() => getList());
  };

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };
  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13 && inputText !== "") {
      postList(inputText);
      setInputText("");
    }
  };

  return (
    <>
      <h1>MIS TAREAS</h1>
      <div className="container">
        <input
          placeholder="Ingresa una tarea"
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          value={inputText}
        />
        <ul id="list">
          {list?.map((item, index) => (
            <li key={index}>
              {item.label}
              <button id="removeBtn" onClick={() => deleteList(item.id)}>
                x
              </button>
            </li>
          ))}
        </ul>
        {list && list.length > 0 ? (
          <p>Tareas pendientes: {list.length}</p>
        ) : null}
        {list && list.length > 1 ? (
          <button id="removeAll" onClick={deleteAll}>
            Eliminar todo
          </button>
        ) : null}
      </div>
    </>
  );
};
