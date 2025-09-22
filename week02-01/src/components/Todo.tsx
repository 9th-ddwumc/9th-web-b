import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useContext, useState, type FormEvent } from "react";
import type { TTodo } from "../Types/todo";
import { TodoContext, useTodo } from "../context/TodoContext";

const Todo = () => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">NAONG TODO</h1>
      <TodoForm></TodoForm>

      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        ></TodoList>
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        ></TodoList>
      </div>
    </div>
  );
};

export default Todo;
