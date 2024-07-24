import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_access_token } from "../../../store/slices/auth/token-login-slice"
import { cart_count_state, fetchCartCount } from "../../../store/slices/general_slices/cart-count-slice"

const useCartCountHook = () => {
    const dispatch = useDispatch()
    const tokenFromStore: any = useSelector(get_access_token);
    const totalCartCountFromStore: any = useSelector(cart_count_state)
    const [totalCartCount, setTotalCartCount] = useState<number>(0)

    useEffect(() => {
        dispatch(fetchCartCount(tokenFromStore?.token));
    }, [])

    useEffect(() => {
        if (totalCartCountFromStore?.isLoading === "succeeded") {
            setTotalCartCount(totalCartCountFromStore?.totalCartCount)
        }
    }, [totalCartCountFromStore])

    return {
        totalCartCount
    }
}


export default useCartCountHook