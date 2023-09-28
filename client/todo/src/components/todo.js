import { useEffect, useState } from "react";
import axios from "axios";

//axios get으로 데이터 가져오기
const TodoData = async () => {
  try {
    const res = await axios.get("http://localhost:8000/todo");
    console.log("get 성공", res.data.data.result);
    const titles = res.data.data.result;
    console.log("타이틀들", titles);
    return titles;
  } catch (error) {
    console.log("데이터 get 오류", error);
    return [];
  }
};

const addTodoFunc = async (todo) => {
  console.log("보내는 Todo", todo);
  try {
    const addTodo = await axios({
      method: "post",
      url: "http://localhost:8000/todo",
      data: {
        todo,
      },
    });
    console.log("보내기 성공", todo);
    return addTodo;
  } catch (error) {
    console.log("추가 에러", error);
  }
};

const UpdateFunc = async (value, update, done) => {
  console.log("index", value);
  const id = value;
  console.log("id", id);
  try {
    const Update = await axios.patch(`http://localhost:8000/todo/:${id}`, {
      id: id,
      todo: update,
      done: done,
    });
    console.log("수정사항 보내기 성공");
    return Update;
  } catch (error) {
    console.log("수정 에러", error);
  }
};

const DeleteFunc = async (value) => {
  const id = value;
  try {
    const Delete = await axios.delete(`http://localhost:8000/todo/:${id}`);
    console.log("삭제 성공");
    return Delete;
  } catch (error) {
    console.log("삭제 오류", error);
  }
};

export default function Todo() {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState("");
  const [todo, setTodo] = useState("");
  const [dataChange, setDataChange] = useState(false);

  //가져온 데이터 list에 넣기
  useEffect(() => {
    TodoData().then((data) => setList(data));
    console.log("List", list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChange]);

  const handleAdd = () => {
    addTodoFunc(todo).then((response) => {
      const newTodo = { id: response.data.id, title: todo }; // 응답을 사용하여 새 ID를 얻음
      setList([...list, newTodo]);
      setDataChange(!dataChange);
      setTodo("");
    });
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleEdit = (value) => {
    console.log("LIST", list);
    console.log("handelEdit", value);
    setEdit(value);
    setUpdate(list.find((item) => item.id === value)?.title);
  };

  const handleUpdate = (value) => {
    console.log("update id:", value);
    console.log("update date:", update);
    UpdateFunc(value.id, update, value.done).then(() => {
      setDataChange(!dataChange);
      const updateList = [...list];
      updateList[value] = update;
      setList(updateList);
      setEdit(null);
    });
  };
  const handleDelete = (value) => {
    console.log("Delete index:", value);
    DeleteFunc(value).then(() => {
      const todoList = [...list];
      todoList.splice(value, 1);
      setList(todoList);
      setDataChange(!dataChange);
    });
  };

  const handleCheckbox = (value) => {
    console.log("check", value);
    const newDoneValue = value.done === 1 ? 0 : 1;
    console.log(newDoneValue);
    UpdateFunc(value.id, value.title, newDoneValue).then(() => {
      setDataChange(!dataChange);
    });
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
            <input
              type="checkbox"
              checked={value.done === 1}
              onChange={() => handleCheckbox(value)}
            />

            {edit === value.id ? (
              <input
                type="text"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleUpdate(value);
                  }
                }}
              />
            ) : (
              <label key={idx} onClick={() => handleEdit(value.id)}>
                {value.title}
              </label>
            )}
            <button onClick={() => handleDelete(value.id)}>Delete</button>
            <br></br>
          </div>
        );
      })}
    </>
  );
}
