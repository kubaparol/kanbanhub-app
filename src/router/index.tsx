import { lazy, Suspense } from "react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { BaseLayout } from "@/components/layouts/BaseLayout";

const HomePage = lazy(() => import("@/pages/home"));
const BoardPage = lazy(() => import("@/pages/board"));

const routes: RouteObject = {
  path: "/",
  element: <BaseLayout />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<div />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "/boards/:id",
      element: (
        <Suspense fallback={<div />}>
          <BoardPage />
        </Suspense>
      ),
    },
  ],
};

const router = createBrowserRouter([routes]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
