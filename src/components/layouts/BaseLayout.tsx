import { FC } from "react";
import { Header } from "../base/Header";
import { Outlet } from "react-router-dom";

export interface BaseLayoutProps {}

export const BaseLayout: FC<BaseLayoutProps> = () => {
  return (
    <div className=" bg-dotted-pattern">
      <Header />

      <main className="min-h-[calc(100vh-64px)] flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
