import { lazy } from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import BoardPage from "@/pages/board";

const HomePage = lazy(() => import("@/pages/home"));

const routes: RouteObject = {
  path: "/",
  element: <BaseLayout />,
  children: [
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "/boards/:id",
      element: <BoardPage />,
    },
  ],
};

const router = createBrowserRouter([routes]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
