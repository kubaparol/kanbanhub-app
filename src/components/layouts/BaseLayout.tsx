import { FC } from "react";
import { Header } from "../base/Header";
import { Outlet } from "react-router-dom";

export interface BaseLayoutProps {}

export const BaseLayout: FC<BaseLayoutProps> = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-72px)] bg-blue-50">
        <Outlet />
      </main>
    </>
  );
};
