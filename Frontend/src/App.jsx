import React, { useState } from 'react';
import { useEffect } from "react";
import Home from "./pages/home/Home";
import ProductPage from "./pages/productPage/ProductPage";
import ProductDetail from "./pages/productDetail/ProductDetail";
import RegisterAndLogin from "./pages/account/RegisterAndLogin";
import Cart from "./pages/cart/Cart";
import Introduction from './pages/introduction/Introduction';
import UserDetail from "./pages/userDetail/UserDetail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import MobileLogin from './pages/mobile/login/MobileLogin';
import MobileRegister from './pages/mobile/register/MobileRegister';
import Order from './pages/orderList/OrderList'

export default function App() {
  const { isSession } = useSelector(state => state.user)
  const isMobileDevice = window.matchMedia("(max-width: 768px)").matches
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇️ redirect to /home when user goes to / */}
        <Route path="/" element={isSession ? <Navigate to="/home" /> : <Navigate to={isMobileDevice ? "/mobile/login" : "/login"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isSession ? <Navigate to="/home" /> : <RegisterAndLogin exchange={false} />} />
        <Route path="/register" element={isSession ? <Navigate to="/home" /> : <RegisterAndLogin exchange={true} />} />
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="/mobile/login" element={isSession ? <Navigate to="/home" /> : <MobileLogin />} />
        <Route path="/mobile/register" element={<MobileRegister />} />
        <Route path="/order" element={<Order />} />
        {/* 👇️ only match this when no other routes match */}
        <Route
          path="*"
          element={
            <div>
              <h1>404 Page not found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};