import App from "@/App.tsx";
import AppProvider from "@/providers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
    <Toaster position="top-right" richColors closeButton />
  </StrictMode>,
);
