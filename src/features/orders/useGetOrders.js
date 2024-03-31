import {useQuery} from '@tanstack/react-query'
import { getOrders } from '../../services/apiOrders'

export default function useGetOrders(){
    const {data: allOrders, isLoading: isGettingOrders} = useQuery({
        queryFn: getOrders,
        queryKey: ['orders']
    })

    return {allOrders, isGettingOrders}
}