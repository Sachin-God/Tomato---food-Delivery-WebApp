import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Cart from './Pages/Cart/Cart';
import { StoreContextProvider } from './Context/StoreContext';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import Signup from './Pages/Sign Up/Signup';
import { Toaster } from 'react-hot-toast'
import Verify from './Pages/Verify/Verify';
import MyOrders from './Pages/MyOrders.jsx/MyOrders';

export default function App() {
  return (
    <>
      <div className='App'>
      <BrowserRouter>
        <StoreContextProvider >
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/orders' element={<MyOrders />} />
          </Routes>
        </StoreContextProvider>
        <Toaster />
      </BrowserRouter>
    </div>
    <Footer />
    </>
  )
}
