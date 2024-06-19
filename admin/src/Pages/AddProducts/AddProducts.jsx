import React, { useRef, useState } from 'react'
import './AddProducts.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddProducts() {
  const fileRef = useRef(null)
  const [formdata, setFormData] = useState({})
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const Submithandler = async (e) => {
    e.preventDefault()
    const finalForm = new FormData()
    finalForm.append("name", formdata.name)
    finalForm.append("description", formdata.description)
    finalForm.append("price", Number(formdata.price))
    finalForm.append("category", formdata.category)
    finalForm.append("image", image)

    try {
      if (image) {
        const result = await axios.post('http://localhost:5050/api/food/upload', finalForm)

        if (result.data.message === 'Food uploaded Successfully') {
          setFormData({
            name: "",
            description: "",
            price: "",
            category: ""
          })
          setImage(null)
          toast.success('Food uploaded Successfully')
        }
      } else {
        toast.error('upload image')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error);
    }
  }

  return (
    <div className='add'>
      <form onSubmit={Submithandler} className='flex-col' >
        <div className='img-upload flex-col'>
          <p>Upload image</p>
          <img onClick={() => fileRef.current.click()} src={image ? URL.createObjectURL(image) : assets.upload_area} />
          <input onChange={(e) => setImage(e.target.files[0])} ref={fileRef} type='file' id='image' name='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={handleChange} value={formdata.name} type='text' name='name' required placeholder='name' />
        </div>
        <div className='add-product-desc flex-col'>
          <p>Product Description</p>
          <textarea onChange={handleChange} value={formdata.description} name='description' rows={6} required placeholder='Write Content Here' />
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={handleChange} value={formdata.category} name='category' required>
              <option value={'Salad'}>Salad</option>
              <option value={'Rolls'}>Rolls</option>
              <option value={'Deserts'}>Deserts</option>
              <option value={'Sandwich'}>Sandwich</option>
              <option value={'Cake'}>Cake</option>
              <option value={'Pure Veg'}>Pure Veg</option>
              <option value={'Pasta'}>Pasta</option>
              <option value={'Noodles'}>Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product Price</p>
            <input required onChange={handleChange} value={formdata.price} type='Number' name='price' />
          </div>
        </div>
        <button type='submit' className='btn'>Add Item</button>
      </form>
    </div>
  )
}
