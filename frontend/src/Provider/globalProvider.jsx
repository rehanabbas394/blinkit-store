import { createContext,useContext, useEffect, useState } from "react";
import {Axios} from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/Axios-toast-error";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/priceWithDiscount";
import Api_endpoints from "../common/api-details";


export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children}) => {
    const dispatch = useDispatch()
     const [totalPrice,setTotalPrice] = useState(0)
     const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
     const [totalQty,setTotalQty] = useState(0)
    const cartItem = useSelector(state => state.cartItem?.cart) || []
    const user = useSelector(state => state?.user)

    const fetchCartItem = async()=>{
        try {
          const response = await Axios({
            ...Api_endpoints.getCartItem
          })
          const { data : responseData } = response
    
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log(responseData)
          }
    
        } catch (error) {
          console.log(error)
        }
    }

    const updateCartItem = async(id,qty)=>{
      try {
          const response = await Axios({
            ...Api_endpoints.updateCartItemQty,
            data : {
              _id : id,
              qty : qty
            }
          })
          const { data : responseData } = response

          if(responseData.success){
              toast.success(responseData.message)
              fetchCartItem()
              return responseData
          }
      } catch (error) {
        AxiosToastError(error)
        return error
      }
    }
    const deleteCartItem = async(cartId)=>{
      try {
          const response = await Axios({
            ...Api_endpoints.deleteCartItem,
            data : {
              _id : cartId
            }
          })
          const { data : responseData} = response

          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }
      } catch (error) {
         AxiosToastError(error)
      }
    }

    useEffect(()=>{
      try {
        const items = Array.isArray(cartItem) ? cartItem : []
        const qty = items.reduce((preve,curr)=>{
            return preve + (curr?.quantity || 0)
        },0)
        setTotalQty(qty)
        
        const tPrice = items.reduce((preve,curr)=>{
            const priceAfterDiscount = pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)

            return preve + (priceAfterDiscount * (curr?.quantity || 0))
        },0)
        setTotalPrice(tPrice)

        const notDiscountPrice = items.reduce((preve,curr)=>{
          return preve + ((curr?.productId?.price || 0) * (curr?.quantity || 0))
        },0)
        setNotDiscountTotalPrice(notDiscountPrice)
      } catch (err) {
        console.error('Error computing cart totals in GlobalProvider:', err)
        setTotalQty(0)
        setTotalPrice(0)
        setNotDiscountTotalPrice(0)
      }
  },[cartItem])

    const handleLogoutOut = ()=>{
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }


    useEffect(()=>{
      fetchCartItem()
      handleLogoutOut()
    },[user])
    
    return(
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            totalPrice,
            totalQty,
            notDiscountTotalPrice,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider