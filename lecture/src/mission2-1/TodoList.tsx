import React from "react";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: string[];
  buttonText: string;
  buttonStyle?: React.CSSProperties;
  onButtonClick: (index: number) => void;
};

const TodoList = ({ todos, buttonText, buttonStyle, onButtonClick }: TodoListProps) => (
  <>
    {todos.map((todo, idx) => (
      <TodoItem key={idx} text={todo} buttonText={buttonText} buttonStyle={buttonStyle} onButtonClick={() => onButtonClick(idx)} />
    ))}
  </>
);

export default TodoList;
