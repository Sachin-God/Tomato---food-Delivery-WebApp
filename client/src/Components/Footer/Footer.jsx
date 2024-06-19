import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

export default function Footer() {
  return (
    <div id='footer' className='footer'>
      <div className='footer-content'>
        <div className='footer-content-left' >
            <img src={assets.logo} alt='logo' />
            <p>Dive into the worlds all exclusive food and culinary</p>
            <div className='footer-icons'>
                <img src={assets.facebook_icon} alt='facebook_icon' />
                <img src={assets.linkedin_icon} alt='linkedin_icon' />
                <img src={assets.twitter_icon} alt='twitter_icon' />
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Delivery</li>
            </ul>
        </div>
        <div className='footer-content-right' >
            <h2>Get in Touch</h2>
            <ul>
                <li>+91 888-888-8888</li>
                <li>sachin@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <div className='footer-copyright' >
        <p>copyright by Sachin | 2022UME4111</p>
      </div>
    </div>
  )
}
