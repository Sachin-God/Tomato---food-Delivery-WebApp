import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext()

export const StoreContextProvider = (props) => {

    const [items, setItems] = useState({})
    const [food_list, setFoodList] = useState([])
    const [token, setToken] = useState("")
    const url = 'http://localhost:5050/'

    const addToCart =async (id) => {
        if (!items[id]) {
            setItems(prev => ({ ...prev, [id]: 1 }));
        } else {
            setItems(prev => ({ ...prev, [id]: prev[id] + 1 }));
        }

        if(token) {
            await axios.post('http://localhost:5050/api/cart/add-to-cart', {itemId : id}, {headers: {token}} )
        }
    }

    const removeToCart = async(id) => {
        setItems((prev) => ({ ...prev, [id]: prev[id] - 1 }))
        if(token) {
            await axios.post('http://localhost:5050/api/cart/remove-from-cart', {itemId : id}, {headers: {token}} )
        }
    }

    const getCart = async (token) => {
        const res = await axios.post('http://localhost:5050/api/cart/get-cart', {}, {headers: {token}} )
        setItems(res.data.cartData)
    }

    const totalAmount = () => {
        let total = 0
        for (const item in items) {
            if (items[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item)
                total += iteminfo.price * items[item]
            }
        }
        return total
    }

    const getItems = async () => {
        try {
            const { data } = await axios.get('http://localhost:5050/api/food/allfood')
            if (data) {
                setFoodList(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function load () {
            await getItems()
            if (localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                await getCart(localStorage.getItem('token'))
            }
        }
        load()
    },[])

    const ContextValue = {
        food_list,
        items,
        setItems,
        addToCart,
        removeToCart,
        totalAmount,
        url,
        token, 
        setToken
    }
    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}