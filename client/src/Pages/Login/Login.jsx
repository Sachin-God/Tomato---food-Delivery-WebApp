import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';

export default function Login() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const {user, setUser,token, setToken} = useContext(StoreContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post('http://localhost:5050/api/auth/login', formData, {
        withCredentials: true
      })
      console.log(result)
      if (result.data.message === "User Loggedin SuccessFully") {
        toast.success("User Login Successfull")
        setTimeout(() => {
          navigate('/')
        }, 1000);
        setToken(result.data.token)
        localStorage.setItem('token',result.data.token )
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='login'>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input id='email' onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} placeholder='email' className='input' type='email' required/>
        <input id='password' onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} placeholder='password' className='input' type='password' required/>
        
        <button>login</button>
      </form>
      <p>Don't have an account. <Link to={'/signup'}><span>Sign Up</span></Link></p>
    </div>
  )
}
