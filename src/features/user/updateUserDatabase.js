import {useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import { updateCustomer } from '../../services/apiCustomers';

export default function UpdateUserDatabase(){
    const navigate = useNavigate();

    const {mutate: updateUserDB, isLoading} = useMutation({
        mutationFn: ({fullName, email, address}) => updateCustomer({fullName, email, address}),
        onSuccess: () => {
            alert("Details updated!")
            navigate("/menu")
        },
        onError: (err) => {throw new Error("Could not update the details in database")}
    })

    return {updateUserDB, isLoading}
}