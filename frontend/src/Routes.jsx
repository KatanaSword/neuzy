import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
const UpdatePassword = React.lazy(() => import("./pages/UpdatePassword"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const AllBlog = React.lazy(() => import("./pages/AllBlog"));
const SigleBlog = React.lazy(() => import("./pages/SigleBlog"));
const Subscribe = React.lazy(() => import("./pages/Subscribe"));
const Homepage = React.lazy(() => import("./pages/Homepage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <h1>Loading...</h1>
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/sigleblog" element={<SigleBlog />} />
          <Route path="/allblog" element={<AllBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
