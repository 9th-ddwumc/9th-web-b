import { UserDataDisplay as WelcomeData } from "./components/UserDataDisplay";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f7f8fa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem" }}>TanStack Query Practice</h1>
        <WelcomeData />
      </div>
    </main>
  );
}

export default App;
