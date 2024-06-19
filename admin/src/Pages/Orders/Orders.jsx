import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

export default function Orders() {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/order/allorders')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const statushandler = async (event, orderid) => {
    const updatedStatus = event.target.value
    try {
      const response = await axios.post('http://localhost:5050/api/order/status', { orderid, status: updatedStatus })
      if (response.data.success) {
        setOrders(orders.map(order => 
          order._id === orderid ? { ...order, status: updatedStatus } : order
        ))
        toast.success('Status updated successfully')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className='order-list'>
        {orders.map((item, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='Parcel Icon' />
            <div>
              <p className='order-item-food'>
                {item.items.map((order, index) => (
                  <span key={index}>
                    {order.name} x {order.quantity}{index < item.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className='order-item-name'>
                {item.address.firstname} {item.address.lastname}
              </p>
              <div className='order-item-address'>
                {item.address.street}, {item.address.city} - {item.address.zipCode}, {item.address.country}
              </div>
              <p className='order-item-phone'>{item.address.mobile}</p>
            </div>
            <p>Items: {item.items.length}</p>
            <p>Amount: ${item.amount}</p>
            <select onChange={(e) => statushandler(e, item._id)} value={item.status}>
              <option value='Processing'>Processing</option>
              <option value='Delivered'>Delivered</option>
              <option value='Out for Delivery'>Out for Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
