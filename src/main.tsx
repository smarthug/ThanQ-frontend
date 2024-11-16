import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./pages/error-page.jsx";
import World from "./pages/world";
import CreatedQueue from "./pages/createdQueue/index.jsx";
import JoinedQueue from "./pages/joinedQueue/index.jsx";
import CreateQueue from "./pages/createQueue/index.jsx";
import JoinQueue from "./pages/joinQueue/index.jsx";
import ManageQueue from "./pages/manageQueue/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/world" replace />
      },
      {
        path: "world",
        element: <World />,
      },
      {
        path: "createdQueue",
        element: <CreatedQueue />,
      },
      {
        path: "joinedQueue",
        element: <JoinedQueue />,
      },
      {
        path: "createQueue",
        element: <CreateQueue />,
      },
      {
        path: "joinQueue",
        element: <JoinQueue />,
      },
      {
        path: "manageQueue",
        element: <ManageQueue />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
