import {useQuery, QueryClient} from '@tanstack/react-query'
import { getMenu } from '../../services/apiMenu'

export default function useMenu(){
    const {data: menuList, isLoading} = useQuery({
        queryFn: getMenu,
        queryKey: ['menu']
    })

    return {menuList, isLoading}
}