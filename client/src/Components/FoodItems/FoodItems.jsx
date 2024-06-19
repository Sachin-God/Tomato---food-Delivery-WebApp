import React, { useContext } from 'react'
import './FoodItems.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

export default function FoodItems({ id, name, img, price, description }) {
    const { items, addToCart, removeToCart, url } = useContext(StoreContext)

    return (
        <div className='food-item'>
            <div className='food-item-image-div' >
                <img className='food-item-image' src={url + 'images/' + img} alt={name} />
                {!items[id] ? <img onClick={() => addToCart(id)} className='add' src={assets.add_icon_white} /> :
                    <div className='food-item-counter'>
                        <img onClick={() => removeToCart(id)} src={assets.remove_icon_red} />
                        {items[id]}
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
                    </div>}
            </div>
            <div className='food-item-info' >
                <div className='food-item-name-rating' >
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className='food-item-description' >
                    {description}
                </p>
                <p className='food-item-price' >
                    ${price}
                </p>
            </div>
        </div>
    )
}
