import "./App.css";
import UseReducerPage from "./05-useReducer/useReducerPage";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = (): void => {
    setCount(count + 1);
  };

  return (
    <>
      <UseReducerPage />
    </>
  );
}

export default App;
