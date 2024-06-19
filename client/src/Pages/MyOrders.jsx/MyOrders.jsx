import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

export default function MyOrders() {
    const [data, setData] = useState([])
    const {token} = useContext(StoreContext)

    const getOrders = async () => {
        try {
            const res = await axios.post('http://localhost:5050/api/order/orders', {}, {headers: {token}})
            setData(res.data.order)
            console.log(res.data.order);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            getOrders()
        }
    }, [token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container' >
        {data.map((item, index) => {
            return (
                <div key={index} className='my-orders-order'>
                    <img src={assets.parcel_icon} />
                    <p>{item.items.map((i, index) => {
                        if (index === item.items.length - 1){
                            return i.name + " x " + i.quantity
                        } else {
                            return i.name + " x " + i.quantity + ','
                        }
                    })}</p>
                    <p>{item.amount}</p>
                    <b>{item.status}</b>
                    <button>Track order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}
