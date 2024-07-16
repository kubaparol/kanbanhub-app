import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { Routes } from "./router";
import { ThemeProvider } from "./components/providers/Theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>

      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  </React.StrictMode>
);
