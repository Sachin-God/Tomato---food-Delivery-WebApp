import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProducts from './Pages/AddProducts/AddProducts'
import ListItems from './Pages/ListItems/ListItems'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>
    <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content' >
        <Sidebar />
        <Routes>
          <Route path='/add-item' element={<AddProducts />}/>
          <Route path='/all-items' element={<ListItems />}/>
          <Route path='/orders' element={<Orders />}/>
        </Routes>
      </div>
    </div>
  )
}
