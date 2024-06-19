import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'

export default function Home() {
  const [category, setCatagory] = useState('All')
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCatagory={setCatagory} />
      <FoodDisplay category={category}/>
    </div>
  )
}
