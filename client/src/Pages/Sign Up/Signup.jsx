import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const result = await axios.post('http://localhost:5050/api/auth/signup', formData);
    
        console.log(result);
    
        if (result.data && result.data.message === 'New User Created') {
          toast.success('User Created');
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        toast.error('User Already Exists');
      }
    }
  return (
    <div className='signup'>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input onChange={handleChange} id='name' placeholder='Name' className='input' type='text' required/>
        <input onChange={handleChange} id='email' placeholder='email' className='input' type='email' required/>
        <input onChange={handleChange} id='password' placeholder='password' className='input' type='password' required/>
        <div className='check'>
          <input type='checkbox' required />
          <p>By agreeing you are accepting our terms and conditions.</p>
        </div>
        <button>signup</button>
      </form>
      <p>Already have an account. <Link to={'/login'}><span>login</span></Link></p>
    </div>
  )
}
