import React, { useState, useEffect, useRef } from "react";
//rfce

const TodoInput: React.FC<any> = (props: any) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  //auto focus on start up or after edit
  const inputRef = useRef<any>();
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="TodoInput" onSubmit={handleSubmit}>
      <div className="todoInputBox">
        <input
          type="text"
          placeholder="Add a todo"
          value={input}
          name="text"
          className="todoText"
          onChange={handleChange}
          ref={inputRef}
        />
        <button className="todoButton">Add</button>
      </div>
    </form>
  );
};

export default TodoInput;
