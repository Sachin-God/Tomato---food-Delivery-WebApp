import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Navbar() {
    const [menu, setMenu] = useState('home')
    const { totalAmount, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const result = await axios.get('http://localhost:5050/api/auth/logout', {
                withCredentials: true
            })
            console.log(result)
            if (result.data === 'Logged out successfully') {
                toast.success('Logged out successfully')
                localStorage.removeItem("token")
                setToken("")
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='navbar'>
            <Link to={'/'}><img src={assets.logo} alt='LOGO' className='logo' /></Link>
            <ul className='navbar-menu'>
                <li onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}><Link to={'/'}>Home</Link></li>
                <li onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}><Link to={'/contactus'}>Contact us</Link></li>
            </ul>
            <div className='navbar-right' >
                <img src={assets.search_icon} alt='' />
                <div className='navbar-search-icon'>
                    <Link to={'/cart'}><img src={assets.basket_icon} alt='' /></Link>
                    <div className={totalAmount() === 0 ? '' : 'dot'} />
                </div>
                {!token ? <Link to={'/login'}><button>login</button></Link> : <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt='profile' />
                    <ul className='profile-dropdown' >
                        <li onClick={() => navigate('/orders')}><img src={assets.bag_icon} /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} /><p>Logout</p></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}
