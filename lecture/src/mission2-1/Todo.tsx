import React from "react";
import { useTodo } from "./TodoContext";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Todo = () => {
  const { todos, doneTodos, completeTodo, deleteDoneTodo } = useTodo();

  return (
    <div className="todo">
      <header className="todo__header">
        <h1 className="todo__title">MEONGEE TODO</h1>
      </header>

      <TodoInput />

      <div className="todo__sections">
        <section className="todo__section">
          <div className="todo__section-title">할 일</div>
          <div className="todo__list todo__list--todo">
            <TodoList todos={todos} buttonText="완료" onButtonClick={completeTodo} />
          </div>
        </section>

        <section className="todo__section">
          <div className="todo__section-title">완료</div>
          <div className="todo__list todo__list--done">
            <TodoList todos={doneTodos} buttonText="삭제" buttonStyle={{ background: "#ff2c2c" }} onButtonClick={deleteDoneTodo} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Todo;
