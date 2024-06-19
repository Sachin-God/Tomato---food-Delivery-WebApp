import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
    <div className='header-contents'>
        <h2>Order your Favourite food here</h2>
        <p>Choose a diverse array menu featuring the Mysterious culinary flavours of the World</p>
        <a href='#food-display'><button>View Menu</button></a>
    </div> 
    </div>
  )
}
