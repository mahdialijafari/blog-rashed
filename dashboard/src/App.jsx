import React, { useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout";
import { AuthContext } from "./Utils/AuthContext";
import {
  Home,
  Login,
  NotFound,
  Categories,
  Comments,
  CreateCategories,
  CreatePosts,
  GetAllCategories,
  GetAllPosts,
  GetAllUsers,
  Posts,
  UpdateCategories,
  UpdatePosts,
  UpdateUsers,
  Users,
} from "./Pages";

export default function App() {
  const { token,user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={!token || user?.role!='admin'? <Navigate to={'/login'} /> :<Layout/> }>
          <Route index element={<Home />} />
          <Route path="comments" element={<Comments />} />

          <Route path="posts" element={<Posts />}>
            <Route index element={<GetAllPosts />} />
            <Route path="create" element={<CreatePosts />} />
            <Route path=":id" element={<UpdatePosts />} />
          </Route>

          <Route path="categories" element={<Categories />}>
            <Route index element={<GetAllCategories />} />
            <Route path="create" element={<CreateCategories />} />
            <Route path=":id" element={<UpdateCategories />} />
          </Route>

          <Route path="users" element={<Users />}>
            <Route index element={<GetAllUsers />} />
            <Route path=":id" element={<UpdateUsers />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Notification System */}
      <Toaster />
    </>
  );
}
