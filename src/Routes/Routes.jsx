import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
