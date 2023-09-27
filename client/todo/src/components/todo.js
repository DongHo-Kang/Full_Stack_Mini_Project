import { useState } from "react";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState("");

  const handleAdd = () => {
    setList([...list, todo]);
    setTodo("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleEdit = (index) => {
    setEdit(index);
    setUpdate(list[index]);
  };

  const handleUpdate = (index) => {
    const updateList = [...list];
    updateList[index] = update;
    setList(updateList);
    setEdit(null);
  };
  const handleDelete = (index) => {
    const todoList = [...list];
    todoList.splice(index, 1);
    setList(todoList);
  };
  return (
    <>
      <input
        value={todo}
        type="text"
        placeholder="Add your new Todo"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleAdd}>ADD</button>
      <br />

      {list.map((value, idx) => {
        return (
          <div key={idx}>
            <input type="checkBox" />
            {edit === idx ? (
              <input
                type="text"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleUpdate(idx);
                  }
                }}
              />
            ) : (
              <label onClick={() => handleEdit(idx)}>{value}</label>
            )}
            <button onClick={() => handleDelete(idx)}>Delete</button>
            <br></br>
          </div>
        );
      })}
    </>
  );
}
