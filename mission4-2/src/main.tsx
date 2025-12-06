import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { SearchBarProvider } from "./context/SearchBarContext.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <SearchBarProvider>
        <AuthProvider>
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </SearchBarProvider>
    </SidebarProvider>
  </StrictMode>
);
