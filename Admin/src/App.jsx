import React, { useEffect } from 'react';
import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from 'src/components/topbar/Topbar' // component
import Sidebar from 'src/components/sidebar/Sidebar' // component
import Home from 'src/pages/home/Home' // page
import UserList from 'src/pages/userList/UserList'; // page
import UserDetail from 'src/pages/userDetail/UserDetail'; // page
import AddUser from 'src/pages/addUser/AddUser'; // page
import ProductList from 'src/pages/productList/ProductList'; // page
import ProductDetail from 'src/pages/productDetail/ProductDetail'; // page
import AddProduct from 'src/pages/addProduct/AddProduct'; // page
import Login from 'src/pages/login/Login'; // page
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct } from 'src/redux/apiCalls';

export default function App() {
  const dispatch = useDispatch()
  const { isSession } = useSelector(state => state.user)
  console.log('sessionnnn', isSession)

  return (
    <BrowserRouter> {/* contain app / */}
      {isSession ? <Topbar /> : <></>}
      <div className="mainContainer"> {/* under topbar / */}
        {isSession ? <Sidebar /> : <></>} {/* left / */}
        <div className="rightContainer"> {/* right / */}
          <Routes>
            <Route path='/' element={isSession ? <Navigate to='/home' /> : <Navigate to='/login' />} />
            <Route path='/home' element={isSession ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={isSession ? <Navigate to='/home' /> : <Login />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/user/:id' element={<UserDetail />} />
            <Route path='/addUser' element={<AddUser />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/addProduct' element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
};