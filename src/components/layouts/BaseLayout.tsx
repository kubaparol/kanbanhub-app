import { FC } from "react";
import { Footer } from "../base/Footer";
import { Header } from "../base/Header";
import { Outlet } from "react-router-dom";

export interface BaseLayoutProps {}

export const BaseLayout: FC<BaseLayoutProps> = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-57px-72px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
