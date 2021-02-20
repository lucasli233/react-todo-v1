import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoInput from "./TodoInput";

const LOCAL_STORAGE_KEY: string = "react-todo-list-todos";

export type TodoItem = {
  id: number;
  text: string;
  isComplete: boolean;
};

function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    if (storageTodos) setTodos(storageTodos);
  }, []);

  useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: TodoItem) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      // handles unexpected inputs
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(todo, ...todos);
  };

  const updateTodo = (newTodo: TodoItem) => {
    if (!newTodo.text || /^\s*$/.test(newTodo.text)) {
      // handles unexpected inputs
      return;
    }
    console.log(newTodo);
    console.log(todos);

    setTodos((prev) =>
      prev.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
    );
  };

  const removeTodo = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const completeTodo = (id: number) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>My Tasks</h1>
      <TodoInput onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
