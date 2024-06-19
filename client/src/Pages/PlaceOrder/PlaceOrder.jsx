import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

export default function PlaceOrder() {
  const { totalAmount, token, food_list, items } = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (items[item._id] > 0) {
        let itemInfo = item
        itemInfo['quantity'] = items[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: formData,
      items: orderItems,
      amount: totalAmount() + 2
    }
    try {
      const result = await axios.post('http://localhost:5050/api/order/place-order', orderData, { headers: {token} })
      console.log(result);
      if (result.data.success) {
        const { success_url } = result.data;
        window.location.replace(success_url)
      } else {
        alert('Error')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p>Delivery Information</p>
        <div className='multi-fields'>
          <input required onChange={handleChange} type='text' placeholder='First name' id='firstname' />
          <input onChange={handleChange} type='text' placeholder='Last name' id='lastname' />
        </div>
        <input required onChange={handleChange} type='email' placeholder='Email' id='email' />
        <input required onChange={handleChange} type='text' placeholder='Street' id='street' />
        <div className='multi-fields'>
          <input required onChange={handleChange} type='text' placeholder='City' id='city' />
          <input required onChange={handleChange} type='text' placeholder='State' id='state' />
        </div>
        <div className='multi-fields'>
          <input required onChange={handleChange} type='text' placeholder='ZipCode' id='ZipCode' />
          <input required onChange={handleChange} type='text' placeholder='Country' id='Country' />
        </div>
        <input required onChange={handleChange} type='text' placeholder='Mobile No.' id='mobile' />
      </div>
      <div className='place-order-right'>
        <div className='card-total' >
          <h2>Card Total</h2>
          <div>
            <div className='card-details' >
              <p>Sub total</p>
              <p>${totalAmount()}</p>
            </div>
            <hr />
            <div className='card-details' >
              <p>Delivery Fee</p>
              <p>${totalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='card-details' >
              <b>Total</b>
              <b>${totalAmount() === 0 ? 0 : totalAmount() + 2}</b>
            </div>
          </div>
          <button >Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}
