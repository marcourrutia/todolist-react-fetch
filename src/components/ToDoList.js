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
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getList();
  }, []);
  console.log(list);

  /* const handleOnChange = (event) => {
    setInputText(event.target.value);
  };
  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13 && inputText !== "") {
      setList((prevList) => [...prevList, inputText]);
      setInputText("");
    }
  };
  const removeItem = (indice) => {
    setList((prevList) => prevList.filter((_, i) => i !== indice));
  }; */

  /* return (
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
          {list.map((item, index) => (
            <li key={index}>
              {item}
              <button id="removeBtn" onClick={() => removeItem(index)}>
                x
              </button>
            </li>
          ))}
        </ul>
        <p>Tareas pendientes: {list.length}</p>
      </div>
    </>
  ); */
};
