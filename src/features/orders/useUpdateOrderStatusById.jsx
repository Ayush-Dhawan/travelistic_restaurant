import {useMutation, useQueryClient} from '@tanstack/react-query'
import { updateOrderStatusById } from '../../services/apiOrders'

export default function useUpdateOrderStatusById(){
    const queryClient = useQueryClient();
    const {mutate: updateStatus, isLoading: isUpdatingStatus} = useMutation({
        mutationFn: ({order_id, newStatus}) => updateOrderStatusById({order_id, newStatus}),
        onSuccess: () =>{
            queryClient.invalidateQueries({active: true})
            alert("Order status has been updated succesfully!");
        },
        onError: (error) => alert(error.message)
    })

    return {updateStatus, isUpdatingStatus}
}