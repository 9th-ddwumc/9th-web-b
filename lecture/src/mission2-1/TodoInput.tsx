import React from "react";
import { useTodo } from "./TodoContext";

const TodoInput = () => {
  const { input, setInput, addTodo } = useTodo();

  return (
    <div className="todo__input-area">
      <input
        className="todo__input"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <button className="todo__button todo__button--finish" onClick={addTodo}>
        등록 하기
      </button>
    </div>
  );
};

export default TodoInput;
