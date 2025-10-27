import { Outlet, useNavigate } from "react-router-dom";
import "./styles.css";

export default function App() {
  const nav = useNavigate();

  const handleClick = (path: string) => {
    nav(path);
  };

  return (
    <div className="App">
      Home
      <div
        style={{
          display: "flex",
          gap: "8px",
          margin: "8px auto",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <button
          style={{
            backgroundColor: "green",
            padding: "10px 16px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleClick("public")}
        >
          Public Page
        </button>
        <button
          style={{
            backgroundColor: "red",
            padding: "10px 16px",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleClick("private")}
        >
          Private Page
        </button>
      </div>
      <Outlet />
    </div>
  );
}
