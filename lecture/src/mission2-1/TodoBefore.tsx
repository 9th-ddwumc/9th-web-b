import { useState } from "react";

const TodoBefore = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [doneTodos, setDoneTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const completeTodo = (index: number) => {
    const todoToMove = todos[index];
    setTodos(todos.filter((_, i) => i !== index));
    setDoneTodos([...doneTodos, todoToMove]);
  };

  const deleteDoneTodo = (index: number) => {
    setDoneTodos(doneTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo">
      <header className="todo__header">
        <h1 className="todo__title">MEONGEE TODO</h1>
      </header>

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

      <div className="todo__sections">
        <section className="todo__section">
          <div className="todo__section-title">할 일</div>
          <div className="todo__list todo__list--todo">
            {todos.map((todo, index) => (
              <div className="todo__item" key={index}>
                {todo}
                <button className="todo__button" onClick={() => completeTodo(index)}>
                  완료
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="todo__section">
          <div className="todo__section-title">완료</div>
          <div className="todo__list todo__list--done">
            {doneTodos.map((todo, index) => (
              <div className="todo__item" key={index}>
                {todo}
                <button className="todo__button" style={{ background: "#ff2c2c" }} onClick={() => deleteDoneTodo(index)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TodoBefore;
