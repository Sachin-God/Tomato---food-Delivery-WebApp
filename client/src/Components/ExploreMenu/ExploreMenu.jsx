import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

export default function ExploreMenu({ category, setCatagory }) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose a diverse array menu featuring the Mysterious culinary flavours of the World</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCatagory(prev => prev === item.menu_name ? 'All' : item.menu_name)} className='explore-menu-list-item' key={index}>
            {/* // prev is current State */}
              <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt='menu-item' />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}
