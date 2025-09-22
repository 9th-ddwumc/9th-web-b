import React, { createContext, useContext, useState } from "react";

type TodoContextType = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>; // useState 갱신
  todos: string[];
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
  doneTodos: string[];
  setDoneTodos: React.Dispatch<React.SetStateAction<string[]>>;

  addTodo: () => void;
  completeTodo: (index: number) => void;
  deleteDoneTodo: (index: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return <TodoContext.Provider value={{ input, setInput, todos, setTodos, doneTodos, setDoneTodos, addTodo, completeTodo, deleteDoneTodo }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("error");
  return context;
};
