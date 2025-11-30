import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UseCallbackPage from "./10-useCallback-memo/UseCallbackPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UseCallbackPage />
    </>
  );
}

export default App;
