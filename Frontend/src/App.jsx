import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Navbar from "./components/layout/Navbar";
import Register from "./pages/public/Register";
import Login from "./pages/public/Login";
import { getCurrentUser } from "./api/user.api";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const dispatch =useDispatch();
  useEffect(()=>{
    getCurrentUser(dispatch);
  },[dispatch]);
  const {userData} = useSelector((state)=>state.user);
 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
       <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0D0D0D",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
};

export default App;
