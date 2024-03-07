import {useMutation, useQueryClient} from '@tanstack/react-query'
// import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { insertCustomer } from '../services/apiCustomers';


export function useAddCustomers(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: addCustomer, isLoading: isAddingCustomer} = useMutation({
        mutationFn:(customer) => insertCustomer(customer),

        onSuccess: () =>{
            // toast.success('Succesfully registered!');
            queryClient.invalidateQueries({ active: true });
        },
        // onError: () => toast.error("There was an error while registering the user"),
    })

    return{addCustomer, isAddingCustomer}
}