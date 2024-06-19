import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { items, food_list, removeToCart, totalAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className='card-items'>
        <div className='card-items-title'>
          <p>Items</p>
          <p>Titles</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (items[item._id] > 0) {
            return (
              <>
                <div className='card-items-title card-items-item'>
                  <img src={url + 'images/' + item.image} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{items[item._id]}</p>
                  <p>${item.price * items[item._id]}</p>
                  <p onClick={() => removeToCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </>
            )
          }
        })}
      </div>
      <div className='card-bottom' >
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
              <p>${totalAmount() === 0? 0 : 2}</p>
            </div>
            <hr />
            <div className='card-details' >
              <b>Total</b>
              <b>${totalAmount() === 0? 0 : totalAmount() + 2}</b>
            </div>
          </div>
          <button onClick={()=> navigate('/order')}>Proceed to Checkout</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>Enter the promocode</p>
            <div className='promocode-input' >
              <input type='text' placeholder='PROMO'/>
              <button>Submit</button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
