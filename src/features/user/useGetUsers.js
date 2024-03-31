import {useQuery} from '@tanstack/react-query'
import { getOrders } from '../../services/apiOrders'
import { getCustomers } from '../../services/apiCustomers'

export default function useGetUsers(){
    const {data: allUsers, isLoading: isGettingUsers} = useQuery({
        queryFn: getCustomers,
        queryKey: ['users']
    })

    return  {allUsers, isGettingUsers}
}