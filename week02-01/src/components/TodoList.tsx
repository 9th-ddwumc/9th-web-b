import type { TTodo } from "../Types/todo";

interface TodoListProps {
  title: string;
  todos?: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
}: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="render-container__list"></ul>
      {todos?.map((todo) => (
        <li key={todo.id} className="render-container__item">
          <span className="render-container__item-text">{todo.text}</span>
          <button
            onClick={() => onClick(todo)}
            style={{ backgroundColor: buttonColor }}
            className="render-container__item-button"
          >
            {buttonLabel}
          </button>
        </li>
      ))}
    </div>
  );
};
export default TodoList;
