import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import { placeOrder as placeOrderApi } from '../../services/apiOrders';
import { clearCart } from '../cart/cartSlice';

export default function usePlaceOrders(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {mutate: placeOrder, isLoading: isPlacingOrder} = useMutation({
        mutationFn: ({order_id, items, status, price, address, phoneNumber, user_id}) => placeOrderApi({order_id, items, status, price, address, phoneNumber, user_id}),
        onSuccess: () =>{
            // alert("Order Placed!")
            dispatch(clearCart())
        },
        onError: (err) => {throw new Error("Could not place the order :(")}
    })

    return{placeOrder, isPlacingOrder}
}