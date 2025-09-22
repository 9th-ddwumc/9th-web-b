import React from "react";

type TodoItemProps = {
  text: string;
  buttonText: string;
  buttonStyle?: React.CSSProperties;
  onButtonClick: () => void;
};

const TodoItem = ({ text, buttonText, buttonStyle, onButtonClick }: TodoItemProps) => (
  <div className="todo__item">
    {text}
    <button className="todo__button" style={buttonStyle} onClick={onButtonClick}>
      {buttonText}
    </button>
  </div>
);

export default TodoItem;
