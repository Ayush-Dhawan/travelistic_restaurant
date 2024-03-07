import {useQuery, QueryClient} from '@tanstack/react-query'

import { getPasswordbyEmail } from '../services/apiCustomers'

export default function useGetUser(){
    const {data: password, isLoading} = useQuery({
        queryFn: (email) => getPasswordbyEmail(email),
        queryKey: ['restaurant-users']
    })

    return {password, isLoading}
}