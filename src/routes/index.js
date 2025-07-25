import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/common/Home";
import MovieDetail from "../pages/common/MovieDetail";
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";
import Booking from "../pages/user/Booking";
import Profile from "../pages/user/Profile";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Movies from "../pages/admin/Movies";
import Genres from "../pages/admin/Genres";
import Actors from "../pages/admin/Actors";
import Showtimes from "../pages/admin/Showtimes";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
// Các page khác sẽ thêm sau

const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

const AdminRoute = ({ children }) => {
  const user = getUser();
  if (!user || user.role !== "admin") return <Navigate to="/login" />;
  return children;
};

const PrivateRoute = ({ children }) => {
  const user = getUser();
  const location = useLocation();
  if (!user || user.role !== "user") {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Common/guest routes dùng UserLayout */}
    <Route element={<UserLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* User routes */}
      <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Route>
    {/* Admin routes dùng AdminLayout riêng */}
    <Route path="/admin" element={<AdminRoute><AdminLayout><Dashboard /></AdminLayout></AdminRoute>} />
    <Route path="/admin/users" element={<AdminRoute><AdminLayout><Users /></AdminLayout></AdminRoute>} />
    <Route path="/admin/movies" element={<AdminRoute><AdminLayout><Movies /></AdminLayout></AdminRoute>} />
    <Route path="/admin/genres" element={<AdminRoute><AdminLayout><Genres /></AdminLayout></AdminRoute>} />
    <Route path="/admin/actors" element={<AdminRoute><AdminLayout><Actors /></AdminLayout></AdminRoute>} />
    <Route path="/admin/showtimes" element={<AdminRoute><AdminLayout><Showtimes /></AdminLayout></AdminRoute>} />
    {/* Các route khác sẽ thêm sau */}
  </Routes>
);

export default AppRoutes; 