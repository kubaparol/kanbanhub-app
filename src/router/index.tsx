import { lazy } from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AppUrls } from "./urls";
import { BaseLayout } from "@/components/layouts/BaseLayout";

const HomePage = lazy(() => import("@/pages/home"));

const routes: RouteObject = {
  path: AppUrls.home,
  element: <BaseLayout />,
  children: [
    {
      path: "",
      element: <HomePage />,
    },
  ],
};

const router = createBrowserRouter([routes]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
