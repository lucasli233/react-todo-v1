import React, { useState, useEffect, useRef } from "react";
//rfce

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  //auto focus on start up or after edit
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      {props.edit ? (
        <div className="todoFormBox">
          <input
            type="text"
            placeholder="Update task"
            value={input}
            name="text"
            className="todoInput edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todoButton edit">Update</button>
        </div>
      ) : (
        <div className="todoFormEdit">
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="todoInput"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todoButton">Add todo</button>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
