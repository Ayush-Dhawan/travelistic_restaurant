import {useQuery, QueryClient} from '@tanstack/react-query'
import { getOrderHistoryById } from '../../services/apiOrders'
import { getIdbyEmail } from '../../services/apiCustomers'

export default function useGetOrderHistory(id){
    const {data: orderHistory, error} = useQuery({
        queryFn: () => getOrderHistoryById(id),
        queryKey: ['orderHistory', id]
    })

    if(error) console.log("Count not fetch order history")

    return {orderHistory}
}

export function useGetIdByEmail(email){
    const {data: id, error} = useQuery({
        queryFn: () => getIdbyEmail(email),
        queryKey: ['IdByEmail']
    })

    if(error) console.log("Count not fetch ID")
    return id
}