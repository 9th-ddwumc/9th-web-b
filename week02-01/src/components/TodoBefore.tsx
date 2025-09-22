import { useState, type FormEvent } from "react";
import type { TTodo } from "../Types/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setInput("");
    }
  };
  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };
  const deleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((t) => t.id !== todo.id)
    );
  };
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">NAONG TODO</h1>
      <form
        onSubmit={handleSubmit}
        id="todo-form"
        className="todo-container__form"
      >
        <input
          value={input}
          onChange={(e): void => setInput(e.target.value)}
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일을 입력해주세요."
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list"></ul>
          {todos.map((todo) => (
            <li key={todo.id} className="render-container__item">
              <span className="render-container__item-text">{todo.text}</span>
              <button
                onClick={() => completeTodo(todo)}
                style={{ backgroundColor: "#28a745" }}
                className="render-container__item-button"
              >
                완료
              </button>
            </li>
          ))}
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list"></ul>
          {doneTodos.map((todo) => (
            <li key={todo.id} className="render-container__item">
              <span className="render-container__item-text">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo)}
                style={{ backgroundColor: "#dc3545" }}
                className="render-container__item-button"
              >
                삭제
              </button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
