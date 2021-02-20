import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList, { TodoItem } from "./TodoList";
import { BiTrash, BiEdit } from "react-icons/bi";

type Props = {
  todos: TodoItem[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (newTodo: TodoItem) => void;
};
const Todos: React.FC<Props> = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
}) => {
  const [currentTodoId, setCurrentTodoId] = useState<number>();

  function TodoEdit({ todo }: { todo: TodoItem }) {
    const [newText, setNewText] = useState(todo.text);

    function handleSubmit(e: any) {
      e.preventDefault();
      setCurrentTodoId(undefined);
      updateTodo({
        ...todo,
        text: newText,
      });
    }

    return (
      <form onSubmit={handleSubmit} className="todoEdit">
        <input
          type="text"
          // placeholder="Update task"
          value={newText}
          // name="text"
          onChange={(e) => setNewText(e.target.value)}
          className="todoText edit"
        />
        <button className="todoButton edit">Submit</button>
      </form>
    );
  }

  // rename lol
  const TodoNotEdit: React.FC<{ todo: TodoItem }> = ({ todo }) => {
    return (
      <div className={todo.isComplete ? "todoRow complete" : "todoRow"}>
        <div onClick={() => completeTodo(todo.id)} className="todoToggle" />
        <p className="todoContent">{todo.text}</p>

        <div className="icons">
          <BiEdit
            onClick={() => setCurrentTodoId(todo.id)}
            className="editIcon"
          />
          <BiTrash onClick={() => removeTodo(todo.id)} className="deleteIcon" />
        </div>
      </div>
    );
  };

  return (
    <div>
      {todos.map((todo, index) =>
        todo.id === currentTodoId ? (
          <TodoEdit key={todo.id} todo={todo} />
        ) : (
          <TodoNotEdit key={todo.id} todo={todo} />
        )
      )}
    </div>
  );
};

export default Todos;
