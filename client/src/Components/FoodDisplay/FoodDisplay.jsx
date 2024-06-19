import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItems from '../FoodItems/FoodItems'

export default function FoodDisplay({category}) {
    const {food_list} = useContext(StoreContext)
  return (
    <div>
      <div className='food-display' id='food-display' >
        <h2>Top Dishes near you</h2>
        <div className='food-display-list'>
            {food_list.map((item, index)=> {
              if (category === 'All' || category === item.category){
                return <FoodItems key={index} name={item.name} price={item.price} id={item._id} description={item.description} img={item.image} />
            }})}
        </div>
      </div>
    </div>
  )
}
