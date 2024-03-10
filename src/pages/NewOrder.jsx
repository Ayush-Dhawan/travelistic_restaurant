import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../ui/Button';
import  cn  from '../utils/cn'
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { NavLink } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import {useSelector} from 'react-redux'
import { generateOrderId } from '../services/apiOrders';
import { getCart, getTotalCartPrice } from '../features/cart/cartSlice';
import usePlaceOrders from '../features/orders/usePlaceOrders';
import { getIdbyEmail } from '../services/apiCustomers';
import {useNavigate} from 'react-router-dom'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function NewOrder() {
  const navigate = useNavigate();
    const userStateString = localStorage.getItem("userState");
  // Parse the JSON string into an object
    const userState = JSON.parse(userStateString);
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

  const email = userState?.email;
  const name = userState?.fullName;
  const useraddress = userState?.address;

  const [enteredAddress, setEnteredAddress] = useState(useraddress);
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredName, setEnteredName] = useState(name);
  const {placeOrder, isPlacingOrder} = usePlaceOrders();

  const cart = useSelector(state => state.cart.cart);

  const items = cart?.map(dish => ({
    quantity: dish.quantity,
    dishName: dish.dishName,
    totalPrice: dish.totalPrice
  }));

  const totalPrice = useSelector(getTotalCartPrice);
  

  async function handleSubmit(e){
    e.preventDefault();
    const phone = e.target.elements.phone.value;
    const user_id = await getIdbyEmail(email)
    const order_id = generateOrderId();
    // console.log(user_id)
    placeOrder({order_id, items, price: totalPrice, address: enteredAddress, phoneNumber: phone, user_id})
    alert("order placed!")
    navigate(`/order/${order_id}`)
  }

  return (
    <div className='h-screen w-screen'>
        <Navbar />
        <h2 className="font-bold text-xl ml-[15%] mt-10 text-[#3730a3]  dark:text-neutral-200 ">
        Ready to Order?
      </h2>
        <div className='flex flex-col items-center justify-center '>

        <form className="my-8 w-[70%] rounded-md p-5  bg-slate-950 text-white" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 bg-slate-950 text-gray-400">
          <Label htmlFor="name"className="bg-slate-950 text-gray-400">Name</Label>
          <Input id="name" className="bg-gray-900 text-gray-500" placeholder="example@gmail.com" type="text" required value={enteredName} onChange={(e) => setEnteredName(e.target.value)} />
        </LabelInputContainer>
       <div className='flex flex-col md:flex-row bg-slate-950'>
       <LabelInputContainer className="mb-4 bg-slate-950 text-gray-400">
          <Label htmlFor="phone" className="bg-slate-950 text-gray-400">Phone Number</Label>
          <Input id="phone" className="bg-gray-900 text-gray-500" placeholder="Your contact number" type="text" required />
        </LabelInputContainer>
        
       </div>
        <LabelInputContainer className="mb-4 bg-slate-950 text-gray-400">
          <Label htmlFor="address" className="bg-slate-950 text-gray-400">Address</Label>
          <Input id="address" className="bg-gray-900 text-gray-500" placeholder="Delivery Address" type="text" required value={enteredAddress} onChange={(e) => setEnteredAddress(e.target.value)} />
        </LabelInputContainer>


        <button
          className="bg-gradient-to-br relative group/btn from-[#312e81]  to-[#6366f1] block  w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Place Order
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-[#6366f1] dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

      </form>

        </div>
    </div>
  );
}

// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),
//     priority: data.priority === 'on',
//   };

//   const errors = {};
//   if (!isValidPhone(order.phone))
//     errors.phone =
//       'Please give us your correct phone number. We might need it to contact you.';

//   if (Object.keys(errors).length > 0) return errors;

//   // If everything is okay, create new order and redirect

//   // const newOrder = await createOrder(order);

//   // return redirect(`/order/${newOrder.id}`);

//   return null;
// }

export default NewOrder;



const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  
  // Define the LabelInputContainer component
  const LabelInputContainer = ({ children, className }) => {
    return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
  };