import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { Routes } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib";
import { Toaster } from "./components/ui";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />

      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  </React.StrictMode>
);
