import {useQuery} from '@tanstack/react-query'
import { getItemsById, getOrderById } from '../../services/apiOrders'

export default function useGetOrderByID(order_id){
    const {data, isLoading} = useQuery({
        queryFn: () => getOrderById(order_id),
        queryKey: ["orderbyid"]
    })

    return {data, isLoading};
}

export  function useItemsByID(order_id){
    const {data, isLoading} = useQuery({
        queryFn: () => getItemsById(order_id),
        queryKey: ["itemsbyid"]
    })

    return {data, isLoading};
}