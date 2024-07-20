import "./ToDoList.css";
import { useState } from "react";

export const ToDoList = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);

  const handleOnChange = (event) => {
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
  );
};
