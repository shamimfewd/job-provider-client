import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Home from "../Pages/Home/Home";
import JobDetails from "../Pages/JobDetails";
import AddJob from "../Pages/AddJob";
import ErrorPage from "../Pages/ErrorPage";
import MyPostedJob from "../Pages/MyPostedJob";
import UpdateJob from "../Pages/UpdateJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
      {
        path: "/job/:id",
        element: <JobDetails />,
        loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`),
      },
      {
        path: "/update/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`),
      },
      {
        path: "/add-job",
        element: <AddJob />,
      },
      {
        path: "/my-posted-job",
        element: <MyPostedJob />,
      },
    ],
  },
]);

export default router;
