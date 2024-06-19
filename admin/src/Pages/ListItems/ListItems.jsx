import React, { useEffect, useState } from 'react'
import './ListItems.css'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ListItems() {
  const [list, setList] = useState([])

  // destructure like this to avoid errors
  const getData = async () => {
    try {
      const {data} = await axios.get('http://localhost:5050/api/food/allfood')
      if (data) {
        setList(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(list);

  useEffect(() => {
    getData()
  }, [])

  const handleRemove = async (id) => {
    try {
      const {data} = await axios.post('http://localhost:5050/api/food/delete-food-item', {id:id})
      await getData();
      if (data) {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error('Something went Wrong')
      console.log(error)
    }
  }

  return (
    <div className='flex-col list add'>
      <p>All Food List</p>
      <div className='list-table' >
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className='list-table-format'>
              <img src={`http://localhost:5050/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='remove' onClick={ () => handleRemove(item._id)}>Remove</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
