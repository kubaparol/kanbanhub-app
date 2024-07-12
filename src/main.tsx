import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { Routes } from "./router";
import { ThemeProvider } from "./components/providers/Theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>
);
