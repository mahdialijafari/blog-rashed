import React, { useContext } from "react";
import { Footer, Navbar } from "./Components";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth, Home, NotFound, PostDetails, Posts, Profile } from "./Pages";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./Utils/AuthContext";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <main className="min-h-[90vh]">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/posts/:categoryId/:categoryName" element={<Posts />} />
          <Route
            path="/auth"
            element={token ? <Navigate to={"/"} /> : <Auth />}
          />
          <Route
            path="/profile"
            element={!token ? <Navigate to={"/auth"} /> : <Profile />}
          />
          <Route
            path="/post-details/:id/:title"
            element={<PostDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
