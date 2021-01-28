import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { BiTrash, BiEdit } from "react-icons/bi";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({ id: null, value: "" });
  };

  function TodoEdit({ todo }) {
    return <TodoForm />;
  }

  // rename lol
  function TodoNotEdit({ todo }) {
    return (
      <div
        className={todo.isComplete ? "todoRow complete" : "todoRow"}
        key={todo.id}
      >
        <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
        <div className="icons">
          <BiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="editIcon"
          />
          <BiTrash onClick={() => removeTodo(todo.id)} className="deleteIcon" />
        </div>
      </div>
    );
  }

  return todos.map((todo, index) =>
    todo.id == edit.id ? <TodoEdit todo={todo} /> : <TodoNotEdit todo={todo} />
  );
}

export default Todo;
