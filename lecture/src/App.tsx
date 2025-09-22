import TodoBefore from "./mission2-1/TodoBefore";
import Todo from "./mission2-1/Todo";
import Context from "./mission2-2/ContextPage";
import { ThemeProvider } from "./mission2-2/context/ThemeProvider";
import { TodoProvider } from "./mission2-1/TodoContext";
import "./App.css";

function App() {
  return (
    <>
      {/* <TodoProvider>
        <Todo />
      </TodoProvider> // mission2-1 */}

      <ThemeProvider>
        <Context />
      </ThemeProvider>
    </>
  );
}

export default App;
