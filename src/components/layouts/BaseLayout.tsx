import { FC } from "react";
import { Header } from "../base/Header";
import { Outlet } from "react-router-dom";

export interface BaseLayoutProps {}

export const BaseLayout: FC<BaseLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-dotted-pattern bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
