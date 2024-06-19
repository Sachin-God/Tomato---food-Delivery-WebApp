import React, { useEffect } from 'react'
import './Verify.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams} from 'react-router-dom'

export default function Verify() {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const navigate = useNavigate()
    console.log({success, orderId});

    const verifyPayment = async () => {
        const res = await axios.post('http://localhost:5050/api/order/verify' ,{success, orderId})
        if (res.data.success) {
            
            setTimeout(() => {
                navigate('/')
                toast.success('Payment Successfull')
            }, 1200);
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])
  return (
    <div className='verify'>
    <div className='spinner' >

    </div>
      
    </div>
  )
}
