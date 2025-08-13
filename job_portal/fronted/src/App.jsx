import React from "react";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browser from "./components/Browser";
import Profile from "./components/profile/Profile";
import JobDescription from "./components/profile/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup"
import Cjob from "./components/admin/Cjob";
import PostJob from "./components/admin/PostJob";
import Applicant from "./components/admin/Applicant";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Verify from "./components/auth/Verify";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/verify",
    element:<Verify />
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path:"/description/:id",
    element:<JobDescription />


  },
  {
    path: "browse",
    element: <Browser />,
  },
  {
    path:"/profile",
    element:<Profile />
  },
  //admin ke liya yha se start hoga

  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
    {
    path:"/admin/companies/create",
    element:<CompanyCreate />
  },
   {
    path:"/admin/companies/:id",
    element:<CompanySetup />
  },
  {
    path:"/admin/jobs",
    element:<Cjob />
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob />
  },
   {
    path:"/admin/jobs/:id/applicants",
    element:<Applicant />
  },



]);
const App = () => {
  return (
    // <div>
    //   <Navbar />
    // </div>
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
