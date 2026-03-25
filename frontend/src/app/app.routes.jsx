import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";
import Home from "../features/home/pages/Home";
import Favorites from "../features/home/pages/Favorites";
import History from "../features/home/pages/History";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/favorites",
    element: (
      <Protected>
        <Favorites />
      </Protected>
    ),
  },
  {
    path: "/history",
    element: (
      <Protected>
        <History />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
